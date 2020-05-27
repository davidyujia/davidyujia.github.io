---
title: 在 .NET Core Angular 範本使用新版本的 Angular 專案
tags: DotNetCore Angular
tagline: 
---

目前 .NET Core 範本提供的是 Angular 8, 但是想使用新的版本建立專案所以研究了一下

1. 使用 `ASP.NET Core with Angular` 範本建立專案.

    ```cmd
    dotnet new angular
    ```

1. 移除專案內的 `ClientApp` 資料夾

1. 使用 Angular CLI 建立新的 Angular 專案

    ```cmd
    ng new ClientApp --skipGit --skipInstall
    ```

1. 修改 `angular.json` 內的輸出路徑, 讓 .NET Core 在 publish 或 debug 時可以找到 Angular 前端檔案

    ```json
    {
        "options": {
            "outputPath": "dist"
        }
    }
    ```

1. 如果 .NET Core 在 debug 時一直無法正確開啟前端專案, 則將 `package.json` 內的 `ng server` 修改成 `ng serve --verbose`

    ```json
    {
    "scripts": {
        "start": "ng serve --verbose"
      }
    }
    ```

## Publish

```cmd
dotnet publish -c release
```

## 修改 html base tag 的 href 屬性

如果網站不是放在網站根目錄, 需要修改 `package.json` 裡的 `build` 指令, 或是發行後手動修改 `index.html` 裡的 `base` HTML tag.

```json
{
  "scripts": {
    "build": "ng build --base-href=/YourBasePath/"
  }
}
```
