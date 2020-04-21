---
title: 在 Console 取得 appsetings.json
tags: dotnetcore
tagline: 
---

## 安裝套件

這邊使用版本 `3.1.2`

```cmd
dotnet add package Microsoft.Extensions.Configuration.Json --version 3.1.2
```

在 `.cs`

```cs
var config = new ConfigurationBuilder()
    .AddJsonFile("appSettings.json", optional: true)
    .AddJsonFile($"appSettings.{Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT")}.json", optional: true)
    .Build();
```

取得 connect string

```cs
var connectionString = config.GetConnectionString("DefaultConnection");
```

取得 value

```cs
var logPath = config.GetSection("LogPath").Value;
```

使用 Model 包裝

```cs
var mailSetting = config.GetSection("MailSettings").Get<MailSettingModel>();
```
