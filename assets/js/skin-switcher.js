const skinToggle = document.querySelectorAll('.skin-toggle');

function toggleSkin() {
  if (this.id === 'light') {
    document.documentElement.classList.remove('dark');
    localStorage.setItem('skinMode', 'light');
  } else if (this.id === 'dark') {
    document.documentElement.classList.add('dark');
    localStorage.setItem('skinMode', 'dark');
  }
}

skinToggle.forEach(function(radio) {
  radio.addEventListener('change', toggleSkin);
});

const savedSkinMode = localStorage.getItem('skinMode');
if (savedSkinMode === 'dark') {
  document.getElementById('dark').checked = true;
  toggleSkin.call(document.getElementById('dark'));
} else {
  document.getElementById('light').checked = true;
  toggleSkin.call(document.getElementById('light'));
}
