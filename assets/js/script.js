// Toggle button function
function toggleDarkMode() {
  var html = document.querySelector('html');
  var darkModeToggle = document.querySelector('#dark-mode-toggle');
  var lightModeToggle = document.querySelector('#light-mode-toggle');

  html.classList.toggle('dark');

  if (darkModeToggle.style.display === 'none') {
    darkModeToggle.style.display = 'block';
    lightModeToggle.style.display = 'none';
  } else {
    darkModeToggle.style.display = 'none';
    lightModeToggle.style.display = 'block';
  }
}
