

const getCourse = () => {

  var xhttp = new XMLHttpRequest();
  var loader = document.getElementById("loader-container");

  xhttp.onreadystatechange = function () {

    if (this.readyState == 4 && this.status == 200) {
      var jsonArray = JSON.parse(this.responseText);
      let length = jsonArray.length

      for (let i = 0; i < length; i++) {
        let index = i
        let image = jsonArray[i].thumb_url
        let titre = jsonArray[i].title
        let desc = jsonArray[i]['sub-title'];
        let author = jsonArray[i].author
        let authorPic = jsonArray[i].author_pic_url
        let rating = jsonArray[i].star
        let time = jsonArray[i].duration
        constructCourse(image, titre, desc, author, authorPic, rating, time)
      }

      createCourseSlider(length)
      loader.style.display = "none";

    }
  }

  url = 'https://smileschool-api.hbtn.info/popular-tutorials'

  setTimeout(function () {

    xhttp.open("GET", url, true);
    xhttp.send();
  }, 2000)

};

const constructCourse = (image, titre, desc, author, authorPic, rating, time) => {
  // Create the first <div> element with class "video_element"
  var divVideoElement1 = document.createElement("div");
  divVideoElement1.classList.add("video_element");

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
const initSlider = (length) => {
  window.addEventListener("resize", function () {
    nbElem = displayWindowSize();
    function displayWindowSize() {
      let nbItemDisplayed = 4
      // Get width and height of the window excluding scrollbars
      var w = document.documentElement.clientWidth;

      if (w > 1330) {
        nbItemDisplayed = 4;
      } else if (w > 900) {
        nbItemDisplayed = 3;
      } else if (w > 600) {
        nbItemDisplayed = 2;
      } else {
        nbItemDisplayed = 1
      }
      return nbItemDisplayed
    }


    // let videoElement = document.querySelector('.video_element');
    let videoElementWidth = 275
    let sliderWidth = nbElem * videoElementWidth
    let container = document.querySelector('.video')
    container.style.maxWidth = `${sliderWidth}px`

    // Carousel arrows left/right
    let carousel = document.querySelector('.video_container');
    let left = document.querySelector('.video-arrow-left');
    let right = document.querySelector('.video-arrow-right');
    let item = document.querySelector('.video_element');
    // how many elements to scroll
    let n = 1;
    let num = 0
    let clickCount = 0;

    right.addEventListener('click', function () {

      if (clickCount < (length - (nbElem))) {
        clickCount++;
        num -= n * item.clientWidth
        carousel.style.transform = `translateX(${num}px)`
      }
    });

    left.addEventListener('click', function () {
      if (clickCount > 0) {
        clickCount--;
        num += n * item.clientWidth
        carousel.style.transform = `translateX(${num}px)`
      }
    });
  })
}


const createCourseSlider = (length) => {

  window.addEventListener("resize", function () {
    nbElem = displayWindowSize();

    function displayWindowSize() {
      let nbItemDisplayed = 4
      // Get width and height of the window excluding scrollbars
      var w = document.documentElement.clientWidth;

      if (w > 1330) {
        nbItemDisplayed = 4;
      } else if (w > 900) {
        nbItemDisplayed = 3;
      } else if (w > 600) {
        nbItemDisplayed = 2;
      } else {
        nbItemDisplayed = 1
      }
      return nbItemDisplayed
    }

    // responsive

    // Main elements

  });

  function displayWindowSize() {
    let nbItemDisplayed = 4
    // Get width and height of the window excluding scrollbars
    var w = document.documentElement.clientWidth;

    if (w > 1330) {
      nbItemDisplayed = 4;
    } else if (w > 900) {
      nbItemDisplayed = 3;
    } else if (w > 600) {
      nbItemDisplayed = 2;
    } else {
      nbItemDisplayed = 1
    }
    return nbItemDisplayed
  }

  let carousel = document.querySelector('.video_container');
  let left = document.querySelector('.video-arrow-left');
  let right = document.querySelector('.video-arrow-right');
  let item = document.querySelector('.video_element');
  // how many elements to scroll
  let n = 1;
  let num = 0
  let clickCount = 0;

  right.addEventListener('click', function () {

    if (clickCount < (length - (nbElem))) {
      clickCount++;
      num -= n * item.clientWidth
      carousel.style.transform = `translateX(${num}px)`
    }
  });

  left.addEventListener('click', function () {
    if (clickCount > 0) {
      clickCount--;
      num += n * item.clientWidth
      carousel.style.transform = `translateX(${num}px)`
    }
  });

  let nbElem = displayWindowSize()
  let container = document.querySelector('.video')


  let videoElement = document.querySelector('.video_element');

  let videoElementWidth = videoElement.clientWidth


  let sliderWidth = nbElem * videoElementWidth
  container.style.maxWidth = `${sliderWidth}px`



  initSlider(length)
}

getCourse()
