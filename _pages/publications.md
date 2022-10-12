---
layout: publication
permalink: /publication/
author_profile: true
---

{% include base_path %}
{% for post in site.publications %}
  {% include archive-single-tableau.html %}
{% endfor %}
