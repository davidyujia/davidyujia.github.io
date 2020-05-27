---
title: NSwag 自訂物件範例
tags: DotNetCore NSwag
tagline: 
---

直接上 code

```cs
public void ConfigureServices(IServiceCollection services)
{
    services.AddOpenApiDocument(config =>
    {
        config.TypeMappers.Add(new PrimitiveTypeMapper(typeof(Geometry), schema =>
        {
            schema.Title = "GeoJson";
            schema.Properties.Add("type", new JsonSchemaProperty { IsRequired = true, Title = "GeoJson type", Type = JsonObjectType.String });
            schema.Properties.Add("coordinates", new JsonSchemaProperty { IsRequired = true, Title = "Coordinates" });
            schema.Example = new { type = "Point", coordinates = new[] { 121.517283, 25.047732 } }; //在這邊寫輸入範例
        }));
    });
}
```
