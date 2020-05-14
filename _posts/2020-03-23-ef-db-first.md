---
title: EF core 從 DB 產生 Models(反向工程)
tags: dotnetcore
tagline: 
---

## 安裝 EF 工具

```cmd
dotnet tool install dotnet-ef -g
```

## 將 Microsoft.EntityFrameworkCore.Design 加入至專案

`5.0.0` 目前是 preview 版本, 這邊安裝 `3.1.2`

```cmd
dotnet add package Microsoft.EntityFrameworkCore.Design --version 3.1.2
```

## 從 DB 產生 Models

根據不同的 DB 安裝不同的 Provider, 例如: `Microsoft.EntityFrameworkCore.SqlServer`.

```cmd
dotnet ef dbcontext scaffold "Server=(localdb)\MSSQLLocalDB;Database=ContosoUniversity;Trusted_Connection=True" Microsoft.EntityFrameworkCore.SqlServer -o Models -f -c SqlDbContext
```

此指令會使用 `Microsoft.EntityFrameworkCore.SqlServer` 將 Model 輸出在 `Models` 資料夾, 並把 DbContext 命名為 `SqlDbContext`.

使用 Nuget 套件管理員可以使用以下指令

```cmd
Scaffold-DbContext "Server=(localdb)\MSSQLLocalDB;Database=ContosoUniversity;Trusted_Connection=True" Microsoft.EntityFrameworkCore.SqlServer -OutputDir Models -f -c SqlDbContext
```

## Providers

以下是目前在專案使用過的 Providers

| DB | Provider | |
|---|---|---|
| MSSQL | Microsoft.EntityFrameworkCore.SqlServer | [Link](https://www.nuget.org/packages/Microsoft.EntityFrameworkCore.SqlServer) |
| PostgreSQL | Npgsql.EntityFrameworkCore.PostgreSQL | [Link](https://www.nuget.org/packages/Npgsql.EntityFrameworkCore.PostgreSQL) |

## 使用 "user-secrets" 儲存連線字串

首先先初始化 user-secrets

```cmd
dotnet user-secrets init
```

再將連線字串儲存至 user-secrets

```cmd
dotnet user-secrets set ConnectionStrings.DefaultConnection "Server=(localdb)\MSSQLLocalDB;Database=ContosoUniversity;Trusted_Connection=True"
```

最後將連線字串修改成 `Name=DefaultConnection`

```cmd
dotnet ef dbcontext scaffold Name=DefaultConnection Microsoft.EntityFrameworkCore.SqlServer
```

## 在 Console 中使用 DbContext

```cs
var option = new DbContextOptionsBuilder<SqlTaikooContext>().UseSqlServer(connectionString).Options;

var context = new SqlDbContext(option);
```

參考資料:
<https://docs.microsoft.com/zh-tw/ef/core/managing-schemas/scaffolding>
