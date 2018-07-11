---
layout: default
title: Index
---

# {{ page.title }}

{% for post in site.posts %}

## [{{ post.title }}]({{ site.baseurl }}{{ post.url }})

- {{ post.date | date_to_string }}

- Tags :{% for tag in post.tags %} [{{ tag }}](/tags/{{ tag }}){% if forloop.last != true %} {% endif %} {% endfor %}

{% endfor %}
