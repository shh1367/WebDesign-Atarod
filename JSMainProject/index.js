const courses = document.getElementById("courses");
const subNav = document.querySelector(".sub-nav");
const subNavBox = document.querySelector(".sub-nav-box");
const popup = document.querySelector(".popup");
const signUpButton = document.querySelector(".header-button-link");
const closePopupBtn = document.querySelector(".popup .fa-times");
const overlay = document.querySelector(".overlay");
const form = document.getElementById("form");
const userName = document.getElementById("username");
const password = document.getElementById("password");
const recaptchaBox = document.getElementById("recaptcha-box");
const openMenuIcon = document.getElementById("open-menu");
const closeMenuIcon = document.getElementById("close-menu");
const hamburgerMenu = document.querySelector(".hamburger-menu");
const globalHeader = document.querySelector(".global-header");
const container = document.querySelector(".container");
const topBar = document.querySelector(".top-bar");
const sideBarSubMenu = document.querySelector(".menu-item-has-children");
const sideBarSubMenuUl = document.querySelector(".menu-item-has-children ul");
const topBarUserLogin = document.querySelector(
  ".top-bar-items-mobile .fa-user-circle"
);
const secCounternBanner = document.querySelector(".sec-counter span");
const minCounternBanner = document.querySelector(".min-counter span");
const hourCounternBanner = document.querySelector(".hour-counter span");
const dayCounternBanner = document.querySelector(".day-counter span");
const topBarToggleSearch = document.getElementById("toggle-search");
const headerSearchRow = document.querySelector(".search-row");
const topBarsearchInput = document.querySelector("search-input");
const featuredCourse = document.querySelector(".featured-course");
const backToTop = document.querySelector(".back-to-top");
const newestCourseContainer = document.querySelector(
  ".newest-course-container"
);

//onload

window.onbeforeunload = function () {
  window.scrollTo(0, 0);
};

//onload

//event listener
courses.addEventListener("mouseover", function () {
  subNav.style.opacity = 1;
  subNav.style.height = `${400}px`;
});

subNav.addEventListener("mouseleave", function () {
  subNav.style.opacity = 0;
  subNav.style.height = `${0}px`;
});

signUpButton.addEventListener("click", showModal);

closePopupBtn.addEventListener("click", closePopup);

overlay.addEventListener("click", closeModal);

form.addEventListener("submit", function (event) {
  event.preventDefault();
  checkInputs();
});

sideBarSubMenu.addEventListener("click", toggleDropDownMenu);
topBarUserLogin.addEventListener("click", showModal);

//test

userName.addEventListener("input", function (event) {
  const userNameValueTest = event.target.value.trim();
  const currentUserNameValue = userName.value;
  console.log(userNameValueTest);
  const pattern = /^([a-zA-Z0-9\.-]+)@([a-z0-9]+).([a-z]{2,5})(.[a-z{2,5}])?$/;

  if (userNameValueTest.length === 0) {
    userName.classList.remove("error");
  } else if (userNameValueTest.length > 1 && pattern.test(userNameValueTest)) {
    setSuccessFor(userName);
  } else {
    userName.classList.remove("success");
    setErrorFor(userName, "نام کاربری معتبر نمی باشد");
  }
});

//test

openMenuIcon.addEventListener("click", openHamburgerMenu);

closeMenuIcon.addEventListener("click", closeHamburgerMenu);
window.addEventListener("scroll", function () {
  // console.log(globalHeader.offsetHeight)
  // console.log(globalHeader.offsetTop)
  // console.log(window.scrollY)
  if (globalHeader.offsetTop + globalHeader.offsetHeight < window.scrollY) {
    globalHeader.style.position = "fixed";
  } else {
    globalHeader.style.position = "relative";
  }

  const featuredCourseOpacity = this.window
    .getComputedStyle(featuredCourse)
    .getPropertyValue("opacity");
  const newestCourseContainerOpacity = this.window
    .getComputedStyle(newestCourseContainer)
    .getPropertyValue("opacity");

  let newestCourseContainerHeight = this.window
    .getComputedStyle(newestCourseContainer)
    .getPropertyPriority("height");

  // console.log(scrollY , this.window.innerHeight , newestCourseContainerHeight)
  if (
    featuredCourseOpacity <= 0 &&
    featuredCourse.scrollHeight / 2 < window.scrollY
  ) {
    featuredCourse.classList.add("active");
    // console.log('blob')
  } else {
    featuredCourse.classList.add("active");
  }
  // console.log(newestCourseContainer.scrollHeight)

  if (
    newestCourseContainerOpacity <= 0 &&
    newestCourseContainer.scrollHeight < window.scrollY
  ) {
    newestCourseContainer.classList.add("active");
  }
});

topBarToggleSearch.addEventListener("click", toggleSearchHandler);

backToTop.addEventListener("click", backToTopFunc);

// function

function showModal() {
  const spanBtn = signUpButton.querySelector("span");
  if (spanBtn.innerText === "ورود و ثبت نام") {
    popup.classList.add("active");
    overlay.classList.add("active");
    document.body.style.overflow = "hidden";
  }
}

function closePopup() {
  popup.classList.remove("active");
  overlay.classList.remove("active");
  document.body.style.overflow = "visible";
}

function closeModal() {
  overlay.classList.remove("active");
  closePopup();
}

function checkInputs() {
  const userNameValue = userName.value.trim();
  const passwordValue = password.value.trim();
  if (userNameValue === "") {
    setErrorFor(userName, "نام کاربری حتما باید وارد شود");
  } else if (!validateEmail(userNameValue)) {
    setErrorFor(userName, "ایمیل باید بدرستی وارد شود");
  } else {
    setSuccessFor(userName);
  }
  if (passwordValue === "") {
    setErrorFor(password, "رمز عبور حتما باید بدرستی وارد شود");
  } else if (passwordValue.length < 6) {
    setErrorFor(password, "رمز عبور حتما باید بیشتر از 6 کاراکتر باشد");
  } else {
    setSuccessFor(password);
  }

  checkRecaptcha();
}

function setErrorFor(input, message) {
  const modalInputParentElement = input.parentElement;
  const small = modalInputParentElement.querySelector("small");
  small.innerText = message;
  // modalInputParentElement.classList = 'form-controll error';
  modalInputParentElement.classList.add("error");
  modalInputParentElement.classList.remove("success");
  return false;
}

function setSuccessFor(input) {
  const modalInputParentElement = input.parentElement;
  const small = modalInputParentElement.querySelector("small");
  small.style.visibility = "none";
  modalInputParentElement.classList = "form-controll success";
  modalInputParentElement.classList.remove("error");
}

function validateEmail(email) {
  const pattern = /^([a-zA-Z0-9\.-]+)@([a-z0-9]+).([a-z]{2,5})(.[a-z{2,5}])?$/;
  return pattern.test(email);
}
function checkRecaptcha() {
  const response = grecaptcha.getResponse();
  // console.log(response)
  if (response.length === 0) {
    setErrorFor(recaptchaBox, "من ربات نیستم را علامت بزنید");
  } else {
    closeModal();
    const span = signUpButton.querySelector("span");
    span.innerText = "حساب کاربری";
  }
}

function openHamburgerMenu() {
  hamburgerMenu.classList.add("active");
  const hamburgerMenuWidth =
    getComputedStyle(hamburgerMenu).getPropertyValue("width");
  console.log(hamburgerMenuWidth);
  globalHeader.style.transform = `translate(${hamburgerMenuWidth} , 0)`;
  topBar.style.transform = `translate(${hamburgerMenuWidth} , 0)`;
  document.body.style.overflow = "hidden";
  closeMenuIcon.style.display = "block";
  this.style.display = "none";
  container.style.transform = `translate(${hamburgerMenuWidth} ,0)`;
}

function closeHamburgerMenu() {
  hamburgerMenu.classList.remove("active");
  globalHeader.style.transform = `translate(0 ,0)`;
  container.style.transform = `translate(0,0)`;
  topBar.style.transform = `translate(0,0)`;
  openMenuIcon.style.display = "block";
  this.style.display = "none";
  document.body.style.overflow = "visible";
}

function toggleDropDownMenu() {
  const iElement = this.querySelector("i");
  //   console.log(iElement)
  console.log(sideBarSubMenuUl);
  if (iElement.className === "fa fa-angle-left") {
    iElement.classList = "fa fa-angle-down";
  } else {
    iElement.classList = "fa fa-angle-left";
    sideBarSubMenuUl.classList.remove("active");
  }
  const ulElement = this.querySelector("ul");
  ulElement.classList.toggle("active");
  ulElement.classList.add("active");
  ulElement.classList.remove("active");
}

function toggleSearchHandler() {
  if (this.className === "fa fa-search") {
    globalHeader.classList.add("disabled");
    headerSearchRow.classList.add("active");
    this.className = "fa fa-times";
    addSearchRecognition();
  } else {
    globalHeader.classList.remove("disabled");
    headerSearchRow.classList.remove("active");
    this.className = "fa fa-search";
  }
}

function addSearchRecognition() {
  const webkitSpeechRecognition =
    window.speechRecognition || window.webkitSpeechRecognition;
  console.log(new webkitSpeechRecognition());
  // window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  // const recognition = new SpeechRecognition();
  // recognition.lang = 'fa-IR';
  // recognition.interimResults = true;
  // recognition.addEventListener('result' , e=>{
  //     console.log(e.results);
  // });
  // recognition.start();
}

//function

// animation border for menu item
const menuItem = document.querySelectorAll(".nav-menu li");
const menuItemUnderLine = document.createElement("span");
menuItemUnderLine.classList.add("under-line-highlight");
document.body.appendChild(menuItemUnderLine);

menuItem.forEach((item) => {
  item.addEventListener("mouseenter", highlight);
});

function highlight() {
  const itemCordinate = this.getBoundingClientRect();
  const { left, width, bottom } = itemCordinate;
  menuItemUnderLine.style.width = `${width}px`;
  menuItemUnderLine.style.transform = `translate(${left}px , ${bottom}px)`;
}

function backToTopFunc() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

// animation border for menu item

// count-down
const desiredPublishDate = "10 feb 2024";
function countDown() {
  const PublishDateObj = new Date(desiredPublishDate);
  const currentDate = new Date();
  const timeToPublishMilisec = PublishDateObj - currentDate;
  // console.log(timeToPublishMilisec)

  const totalSeconds = timeToPublishMilisec / 1000;
  const days = Math.floor(totalSeconds / 3600 / 24);

  const hours = Math.floor((totalSeconds / 3600) % 60);
  const minutes = Math.floor((totalSeconds / 60) % 60);
  const second = Math.floor(totalSeconds % 60);

  // console.log(days , hours);
  dayCounternBanner.innerHTML = days;
  hourCounternBanner.innerHTML = hours;
  minCounternBanner.innerHTML = minutes;
  secCounternBanner.innerHTML = second;
}
countDown();
setInterval(countDown, 1000);
// count-down

//shopping-cart
let sumPrice = 0;
const shoppingCartTotal = document.querySelector(".shopping-cart-total");
const shoppingCartBoxPriceEl = document.querySelectorAll(
  ".shopping-cart-items .shopping-cart-item .item-price"
);
shoppingCartBoxPriceEl.forEach((item) => {
  const shoppingCartBoxPrice = item.innerText;
  const shoppingCartBoxPriceValue = Number(shoppingCartBoxPrice.match(/\d+/));
  sumPrice += shoppingCartBoxPriceValue;
});

shoppingCartTotal.innerText = `مجموع هزینه ${sumPrice} میباشد`;

const shoppingcartIcon = document.querySelector(".mini-cart-opener");
const shoppingcartBox = document.querySelector(".shopping-cart-box");
shoppingcartIcon.addEventListener("click", toggleShoppingcartBox);

function toggleShoppingcartBox() {
  shoppingcartBox.classList.toggle("active");
}

shoppingcartBox.addEventListener("click", function (e) {
  e.preventDefault;
  console.log(e.target);
});
//shopping-cart

//course-slider

const slider = document.querySelector(".discount-course-container");
const carousel = document.querySelector(".discount-middle-container");
const next = document.querySelector(
  ".discount-courses-slide-holder .fa-angle-right"
);
const prev = document.querySelector(
  ".discount-courses-slide-holder .fa-angle-left"
);
const courseItems = document.querySelectorAll(
  ".discount-course-container .course"
);
const courseWidth = window
  .getComputedStyle(courseItems[0])
  .getPropertyValue("width");
//  console.log(courseWidth)
let direction;

next.addEventListener("click", function () {
  direction = -1;
  carousel.style.justifyContent = "flex-start";
  slider.style.transform = `translateX(-${courseWidth})`;
});
prev.addEventListener("click", function () {
  if (direction === -1) {
    direction = 1;
    slider.appendChild(slider.firstElementChild);
  }
  carousel.style.justifyContent = "flex-end";
  slider.style.transform = `translateX(${courseWidth})`;
});

slider.addEventListener("transitionend", function () {
// console.log('transitionend')
if(direction === 1 ){
  slider.prepend(slider.lastElementChild);

}else {
  slider.appendChild(slider.firstElementChild);
}
slider.style.transition = 'none';
slider.style.transform = 'translateX(0)';

setTimeout(() => {
  slider.style.transition = 'all 500ms';
});

} , false);

//course-slider


//user-comments

const comments = document.querySelectorAll('.comments-container .comment');
const dotContainer = document.querySelector('.dots-container');

comments.forEach((item , index ) => {
  const span = document.createElement('span');
  span.classList.add('dots');
  span.setAttribute('position' , index);
  
  span.addEventListener('click' , slideComment);
  // console.log('test');
  
  dotContainer.appendChild(span);
  // span.style.opacity = 0.5; 
});

let commentWidth = window.getComputedStyle(comments[0]).getPropertyValue('width');
commentWidth = Number(commentWidth.match(/\d+/));
const commentContainer = document.querySelector('.comments-container');
// 

function slideComment(e){
  console.log(e.target);
  const position = e.target.getAttribute('position');
  // console.log(position);
  commentContainer.style.transform = `translateX(-${position*commentWidth}px)`;
  dotContainer.querySelectorAll('.dots').forEach((item)=> {
    item.style.opacity = 0.5;
  })
  e.target.style.opacity = 1;
  

}

//user-comments

