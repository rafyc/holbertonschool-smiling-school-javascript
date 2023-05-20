
const menuBtn = document.querySelector('.menu-btn');
const navbarMenu = document.querySelector('.navbar-menu');

menuBtn.addEventListener('click', function () {
  navbarMenu.classList.toggle('show');
});
