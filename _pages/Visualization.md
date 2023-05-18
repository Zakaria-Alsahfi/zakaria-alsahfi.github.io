---
layout: single
title: " "
permalink: /analysis/
author_profile: true
---
# Analysis

Welcome to the analysis section of our site! Here you'll find information and resources related to data analysis using tools like Power BI and Tableau.

<!-- <div class="container">
  <ul class="nav nav-pills">
    <li class="{% if page.url == '/analysis/power/' %}active{% endif %}"><a href="/analysis/power/">Power BI</a></li>
    <li class="{% if page.url == '/analysis/tableau/' %}active{% endif %}"><a href="/analysis/tableau/">Tableau</a></li>
  </ul>
</div> -->
<div class="tabs">
  <ul>
    <li class="active"><a href="#power-bi-tab">Power BI</a></li>
    <li><a href="#tableau-tab">Tableau</a></li>
  </ul>
  <div id="power-bi-tab" class="tab-content active">
    <!-- Power BI content goes here -->
  </div>
  <div id="tableau-tab" class="tab-content">
    <!-- Tableau content goes here -->
  </div>
</div>

<style>
  .nav-pills {
    display: inline-block;
    margin: 0;
    padding: 0;
    text-align: center;
  }
  
  .nav-pills > li {
    display: inline-block;
  }
  
  .nav-pills > li > a {
    border-radius: 0;
    border: none;
    color: #555;
    font-weight: bold;
    margin-left: -1px;
    padding: 10px 20px;
  }
  
  .nav-pills > li.active > a,
  .nav-pills > li.active > a:focus {
    border: none;
    color: #555;
    font-weight: bold;
    background-color: #fff;
  }
  
  .nav-pills > li > a:hover {
    border: none;
    color: #555;
    font-weight: bold;
    background-color: #fff;
  }
</style>

$(function() {
  // Activate the first tab by default
  $('.tabs .tab-content:first').show();
  
  // Handle click events on the tabs
  $('.tabs li').click(function() {
    // Remove the 'active' class from all tabs
    $('.tabs li').removeClass('active');
    // Add the 'active' class to the clicked tab
    $(this).addClass('active');
    // Hide all tab content
    $('.tab-content').hide();
    // Show the corresponding tab content
    var tabId = $(this).find('a').attr('href');
    $(tabId).show();
    // Prevent the default link behavior
    return false;
  });
});

<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>
