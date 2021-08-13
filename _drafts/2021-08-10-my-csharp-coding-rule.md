---
title: 我的 .NET Core C# coding 規則
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

例如: `MyTeam.TestProject.Logger.Extensions` or `MyTeam.TestProject.Logger.Extensions.AspectCore`

1. 連接外部資源

將額外建一個 Library 將所有外部資源放在 `{project name}.Clients` 或每個外部獨立一個 Library `{project name}.{component name}`

例如: `MyTeam.TestProject.Clients` or `MyTeam.TestProject.Weather`

## Service Class

我們的 Service Class 的 config 應該由平台供給, 因 config 存放的位置與格式只有平台專案才會知道.

Class 會設計成這樣:

```cs
public abstract class ClassBase
{
    public MyConfig Config { protected get; set; }
}

public class MyClass : ClassBase
{
    public void SaveToFile(MyData data)
    {
        var filePath = Config.FilePath;

        //DO SAVE DATA TO FILE
    }
}
```

如此 MyClass 與 MyConfig 在 controller 注入後, 在 constructor 時就可以將 MyConfig 塞進 MyClass, 我們的 MyClass 也不用針對特定平台取得 config.

如有跨 OS 的部分還是要由 Service Class 自己處理

```cs
public class ExampleController : ControllerBase
{
    private readonly MyClass _myClass;

    public ExampleController(IOptions<MyConfig> myConfig, MyClass myClass)
    {
        myClass.Config = myConfig.Value;
        _myClass = myClass;
    }
}
```
