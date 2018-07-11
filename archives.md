---
layout: default
title: Archives
---

# Archives

{% for post in site.posts %}

- [{{ post.date | date_to_string }}]({{ site.baseurl }}{{ post.url }}) {{ post.title }}

{% endfor %}