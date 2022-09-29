---
layout: posts
permalink: /portfolio/
author_profile: true
header:
  #overlay_image: /images/perceptron/Data Science.jpg
  #overlay_filter: rgb(236, 193, 172)
---
{% if posts.content > posts.excerpt.size %}
  <p><a href="{{ posts.url }}">(more...)</a></p>
{% endif %}
