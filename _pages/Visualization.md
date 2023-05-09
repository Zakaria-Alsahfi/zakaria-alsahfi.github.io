---
layout: default
title: " "
permalink: /viz/
author_profile: true
---
<div class="container">
  <h1>My Page with Tabs</h1>

  <ul class="nav nav-tabs">
    <li class="active"><a href="#tab1" data-toggle="tab">Tab 1</a></li>
    <li><a href="#tab2" data-toggle="tab">Tab 2</a></li>
  </ul>

  <div class="tab-content">
    <div class="tab-pane active" id="tab1">
      <h2>Tab 1 Content</h2>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, urna sit amet vulputate interdum, quam diam finibus risus, at consequat lectus lacus sit amet mi. Integer vel sapien vel nisl interdum mattis. Praesent in eros nec nunc fermentum tincidunt.</p>
    </div>
    <div class="tab-pane" id="tab2">
      <h2>Tab 2 Content</h2>
      <p>Nullam ac enim id velit interdum placerat. In hac habitasse platea dictumst. Pellentesque sed sapien sed nunc volutpat lacinia. Sed congue, magna vel suscipit lacinia, risus nunc suscipit dolor, non pellentesque elit urna in nisl. Ut sollicitudin leo non justo tincidunt, sed consequat tellus efficitur.</p>
    </div>
  </div>
</div>

<script>
  $(document).ready(function(){
    $('.nav-tabs a').click(function(){
      $(this).tab('show');
    });
  });
</script>

<style>
  .tab-pane {
    display: none;
  }
  .tab-pane.active {
    display: block;
  }
</style>
