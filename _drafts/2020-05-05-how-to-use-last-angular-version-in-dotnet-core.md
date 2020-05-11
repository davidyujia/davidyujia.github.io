---
title: draft
tags: dotnetcore angular
tagline: 
---

1. Create project use dotnet core Angular project

    ```cmd
    dotnet new angular
    ```

1. Remove ClientApp folder

1. Create new Angular project with Angular CLI

    ```cmd
    ng new ClientApp --skipGit --skipInstall
    ```

1. Modify output path in `angular.json`

    ```json
    {
        "options": {
            "outputPath": "dist"
        }
    }
    ```

1. Modify `ng server` to `ng serve --verbose` in `package.json`

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

## Change base href

If your website not in root, modify build option in `package.json`

```json
{
  "scripts": {
    "build": "ng build --base-href=/YourBasePath/"
  }
}
```
