---
layout: default
title: Archives
---

# {{ page.title }}

{% for post in site.posts %}

- [{{ post.date | date_to_string }}]({{ site.baseurl }}{{ post.url }}) {{ post.title }}

{% endfor %}