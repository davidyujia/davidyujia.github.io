---
title: 建立自訂的 ILogger 元件
tags: ILogger AspNetCore
tagline:
---

## 加入參考

```cmd
dotnet add package Microsoft.Extensions.Logging.Configuration
```

## 建立 LoggerConfiguration

LoggerConfiguration 的作用在於傳入自訂的 Log 元件設定檔, 比如說 `LogPath` 與 `Log 記錄等級`.

```cs
public class CustomLoggerConfiguration
{
    public string LogPath { get; set; }

    private readonly IList<LogLevel> _logLevels;

    public CustomLoggerConfiguration()
    {
        _logLevels = new List<LogLevel>
        {
            LogLevel.Error,
            LogLevel.Critical
        };
    }

    public void AddLogLevel(params LogLevel[] levels)
    {
        foreach (var level in levels)
        {
            if (IsLogLevelEnable(level))
            {
                return;
            }
            _logLevels.Add(level);
        }
    }

    public bool IsLogLevelEnable(LogLevel level)
    {
        return _logLevels.Contains(level);
    }
}
```

## 建立 CustomLogger

繼承介面 `ILogger` 建立我們自訂的 Logger 元件, 將訊息寫入原本就建立好的 `MyLogger` 元件.

```cs
public class CustomLogger : ILogger
{
    private readonly string _name;
    private readonly Func<CustomLoggerConfiguration> _getCurrentConfig;
    private readonly MyLogger _loggerService;
    public CustomLogger(string name, Func<CustomLoggerConfiguration> getCurrentConfig)
    {
        _name = name;
        _getCurrentConfig = getCurrentConfig;
        _loggerService = new MyLogger(_getCurrentConfig().LogPath);
    }
    public void Log<TState>(LogLevel logLevel, EventId eventId, TState state, Exception exception, Func<TState, Exception, string> formatter)
    {
        if (!IsEnabled(logLevel))
        {
            return;
        }

        try
        {
            var logLevel = MapLevel(logLevel);
            var message = formatter(state, exception);

            _loggerService.Log(_name, logLevel, message, exception);
        }
        catch (Exception e)
        {
            Debug.WriteLine(e);
        }
    }
    private static MyLogLevel MapLevel(LogLevel level)
    {
        return level switch
        {
            LogLevel.Trace => MyLogLevel.Trace,
            LogLevel.Debug => MyLogLevel.Debug,
            LogLevel.Information => MyLogLevel.Info,
            LogLevel.Warning => MyLogLevel.Warn,
            LogLevel.Error => MyLogLevel.Error,
            LogLevel.Critical => MyLogLevel.Fatal,
            LogLevel.None => MyLogLevel.Trace,
            _ => throw new ArgumentOutOfRangeException(nameof(level), level, null)
        };
    }
    public bool IsEnabled(LogLevel logLevel) => _getCurrentConfig().IsLogLevelEnable(logLevel);
    public IDisposable BeginScope<TState>(TState state) => default;
}
```

## 建立 CustomLoggerProvider

繼承介面 `ILoggerProvider`, 建立 `CustomLoggerProvider`.

```cs
public class CustomLoggerProvider : ILoggerProvider
{
    private readonly IDisposable _onChangeToken;
    private CustomLoggerConfiguration _currentConfig;

    public CustomLoggerProvider(IOptionsMonitor<CustomLoggerConfiguration> config)
    {
        _currentConfig = config.CurrentValue;
        _onChangeToken = config.OnChange(updatedConfig => _currentConfig = updatedConfig);
    }

    public ILogger CreateLogger(string categoryName) => new CustomLogger(categoryName, GetCurrentConfig);

    private CustomLoggerConfiguration GetCurrentConfig() => _currentConfig;

    public void Dispose()
    {
        _onChangeToken.Dispose();
    }
}
```

## 註冊 CustomLoggerProvider

最後我們將剛的建立的 `CustomLoggerProvider` 註冊到 `Microsoft.Extensions.DependencyInjection` 的 `IServiceCollection`, 讓 ASP.NET Core 可以建立我們自訂的 `CustomLogger`.

in `Startup.cs`

```cs
services.AddLogging(builder =>
{

    Action<CustomLoggerConfiguration> configure = config =>
    {
        var logPath = Configuration.GetSection("Log:LogPath").Value;
        config.LogPath = logPath;
        config.AddLogLevel(LogLevel.Warning);
    }

    builder.Services.TryAddEnumerable(ServiceDescriptor.Singleton<ILoggerProvider, CustomLoggerProvider>());

    LoggerProviderOptions.RegisterProviderOptions<CustomLoggerConfiguration, CustomLoggerProvider>(builder.Services);

    builder.Services.Configure(configure);
});
```

這樣, 使用注入的 ILogger 時就會將資訊一併寫入我們自訂的 Log 元件了.
