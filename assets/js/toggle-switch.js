// Toggle switch function
function toggleSwitch() {
  var html = document.querySelector('html');
  var toggleSwitch = document.querySelector('.toggle-switch__checkbox');

  if (html.classList.contains('dark_mode')) {
    toggleSwitch.checked = true;
  } else {
    toggleSwitch.checked = false;
  }
}

// Add event listener to toggle switch
var toggleSwitch = document.querySelector('.toggle-switch__checkbox');
toggleSwitch.addEventListener('change', function() {
  var html = document.querySelector('html');
  html.classList.toggle('dark_mode');
});
