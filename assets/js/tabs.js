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
