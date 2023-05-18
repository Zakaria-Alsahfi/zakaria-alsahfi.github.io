// Get all the navigation links
var navLinks = document.querySelectorAll('.nav-pills li');

// Get all the tab content
var tabContent = document.querySelectorAll('.tab-content');

// Add click event listener to each navigation link
navLinks.forEach(function(navLink) {
  navLink.addEventListener('click', function() {
    // Remove the active class from all navigation links
    navLinks.forEach(function(link) {
      link.classList.remove('active');
    });

    // Add the active class to the clicked navigation link
    this.classList.add('active');

    // Hide all the tab content
    tabContent.forEach(function(tab) {
      tab.classList.remove('active');
    });

    // Show the tab content for the clicked navigation link
    var tabId = this.getAttribute('data-tab');
    document.getElementById(tabId).classList.add('active');
  });
});
