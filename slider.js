const getCourse = async () => {
  const loader = document.getElementById("loader-container");
  const url = 'https://smileschool-api.hbtn.info/popular-tutorials';

  try {
    const response = await fetch(url);
    const jsonArray = await response.json();
    const length = jsonArray.length;

    jsonArray.forEach((course) => {
      const { thumb_url, title, 'sub-title': subTitle, author, author_pic_url, star, duration } = course;
      constructCourse(thumb_url, title, subTitle, author, author_pic_url, star, duration);
    });

    createCourseSlider(length);
    loader.style.display = "none";
  } catch (error) {
    console.error('Error:', error);
  }
};

const constructCourse = (image, title, subTitle, author, authorPic, rating, time) => {
  const videoElement = document.createElement("div");
  videoElement.classList.add("video_element");

  const playerContainer = document.createElement("div");
  playerContainer.classList.add("player_container");

  const videoContent = document.createElement("div");
  videoContent.classList.add("video_content");

  const imgPreview = document.createElement("img");
  imgPreview.src = image;
  imgPreview.alt = "";

  const imgPlay = document.createElement("img");
  imgPlay.src = "./assets/play.png";
  imgPlay.alt = "player";
  imgPlay.classList.add("player");

  const videoAuthor = document.createElement("div");
  videoAuthor.classList.add("video_author");

  const h2Title = document.createElement("h2");
  h2Title.innerText = title;

  const pDescription = document.createElement("p");
  pDescription.innerText = subTitle;

  const authorContainer = document.createElement("div");
  authorContainer.classList.add("author");

  const imgAvatar = document.createElement("img");
  imgAvatar.src = authorPic;
  imgAvatar.alt = "teacher";
  imgAvatar.classList.add("min_avatar");

  const h3TeacherName = document.createElement("h3");
  h3TeacherName.innerText = author;

  const ratingContainer = document.createElement("div");
  ratingContainer.classList.add("rating");

  const starContainer = document.createElement("div");
  const fullStar = 5;
  const starRating = rating;

  for (let i = 0; i < rating; i++) {
    const imgStar = document.createElement("img");
    imgStar.src = "./assets/Star.png";
    imgStar.alt = "star";
    starContainer.appendChild(imgStar);
  }

  for (let i = 0; i < fullStar - starRating; i++) {
    const imgStarGrey = document.createElement("img");
    imgStarGrey.src = "./assets/Star_grey.png";
    imgStarGrey.alt = "star";
    starContainer.appendChild(imgStarGrey);
  }

  const pDuration = document.createElement("p");
  pDuration.innerText = time;

  authorContainer.appendChild(imgAvatar);
  authorContainer.appendChild(h3TeacherName);

  ratingContainer.appendChild(starContainer);
  ratingContainer.appendChild(pDuration);

  videoAuthor.appendChild(h2Title);
  videoAuthor.appendChild(pDescription);
  videoAuthor.appendChild(authorContainer);
  videoAuthor.appendChild(ratingContainer);

  videoContent.appendChild(imgPreview);
  videoContent.appendChild(imgPlay);
  videoContent.appendChild(videoAuthor);

  playerContainer.appendChild(videoContent);
  videoElement.appendChild(playerContainer);

  const videosContainer = document.querySelector('.video_container');
  videosContainer.appendChild(videoElement);
};

const initSlider = (length) => {
  const displayWindowSize = () => {
    let nbItemDisplayed = 4;
    const w = document.documentElement.clientWidth;

    if (w > 1330) {
      nbItemDisplayed = 4;
    } else if (w > 900) {
      nbItemDisplayed = 3;
    } else if (w > 600) {
      nbItemDisplayed = 2;
    } else {
      nbItemDisplayed = 1;
    }

    return nbItemDisplayed;
  };

  const resizeHandler = () => {
    const nbElem = displayWindowSize();
    const videoElementWidth = 275;
    const sliderWidth = nbElem * videoElementWidth;
    const container = document.querySelector('.video');
    container.style.maxWidth = `${sliderWidth}px`;
  };

  window.addEventListener("resize", resizeHandler);

  const carousel = document.querySelector('.video_container');
  const left = document.querySelector('.video-arrow-left');
  const right = document.querySelector('.video-arrow-right');
  const item = document.querySelector('.video_element');
  let n = 1;
  let num = 0;
  let clickCount = 0;

  right.addEventListener('click', () => {
    if (clickCount < (length - (nbElem))) {
      clickCount++;
      num -= n * item.clientWidth;
      carousel.style.transform = `translateX(${num}px)`;
    }
  });

  left.addEventListener('click', () => {
    if (clickCount > 0) {
      clickCount--;
      num += n * item.clientWidth;
      carousel.style.transform = `translateX(${num}px)`;
    }
  });

  const nbElem = displayWindowSize();
  const container = document.querySelector('.video');
  const videoElement = document.querySelector('.video_element');
  const videoElementWidth = videoElement.clientWidth;
  const sliderWidth = nbElem * videoElementWidth;
  container.style.maxWidth = `${sliderWidth}px`;

  resizeHandler();
};

const createCourseSlider = (length) => {
  const displayWindowSize = () => {
    let nbItemDisplayed = 4;
    const w = document.documentElement.clientWidth;

    if (w > 1330) {
      nbItemDisplayed = 4;
    } else if (w > 900) {
      nbItemDisplayed = 3;
    } else if (w > 600) {
      nbItemDisplayed = 2;
    } else {
      nbItemDisplayed = 1;
    }

    return nbItemDisplayed;
  };

  window.addEventListener("resize", () => {
    const nbElem = displayWindowSize();
    const container = document.querySelector('.video');
    const videoElement = document.querySelector('.video_element');
    const videoElementWidth = videoElement.clientWidth;
    const sliderWidth = nbElem * videoElementWidth;
    container.style.maxWidth = `${sliderWidth}px`;
    initSlider(length);
  });

  const nbElem = displayWindowSize();
  const container = document.querySelector('.video');
  const videoElement = document.querySelector('.video_element');
  const videoElementWidth = videoElement.clientWidth;
  const sliderWidth = nbElem * videoElementWidth;
  container.style.maxWidth = `${sliderWidth}px`;

  initSlider(length);
};

getCourse();
