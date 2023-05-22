
const menuBtn = document.querySelector('.menu-btn');
const navbarMenu = document.querySelector('.navbar-menu');

menuBtn.addEventListener('click', function () {
  navbarMenu.classList.toggle('show');
});

const getQuotes = () => {
  var xhttp = new XMLHttpRequest();
  var loader = document.getElementById("loader");
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      var jsonArray = JSON.parse(this.responseText);
      let length = jsonArray.length
      console.log(jsonArray[0]);
      for (let i = 0; i < length; i++) {
        let index = i
        let image = jsonArray[i].pic_url
        let quote = jsonArray[i].text
        let name = jsonArray[i].name
        let title = jsonArray[i].title
        construct(image, quote, name, title, index)
      }
      createSlider()
      loader.style.display = "none";
    }
  }
  url = '"https://smileschool-api.hbtn.info/quotes'
  setTimeout(function () {
    xhttp.open("GET", './obj.json', true);
    xhttp.send();
  }, 2000)
};




const createSlider = () => {
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

}







const construct = (image, quote, name, title, index) => {
  var slider = document.getElementsByClassName('slider-container')[0]

  // Create the main <div> element with class "slide" and "active"
  var divSlide = document.createElement("div");
  divSlide.classList.add("slide");
  if (index === 0) {
    console.log(index)
    divSlide.classList.add("active");
  }


  // Create the inner <div> element with class "quote_container"
  var divQuoteContainer = document.createElement("div");
  divQuoteContainer.classList.add("quote_container");

  // Create the <img> element with src and alt attributes
  var img = document.createElement("img");
  img.src = image;
  img.alt = "";

  var contain = document.createElement("div");
  contain.id = "contain";

  // Create the <blockquote> element with id "quote" and text content
  var blockquote = document.createElement("blockquote");
  blockquote.id = "quote";
  blockquote.innerText = quote;

  // Create the <p> element with class "person_name"
  var pPersonName = document.createElement("p");
  pPersonName.classList.add("person_name");
  pPersonName.innerHTML = name

  // Create the <p> element with class "subtitle_name" and text content
  var pSubtitleName = document.createElement("p");
  pSubtitleName.classList.add("subtitle_name");
  pSubtitleName.innerText = title;

  // Append the elements to build the structure
  contain.appendChild(blockquote);
  contain.appendChild(pPersonName);
  contain.appendChild(pSubtitleName);

  divQuoteContainer.appendChild(img);
  divQuoteContainer.appendChild(contain);

  divSlide.appendChild(divQuoteContainer);

  slider.appendChild(divSlide);

  // createSlider()

  // Now you can append the constructed element to the desired parent element in your HTML document.
}

getQuotes()

