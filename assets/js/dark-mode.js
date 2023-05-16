// Toggle dark mode
function toggleDarkMode() {
  var body = document.body;
  var icon = document.getElementById("dark-mode-icon");

  body.classList.toggle("dark-mode");
  icon.classList.toggle("fa-sun");
  icon.classList.toggle("fa-moon");
}

// Add event listener to dark mode button
var darkModeButton = document.getElementById("dark-mode-button");
darkModeButton.addEventListener("click", toggleDarkMode);
