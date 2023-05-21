// Get all the tabs and tab content
const tabs = document.querySelectorAll('.nav-pills li');
const tabContent = document.querySelectorAll('.tab-content');

// Add click event listeners to all the tabs
tabs.forEach(tab => {
  tab.addEventListener('click', e => {
    e.preventDefault();

    // Remove the active class from all tabs and tab content
    tabs.forEach(tab => tab.classList.remove('active'));
    tabContent.forEach(content => content.classList.remove('active'));

    // Add the active class to the clicked tab and corresponding tab content
    const tabId = e.target.closest('li').getAttribute('data-tab');
    const activeTab = document.querySelector(`#${tabId}`);
    e.target.closest('li').classList.add('active');
    activeTab.classList.add('active');
  });
});
