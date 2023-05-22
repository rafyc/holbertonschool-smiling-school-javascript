
const menuBtn = document.querySelector('.menu-btn');
const navbarMenu = document.querySelector('.navbar-menu');

menuBtn.addEventListener('click', function () {
  navbarMenu.classList.toggle('show');
});

// Slider animation

// Here we're going to move the active class between the slides. You can do this however you want, but for brevity I'm using JQuery.

// Get all the slides
var slides = $('.slide');

// Move the last slide before the first so the user is able to immediately go backwards
slides.first().before(slides.last());

$('.slider-nav').on('click', function () {
  // Get all the slides again
  slides = $('.slide');
  // Register button
  var button = $(this);
  // Register active slide
  var activeSlide = $('.active');

  // Next function
  if (button.attr('id') == 'next') {
    // Move first slide to the end so the user can keep going forward
    slides.last().after(slides.first());
    // Move active class to the right
    activeSlide.removeClass('active').next('.slide').addClass('active');
  }

  // Previous function
  if (button.attr('id') == 'prev') {
    // Move the last slide before the first so the user can keep going backwards
    slides.first().before(slides.last());
    // Move active class to the left
    activeSlide.removeClass('active').prev('.slide').addClass('active');
  }
});
