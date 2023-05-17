---
layout: single
title: " "
permalink: /analysis/
author_profile: true
---
# Analysis

Welcome to the analysis section of our site! Here you'll find information and resources related to data analysis using tools like Power BI and Tableau.

<div class="container">
  <ul class="nav nav-tabs">
    <li class="active"><a href="#power" data-toggle="tab">Power BI</a></li>
    <li><a href="#tableau" data-toggle="tab">Tableau</a></li>
  </ul>

  <div class="tab-content">
    <div class="tab-pane fade in active" id="power">
      <h2>Power BI</h2>
      <p>This is the Power BI page.</p>
    </div>
    <div class="tab-pane fade" id="tableau">
      <h2>Tableau</h2>
      <p>This is the Tableau page.</p>
    </div>
  </div>
</div>

<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>
<script>
$(document).ready(function(){
  $('.nav-tabs a').click(function(){
    var url = $(this).attr('href');
    $.get(url, function(data) {
      var content = $(data).find('.container .page-content').html();
      $(url).html(content);
    });
    $(this).tab('show');
    return false;
  });
});
</script>
