---
title: ASP.NET core GeoJson Model Binding
tags: aspnetcore geojson
tagline: 
---

直接上 code

專案加入 `GeoAPI`

```cmd
dotnet add package GeoAPI
```

add `GeoJsonConverter` class

```cs
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using GeoAPI.Geometries;

public class GeoJsonConverter : JsonConverter
{
    public override bool CanConvert(Type objectType)
    {
        return objectType == typeof(IGeometry) || objectType.GetInterface("GeoAPI.Geometries.IGeometry") == typeof(IGeometry);
    }

    public override object ReadJson(JsonReader reader, Type objectType, object existingValue, JsonSerializer serializer)
    {
        if (reader.TokenType != JsonToken.StartObject)
        {
            return null;
        }
        var jObj = JObject.Load(reader);
        return jObj.ToGeometry();
    }

    public override void WriteJson(JsonWriter writer, object value, JsonSerializer serializer)
    {
        var geo = value as IGeometry;
        serializer.Serialize(writer, geo.ToJsonObject());
    }
}
```

in `Startup.cs`

```cs
public void ConfigureServices(IServiceCollection services)
{

    //...

    services.AddMvc(config =>
    {
        // ...
    }).AddJsonOptions(options =>
    {
        options.SerializerSettings.Converters.Add(new GeoJsonConverter()); // 加上GeoJsonConverter
    }).SetCompatibilityVersion(CompatibilityVersion.Version_2_2);
}
```
