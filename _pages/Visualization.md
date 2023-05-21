---
layout: archive
title: " "
permalink: /analysis/
author_profile: true
---
<!--# Analysis

Welcome to the analysis section of our site! Here you'll find information and resources related to data analysis using tools like Power BI and Tableau.-->

<!-- Add the following code to include the CSS and JavaScript files -->
<link rel="stylesheet" href="{{ 'assets/css/style.css' | relative_url }}">


<!-- Add the navigation menu and tab content -->
<div class="container">
  <a href="#" class="tab-link active" data-tab="tab1">Power BI</a>
  <a href="#" class="tab-link" data-tab="tab2">Tableau</a>
  <a href="#" class="tab-link" data-tab="tab3">Excel</a>
  <div class="red-line"></div>

  <div class="tab-content active" id="tab1">
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
  
  <div class="tab-content" id="tab2">
    <!-- Tableau content goes here -->
    {% assign entries_layout = page.entries_layout | default: 'list' %}
    {% assign tableausByYear = site.tableau | where_exp: "item", "item.hidden != true" | group_by_exp: 'tableau', 'tableau.date | date: "%Y"' %}
    {% if tableausByYear.size > 0 %}
      {% for year in tableausByYear %}
          <div class="entries-{{ entries_layout }}">
            {% for post in year.items %}
              {% include archive-single-tableau.html type=entries_layout %}
            {% endfor %}
          </div>
      {% endfor %}
    {% endif %}
  </div>
  
  <div class="tab-content" id="tab3">
    <p>This is Excel content.</p>
  </div>
</div>
<script src="{{ 'assets/js/script-tabs.js' | relative_url }}"></script>
