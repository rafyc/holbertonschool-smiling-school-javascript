const getCourse = async () => {
  const loader = document.getElementById("loader-container");
  const url = 'https://smileschool-api.hbtn.info/popular-tutorials';

  try {
    const response = await fetch(url);
    const jsonArray = await response.json();
    const length = jsonArray.length;

    jsonArray.forEach((course) => {
      constructCourse(course);
    });

    createCourseSlider(length);
    loader.style.display = "none";
  } catch (error) {
    console.error('Error:', error);
  }
};

const createDOMElement = (tagName, classNames = [], attributes = {}) => {
  const element = document.createElement(tagName);
  element.classList.add(...classNames);
  Object.entries(attributes).forEach(([key, value]) => {
    element.setAttribute(key, value);
  });
  return element;
};

const constructCourse = (course) => {
  const { thumb_url, title, 'sub-title': subTitle, author, author_pic_url, star, duration } = course;
  const videoElement = createDOMElement("div", ["video_element"]);
  const playerContainer = createDOMElement("div", ["player_container"]);
  const videoContent = createDOMElement("div", ["video_content"]);
  const imgPreview = createDOMElement("img", [], { src: thumb_url, alt: "" });
  const imgPlay = createDOMElement("img", ["player"], { src: "./assets/play.png", alt: "player" });
  const videoAuthor = createDOMElement("div", ["video_author"]);
  const h2Title = createDOMElement("h2", [], {});
  h2Title.innerText = title;
  const pDescription = createDOMElement("p", [], {});
  pDescription.innerText = subTitle;
  const authorContainer = createDOMElement("div", ["author"]);
  const imgAvatar = createDOMElement("img", ["min_avatar"], { src: author_pic_url, alt: "teacher" });
  const h3TeacherName = createDOMElement("h3", [], {});
  h3TeacherName.innerText = author;
  const ratingContainer = createDOMElement("div", ["rating"]);
  const starContainer = createDOMElement("div");

  const fullStar = 5;
  const starRating = star;

  for (let i = 0; i < starRating; i++) {
    const imgStar = createDOMElement("img", [], { src: "./assets/Star.png", alt: "star" });
    starContainer.appendChild(imgStar);
  }

  for (let i = 0; i < fullStar - starRating; i++) {
    const imgStarGrey = createDOMElement("img", [], { src: "./assets/Star_grey.png", alt: "star" });
    starContainer.appendChild(imgStarGrey);
  }

  const pDuration = createDOMElement("p", [], {});
  pDuration.innerText = duration;

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

const initSlider = (length, nbElem) => {
  const resizeHandler = () => {
    nbElem = displayWindowSize();
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
    if (clickCount < length - nbElem) {
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

  resizeHandler();
};

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

const createCourseSlider = (length) => {
  let nbElem = displayWindowSize();
  const container = document.querySelector('.video');
  const videoElement = document.querySelector('.video_element');
  const videoElementWidth = videoElement.clientWidth;
  const sliderWidth = nbElem * videoElementWidth;
  container.style.maxWidth = `${sliderWidth}px`;

  initSlider(length, nbElem);
};

getCourse();
