const skinToggle = document.querySelector('.skin-toggle');
const skinToggleText = document.querySelector('.skin-toggle-text');

function toggleSkin() {
  document.documentElement.classList.toggle('dark');
  const isDark = document.documentElement.classList.contains('dark');
  if (isDark) {
    skinToggleText.textContent = 'Switch to light mode';
    skinToggle.checked = true;
    localStorage.setItem('skinMode', 'dark');
  } else {
    skinToggleText.textContent = 'Switch to dark mode';
    skinToggle.checked = false;
    localStorage.setItem('skinMode', 'default');
  }
}

skinToggle.addEventListener('change', toggleSkin);

const savedSkinMode = localStorage.getItem('skinMode');
if (savedSkinMode === 'dark') {
  toggleSkin();
}
