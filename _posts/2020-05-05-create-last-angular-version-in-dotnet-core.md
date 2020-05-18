---
title: draft
tags: dotnetcore angular
tagline: 
---

1. 使用 `ASP.NET Core with Angular` 範本建立專案.

    ```cmd
    dotnet new angular
    ```

1. 移除專案內的 `ClientApp` 資料夾

1. 使用 Angular CLI 建立新的 Angular 專案

    ```cmd
    ng new ClientApp --skipGit --skipInstall
    ```

1. 修改 `angular.json` 內的輸出路徑

    ```json
    {
        "options": {
            "outputPath": "dist"
        }
    }
    ```

1. 將 `package.json` 內的 `ng server` 修改成 `ng serve --verbose`

    ```json
    {
    "scripts": {
        "start": "ng serve --verbose"
      }
    }
    ```

## 發行

```cmd
dotnet publish -c release
```

## 修改 html base tag 的 href 屬性

如果你的網站不是放在網站根目錄, 需要修改 `package.json` 裡的 `build` 指令, 或是發行後手動修改 `index.html` 裡的 `base` HTML tag.

```json
{
  "scripts": {
    "build": "ng build --base-href=/YourBasePath/"
  }
}
```
