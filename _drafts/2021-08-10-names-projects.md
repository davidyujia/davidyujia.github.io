---
title: 我的 .NET Core 專案命名原則
tags: DotNetCore
tagline:
---

記錄一下目前所使用的架構與命名規則

## 規則

1. 平台專案與執行檔

與動作為目標或平台用途自由命名, 如: MyXmlParse, MyTestApi...etc.

1. Class Library 基本規則

`{department name}.{project name}.....{component name}`, department name 可視情況省略

例如: `MyTeam.TestProject.Logger` or `TestProject.Logger`

1. 避免專案參考與 Class Library 本身不相關的套件, 如 `AspectCore.Extensions.DependencyInjection` 需要註冊 DI 服務的程式碼

將命名為 `{project name}.{component name}.Extensions`, 平台專案將參考此 Library

例如: `MyTeam.TestProject.Logger.Extensions`

1. 連接外部資源

將額外建一個 Library 將所有外部資源放在 `{project name}.Clients` 或每個外部獨立一個 Library `{project name}.{component name}`

例如: `MyTeam.TestProject.Clients` or `MyTeam.TestProject.Weather`
