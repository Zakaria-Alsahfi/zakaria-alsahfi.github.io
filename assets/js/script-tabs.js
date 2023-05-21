<!--
//const tabs = document.querySelectorAll('.nav-pills li a');
//const tabContents = document.querySelectorAll('.tab-content');
//tabs.forEach((tab, tabIndex) => {
  //tab.addEventListener('click', (event) => {
    //event.preventDefault();

    //tabs.forEach((t) => {
     // t.classList.remove('active');
    //});

    //tabContents.forEach((c) => {
     // c.classList.remove('active');
    //});

   // tab.classList.add('active');
   // tabContents[tabIndex].classList.add('active');
  //});
//}); 
-->
const tabLinks = document.querySelectorAll('.tab-link');
const redLine = document.querySelector('.red-line');
const tabContents = document.querySelectorAll('.tab-content');

tabLinks.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const tabId = e.target.getAttribute('data-tab');
    const currentTab = document.querySelector(`#${tabId}`);
    const currentLink = e.target;

    tabContents.forEach(tab => {
      tab.classList.remove('active');
    });

    tabLinks.forEach(link => {
      link.classList.remove('active');
    });

    currentTab.classList.add('active');
    currentLink.classList.add('active');

    const activeLink = document.querySelector('.tab-link.active');
    const activeLinkWidth = activeLink.offsetWidth;
    const activeLinkPosition = activeLink.getBoundingClientRect().left;
    const tabsContainer = document.querySelector('.tabs');
    const tabsContainerPosition = tabsContainer.getBoundingClientRect().left;
    const newRedLinePosition = activeLinkPosition - tabsContainerPosition;
    redLine.style.transform = `translateX(${newRedLinePosition}px)`;
    redLine.style.width = `${activeLinkWidth}px`;
  });
});
