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
  }, 1000)
};




const getCourse = () => {
  var xhttp = new XMLHttpRequest();
  var loader = document.getElementById("course-loader");
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      var jsonArray = JSON.parse(this.responseText);
      let length = jsonArray.length
      console.log(jsonArray[0]);
      for (let i = 0; i < length; i++) {
        let index = i
        let image = jsonArray[i].thumb_url
        let titre = jsonArray[i].title
        let key = 'sub-title'
        let desc = `jsonArray[i].${key}`
        let author = jsonArray[i].author
        let authorPic = jsonArray[i].author_pic_url
        let rating = jsonArray[i].star
        let time = jsonArray[i].duration
        constructCourse(image, titre, desc, author, authorPic, rating, time)
      }
      // createSlider()
      loader.style.display = "none";
    }
  }
  url = 'https://smileschool-api.hbtn.info/popular-tutorials'
  setTimeout(function () {
    xhttp.open("GET", url, true);
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

const constructCourse = (image, titre, desc, author, authorPic, rating, time) => {
  // Create the first <div> element with class "video_element"
  var divVideoElement1 = document.createElement("div");
  divVideoElement1.classList.add("video_element");
  console.log('created');

  // Create the first <div> element with class "player_container"
  var divPlayerContainer1 = document.createElement("div");
  divPlayerContainer1.classList.add("player_container");

  // Create the first <div> element with class "video_content"
  var divVideoContent1 = document.createElement("div");
  divVideoContent1.classList.add("video_content");

  // Create the <img> element with src and alt attributes
  var imgPreview1 = document.createElement("img");
  imgPreview1.src = image;
  imgPreview1.alt = "";

  // Create the <img> element for the play button
  var imgPlay1 = document.createElement("img");
  imgPlay1.src = "./assets/play.png";
  imgPlay1.alt = "player";
  imgPlay1.classList.add("player");

  // Create the <div> element with class "video_author"
  var divVideoAuthor1 = document.createElement("div");
  divVideoAuthor1.classList.add("video_author");

  // Create the <h2> element for the video title
  var h2Title1 = document.createElement("h2");
  h2Title1.innerText = titre;

  // Create the <p> element for the video description
  var pDescription1 = document.createElement("p");
  pDescription1.innerText = desc;

  // Create the <div> element with class "author"
  var divAuthor1 = document.createElement("div");
  divAuthor1.classList.add("author");

  // Create the <img> element for the teacher avatar
  var imgAvatar1 = document.createElement("img");
  imgAvatar1.src = authorPic;
  imgAvatar1.alt = "teacher";
  imgAvatar1.classList.add("min_avatar");

  // Create the <h3> element for the teacher's name
  var h3TeacherName1 = document.createElement("h3");
  h3TeacherName1.innerText = author;

  // Create the <div> element with class "rating"
  var divRating1 = document.createElement("div");
  divRating1.classList.add("rating");

  // Create the <div> element for the star ratings
  var divStars1 = document.createElement("div");
  // Create and append the star images
  let fullStar = 5
  let starRating = rating
  for (var i = 0; i < rating; i++) {
    var imgStar1 = document.createElement("img");
    imgStar1.src = "./assets/Star.png";
    imgStar1.alt = "star";
    divStars1.appendChild(imgStar1);
  }
  // Create the gray star image
  for (let i = 0; i < fullStar - starRating; i++) {
    var imgStarGrey1 = document.createElement("img");
    imgStarGrey1.src = "./assets/Star_grey.png";
    imgStarGrey1.alt = "star";
    divStars1.appendChild(imgStarGrey1);
  }


  // Create the <p> element for the video duration
  var pDuration1 = document.createElement("p");
  pDuration1.innerText = time;

  // Append the elements to build the structure
  divAuthor1.appendChild(imgAvatar1);
  divAuthor1.appendChild(h3TeacherName1);

  divRating1.appendChild(divStars1);
  divRating1.appendChild(pDuration1);

  divVideoAuthor1.appendChild(h2Title1);
  divVideoAuthor1.appendChild(pDescription1);
  divVideoAuthor1.appendChild(divAuthor1);
  divVideoAuthor1.appendChild(divRating1);

  divVideoContent1.appendChild(imgPreview1);
  divVideoContent1.appendChild(imgPlay1);
  divVideoContent1.appendChild(divVideoAuthor1);

  divPlayerContainer1.appendChild(divVideoContent1)
  divVideoElement1.appendChild(divPlayerContainer1)

  var videosContainer = document.querySelector('.video_container');
  videosContainer.appendChild(divVideoElement1);
}


getQuotes()

getCourse()
