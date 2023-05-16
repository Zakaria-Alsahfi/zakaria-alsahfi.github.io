// Toggle button function
function toggleButton() {
  var html = document.querySelector('html');
  var toggleButton = document.querySelector('.toggle-button');

  if (html.classList.contains('dark_mode')) {
    toggleButton.setAttribute('aria-pressed', 'true');
    toggleButton.innerHTML = '<span class="toggle-button__icon"></span><span class="toggle-button__text">Light Mode</span>';
  } else {
    toggleButton.setAttribute('aria-pressed', 'false');
    toggleButton.innerHTML = '<span class="toggle-button__icon"></span><span class="toggle-button__text">Dark Mode</span>';
  }
}

// Add event listener to toggle button
var toggleButton = document.querySelector('.toggle-button');
toggleButton.addEventListener('click', function() {
  var html = document.querySelector('html');
  html.classList.toggle('dark_mode');
  toggleButton();
});
