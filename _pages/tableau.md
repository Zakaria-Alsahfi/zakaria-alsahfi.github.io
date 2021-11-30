---
layout: archive
title: "Portfolio"
permalink: /portfolio/
author_profile: true
---

{% include base_path %}


{% for post in site.viz %}
  {% include archive-single-tableau.html %}
{% endfor %}
