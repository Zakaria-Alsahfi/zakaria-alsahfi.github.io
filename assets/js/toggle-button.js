// Toggle button function
function toggleButton() {
  var html = document.querySelector('html');
  var toggleButton = document.querySelector('.toggle-button');

  if (html.classList.contains('dark_mode')) {
    toggleButton.setAttribute('aria-pressed', 'true');
    toggleButton.innerHTML = '<i class="material-icons toggle-button__icon toggle-button__icon--sun">wb_sunny</i><span 
    class="toggle-button__text">Light Mode</span><i class="material-icons toggle-button__icon toggle-button__icon--moon">brightness_2</i>';
  } else {
    toggleButton.setAttribute('aria-pressed', 'false');
    toggleButton.innerHTML = '<i class="material-icons toggle-button__icon toggle-button__icon--sun">wb_sunny</i><span 
    class="toggle-button__text">Dark Mode</span><i class="material-icons toggle-button__icon toggle-button__icon--moon">brightness_2</i>';
  }
}

// Add event listener to toggle button
var toggleButton = document.querySelector('.toggle-button');
toggleButton.addEventListener('click', function() {
  var html = document.querySelector('html');
  html.classList.toggle('dark_mode');
  toggleButton();
});
