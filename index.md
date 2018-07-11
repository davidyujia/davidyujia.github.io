---
layout: default
title: My Blog
---

{{ page.title }}

# NEW POST

{% for post in site.posts %}

- [{{ post.date | date_to_string }}]({{ site.baseurl }}{{ post.url }}{{ post.title }})

{% endfor %}
