---
title: 建立一個 .NET Core NuGet package
tags: dotnetcore nuget
tagline: 
---

first in `.csproj`

```xml
<PropertyGroup>
    <TargetFramework>netstandard2.0</TargetFramework>
    <GeneratePackageOnBuild>true</GeneratePackageOnBuild>
    <Version>1.0.0</Version>
    <PackageRequireLicenseAcceptance>true</PackageRequireLicenseAcceptance>
    <PackageLicenseExpression>MIT</PackageLicenseExpression>
    <Company></Company>
    <Authors>David</Authors>
    <PackageProjectUrl>https://github.com/davidyujia/</PackageProjectUrl>
    <PackageIconUrl></PackageIconUrl>
    <PackageTags>generic repository</PackageTags>
    <Copyright></Copyright>
    <Description></Description>
    <PackageLicenseUrl></PackageLicenseUrl>
    <NeutralLanguage>en</NeutralLanguage>
    <RepositoryUrl>https://github.com/davidyujia/</RepositoryUrl>
    <RepositoryType>git</RepositoryType>
</PropertyGroup>
```

then

```cmd
dotnet pack -c Release
```
