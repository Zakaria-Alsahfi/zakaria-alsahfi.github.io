const navLinks = document.querySelectorAll('.nav-pills li');
const tabContent = document.querySelectorAll('.tab-content');

navLinks.forEach(navLink => {
  navLink.addEventListener('click', event => {
    event.preventDefault();
    navLinks.forEach(link => link.parentElement.classList.remove('active'));
    event.currentTarget.parentElement.classList.add('active');
    tabContent.forEach(tab => tab.classList.remove('active'));
    const tabId = event.currentTarget.getAttribute('data-tab');
    document.getElementById(tabId).classList.add('active');
  });
});
