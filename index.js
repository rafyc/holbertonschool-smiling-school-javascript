
const menuBtn = document.querySelector('.menu-btn');
const navbarMenu = document.querySelector('.navbar-menu');

menuBtn.addEventListener('click', function () {
  navbarMenu.classList.toggle('show');
});

// Slider animation

const slider = document.querySelector('.slider');
const slide = document.querySelectorAll('.slide')
const slideCount = slide.length;

let newTranslate = 0
let counter = 0

const next = () => {
  if (counter == 0) {
    slider.style["flex-direction"] = 'row'
  }

  newTranslate -= 100
  slider.classList.add('slider-transition');
  slider.style.transform = `translateX(${newTranslate}%)`
  counter++
  console.log(counter);
  console.log(slideCount);
  if (counter == slideCount) {
    slider.classList.remove('slider-transition');
    slider.style.transform = `translateX(0%)`
    newTranslate = 0
    counter = 0
  }
};

const prev = () => {
  console.log('prev');
  slider.style["flex-direction"] = 'row-reverse'
  newTranslate += 100
  slider.classList.add('slider-transition');
  slider.style.transform = `translateX(${newTranslate}%)`
  counter--
  console.log(counter);
  if (counter == slideCount * -1) {
    slider.classList.remove('slider-transition');
    slider.style.transform = `translateX(0%)`
    newTranslate = 0
    counter = 0
  }
};
