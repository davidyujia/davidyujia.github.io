---
title: 在 Angular 使用錨點(fragment)
tags: angular
tagline: 
---

in routing `.ts` file.

```ts
const routerOptions: ExtraOptions = {
  scrollPositionRestoration: 'enabled',
  anchorScrolling: 'enabled',
  scrollOffset: [0, 64],
};

// ...

@NgModule({
  imports: [CommonModule, RouterModule.forRoot(routes, routerOptions)],
  exports: [RouterModule]
})
```

in component `.html`

```html
<div class="links">
  <ul>
    <li *ngFor="let id of ids">
      <a [routerLink]="['./']" [fragment]="id">{{id}}</a>
    </li>
  </ul>
</div>

<section>
  <div class="section" *ngFor="let id of ids" [attr.id]='id' >
    <h1>{{id}}</h1>
    <div class="content">
        content
    </div>
  </div>
</section>
```
