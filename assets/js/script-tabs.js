// Get all the tabs and tab content
const tabs = document.querySelectorAll('.nav-pills li');
const tabContent = document.querySelectorAll('.tab-content');

// Add click event listeners to all the tabs
tabs.forEach(tab => {
  tab.addEventListener('click', e => {
    e.preventDefault();
    
    // Get the tab ID from the data attribute
    const tabId = e.target.closest('li').dataset.tab;
    
    // Remove the active class from all tabs and tab content
    tabs.forEach(tab => tab.classList.remove('active'));
    tabContent.forEach(content => {
      content.classList.remove('active');
      content.style.opacity = '0';
    });

    // Add the active class to the clicked tab and corresponding tab content
    e.target.closest('li').classList.add('active');
    const activeTab = document.querySelector(`[data-tab="${tabId}"]`);
    activeTab.classList.add('active');

    // Fade in the active tab content
    setTimeout(() => {
      activeTab.style.opacity = '1';
    }, 50);
  });
});
