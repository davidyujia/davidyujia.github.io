---
title: 在 Angular 專案中使用 Google & Facebook 登入
tags: Angular
tagline: 
---

直接上 code

Google Login Button

`google-login-button.component.html`

```html
<button id="googleBtn" type="submit">
  透過Google登入
</button>
```

`google-login-button.component.ts`

```ts
import { Component, OnInit, ElementRef, AfterViewInit } from '@angular/core';

declare var gapi: any;
@Component({
  selector: 'app-google-login-button',
  templateUrl: './google-login-button.component.html',
  styleUrls: ['./google-login-button.component.scss']
})
export class GoogleLoginButtonComponent implements OnInit, AfterViewInit {
  clientId = 'clientId';

  scope = [
    'profile',
    'email'
  ].join(' ');

  auth2: any;

  constructor(private element: ElementRef) { }

  ngOnInit(): void {
    let script = document.getElementById('google-platform') as HTMLScriptElement;

    if (!script) {
      script = document.createElement('script');
      script.id = 'google-platform';
      script.src = `https://apis.google.com/js/platform.js`;
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);
    }
  }

  ngAfterViewInit() {
    this.load();
  }

  load() {
    if (typeof gapi === undefined || typeof gapi === 'undefined') {
      this.checkLoaded();
      return;
    }
    if (typeof gapi.load !== 'function') {
      this.checkLoaded();
      return;
    }
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id: this.clientId,
        cookiepolicy: 'single_host_origin',
        scope: this.scope
      });
      this.attachSignin(this.element.nativeElement.firstChild);
    });
  }

  checkLoaded() {
    setTimeout(() => {
      this.load();
    }, 100);
  }

  attachSignin(element: any) {
    this.auth2.attachClickHandler(element, {},
      (googleUser) => {
        const profile = googleUser.getBasicProfile();
        const auth = googleUser.getAuthResponse();
        const user = {
          userId: profile.getId(),
          name: profile.getName(),
          email: profile.getEmail(),
          expiredTime: new Date(auth.expires_at),
          accessToken: auth.access_token,
        };
        console.log(user);
      }, (error: any) => {
        console.log(JSON.stringify(error, undefined, 2));
      });
  }
}
```

`facebook-login-button.component.html`

```html
<button (click)="submit();">
  透過Facebook登入
</button>
```

`facebook-login-button.component.ts`

```ts
import { Component, AfterViewInit } from '@angular/core';

declare var FB: any;
@Component({
  selector: 'app-facebook-login-button',
  templateUrl: './facebook-login-button.component.html',
  styleUrls: ['./facebook-login-button.component.scss']
})
export class FacebookLoginButtonComponent implements AfterViewInit {
  appId = 'appId';
  version = 'v6.0';
  scope = 'public_profile,email';

  constructor() { }

  ngAfterViewInit() {
    let script = document.getElementById('facebook-platform') as HTMLScriptElement;

    if (!script) {
      script = document.createElement('script');
      script.id = 'facebook-platform';
      script.src = `https://connect.facebook.net/en_US/sdk.js`;
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);
    }
    (window as any).fbAsyncInit = () => {
      FB.init({
        appId: this.appId,
        cookie: true,
        xfbml: true,
        version: this.version
      });
    };
  }

  submit() {
    FB.login(login => {
      if (login.status !== 'connected' || !login.authResponse) {
        console.log('User login failed');
        return;
      }

      FB.api('/me', 'GET', { fields: 'id,name,email,first_name,last_name,link,age_range,picture,birthday' }, userInfo => {
        const user = {
          userId: userInfo.id,
          name: userInfo.name,
          email: userInfo.email,
          expiredTime: new Date(login.authResponse.data_access_expiration_time * 1000),
          accessToken: login.authResponse.accessToken,
        };
        console.log(user);
      });
    }, { scope: this.scope });
  }
}
```
