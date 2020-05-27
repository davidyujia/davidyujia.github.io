---
title: ASP.NET core GeoJson Model Binding
tags: AspNetCore GeoJson
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

## Update

For .NET Core 3.1

```cs
using System;
using System.Text.Json;
using System.Text.Json.Serialization;
using NetTopologySuite.Geometries;

public class GeoJsonConverter : JsonConverter<Geometry>
{
    public override Geometry Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
    {
        if (reader.TokenType != JsonTokenType.StartObject)
        {
            throw new JsonException();
        }
        if (!JsonDocument.TryParseValue(ref reader, out var doc))
        {
            throw new JsonException();
        }
        if (doc.RootElement.TryGetProperty("type", out var geoJsonType))
        {
            throw new JsonException();
        }
        var json = JsonSerializer.Serialize(doc);
        switch (geoJsonType.GetString())
        {
            case "Point":
                return ParseToGeometry<Point>(json);
            case "MultiPoint":
                return ParseToGeometry<MultiPoint>(json);
            case "LineString":
                return ParseToGeometry<LineString>(json);
            case "MultiLineString":
                return ParseToGeometry<MultiLineString>(json);
            case "Polygon":
                return ParseToGeometry<Polygon>(json);
            case "MultiPolygon":
                return ParseToGeometry<MultiPolygon>(json);
            case "GeometryCollection":
                return ParseToGeometry<GeometryCollection>(json);
        }
        throw new JsonException();
    }
    private static Geometry ParseToGeometry<T>(string json) where T : Geometry => new NetTopologySuite.IO.GeoJsonReader().Read<T>(json);
    public override void Write(Utf8JsonWriter writer, Geometry value, JsonSerializerOptions options)
    {
        var geoJsonWriter = new NetTopologySuite.IO.GeoJsonWriter();
        var json = geoJsonWriter.Write(value);
        var doc = JsonDocument.Parse(json);
        doc.WriteTo(writer);
    }
}
```
