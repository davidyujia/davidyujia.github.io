---
title: draft
tags: tag1 tag2
tagline: 
---

draft

```cs
class Program
{
    static void Main(string[] args)
    {
        var config = new ConfigurationBuilder()
            .AddJsonFile("setting.json", optional: true)
            .Build();

        var logger = new Logger<Program>(LoggerFactory.Create(c =>
        {
            c.AddConsole();
            c.AddConfiguration(config);
        }));

        logger.LogError("test");

        Console.ReadLine();
    }
}
```
