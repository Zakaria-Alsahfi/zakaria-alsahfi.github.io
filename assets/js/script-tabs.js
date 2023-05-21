const tabs = document.querySelectorAll('.nav-pills li a');
const tabContents = document.querySelectorAll('.tab-content');

tabs.forEach((tab, tabIndex) => {
  tab.addEventListener('click', (event) => {
    event.preventDefault();

    tabs.forEach((t) => {
      t.classList.remove('active');
    });

    tabContents.forEach((c) => {
      c.classList.remove('active');
    });

    tab.classList.add('active');
    tabContents[tabIndex].classList.add('active');
  });
});
