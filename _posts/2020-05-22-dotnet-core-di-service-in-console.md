---
title: 在 Console Application 使用 DI
tags: DotNetCore
tagline:
---

直接上 code

```cmd
dotnet add package Microsoft.Extensions.DependencyInjection --version 3.1.4
```

```cs
// 取得config
var config = new ConfigurationBuilder()
                // ...
                .Build();

var services = new ServiceCollection();

// 注入 ILogger<T> 元件 (Microsoft.Extensions.Logging)
// 如果有安裝 Microsoft.Extensions.Logging.Console 就可以像 ASP.NET Core 的 console 顯示訊息
services.AddLogging(configure => LoggingHelper.SetLoggingBuilder(configure, config));

// 跟 ASP.NET Core 一樣註冊 Service
services.AddTransient<Service>();

var provider = services.BuildServiceProvider();

var service = provider.GetService<Service>(); // 使用 provider 取得所需要的 service
```
