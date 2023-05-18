---
layout: single
title: " "
permalink: /analysis/
author_profile: true
---
# Analysis

Welcome to the analysis section of our site! Here you'll find information and resources related to data analysis using tools like Power BI and Tableau.

<!-- Add the following code to include the CSS and JavaScript files -->
<link rel="stylesheet" href="{{ 'assets/css/style.css' | relative_url }}">
<script src="{{ 'assets/js/script-tabs.js' | relative_url }}"></script>

<!-- Add the navigation menu and tab content -->
<div class="container">
  <ul class="nav nav-pills">
    <li class="active" data-tab="power-bi-tab"><a href="#">Power BI</a></li>
    <li data-tab="tableau-tab"><a href="#">Tableau</a></li>
  </ul>
  <div id="power-bi-tab" class="tab-content active">
    <!-- Power BI content goes here -->
    {% assign entries_layout = page.entries_layout | default: 'list' %}
    {% assign powerByYear = site.powerbi | where_exp: "item", "item.hidden != true" | group_by_exp: 'powerbi', 'powerbi.date | date: "%Y"' %}
    {% if powerByYear.size > 0 %}
      {% for year in powerByYear %}
        <section class="taxonomy__section">
          <div class="entries-{{ entries_layout }}">
            {% for post in year.items %}
              {% include archive_single_powerbi.html type=entries_layout %}
            {% endfor %}
          </div>
        </section>
    {% endfor %}
  {% endif %}
    
  </div>
  <div id="tableau-tab" class="tab-content">
    <!-- Tableau content goes here -->
  </div>
</div>
