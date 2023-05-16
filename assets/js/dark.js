// Toggle dark mode
function toggleDarkMode() {
  var html = document.querySelector('html');
  html.classList.toggle('dark_mode');
}

// Add event listener to toggle button
var toggleButton = document.querySelector('#theme-toggle');
toggleButton.addEventListener('click', toggleDarkMode);
