---
layout: default
title: " "
permalink: /viz/
author_profile: true
---
<div class="container">
  <h1>My Page with Vertical Tabs</h1>

  <div class="row">
    <div class="col-md-3">
      <ul class="nav nav-tabs tabs-left">
        <li class="active"><a href="#tab1" data-toggle="tab">Tab 1</a></li>
        <li><a href="#tab2" data-toggle="tab">Tab 2</a></li>
      </ul>
    </div>

    <div class="col-md-9">
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
  </div>
</div>

<script>
  $(document).ready(function(){
    $('.tabs-left a').click(function(){
      $(this).tab('show');
    });
  });
</script>

<style>
  .tabs-left > li {
    float: none;
  }
  .tabs-left > li > a {
    min-width: 100px;
    margin-right: -1px;
    border-bottom: 1px solid #ddd;
    border-right-color: transparent;
  }
  .tabs-left > li.active > a,
  .tabs-left > li.active > a:hover,
  .tabs-left > li.active > a:focus {
    border-color: #ddd #ddd #ddd transparent;
  }
  .tab-content {
    margin-left: 140px;
  }
</style>
