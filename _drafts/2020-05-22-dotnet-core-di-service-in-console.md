---
title: draft
tags: tag1 tag2
tagline: 
---

draft


            _config = new ConfigurationBuilder()
                .AddJsonFile("appSettings.json", optional: true)
                .AddJsonFile($"appSettings.{Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT")}.json",
                    optional: true)
                .Build();

   _services = new ServiceCollection();

            _services.AddLogging(configure => LoggingHelper.SetLoggingBuilder(configure, _config));

             _services.BuildServiceProvider()

             var service = _services.GetService<Service>();