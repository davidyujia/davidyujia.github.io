---
title: 我的 .NET Core 專案命名原則
tags: DotNetCore
tagline: 
---

## 規則

1. 平台專案與執行檔

與動作為目標或平台用途自由命名, 如: MyXmlParse, MyTestApi...etc.

1. Class Library 基本規則

`{department name}.{project name}.....{component name}`, department name 可視情況省略

例如: `MyTeam.TestProject.Logger` or `TestProject.Logger`

1. 避免專案參考與 Class Library 本身不相關的套件, 如 `AspectCore.Extensions.DependencyInjection` 需要註冊 DI 服務的程式碼

將命名為 `{project name}.{component name}.Extensions`, 平台專案將參考此 Library

例如: `MyTeam.TestProject.Logger.Extensions`
