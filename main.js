// 'use strict';
const slider = function () {
  const slides = document.querySelectorAll(".slide");

  const btnSlideR = document.querySelector(".slider__btn--right");
  const btnSlideL = document.querySelector(".slider__btn--left");
  const slidesContainer = document.querySelector(".slider");
  const dotContainer = document.querySelector(".dots");


  let currentSlide = 0;
  const maxSlide = slides.length;

  //Funtions
  const createDots = function () {
    slides.forEach(function (_, i) {
      dotContainer.insertAdjacentHTML("beforeend",
        `<button class="dots__dot" data-slide="${i}"></button>`);
    });
  };


  const activateDot = function (slide) {
    document.querySelectorAll(".dots__dot").forEach(dot => dot.classList.remove("dots__dot--active"));

    document.querySelector(`.dots__dot[data-slide="${slide}"]`).classList.add("dots__dot--active");
  };

  const goToSlide = function (slide) {
    slides.forEach((s, i) => s.style.transform = `translateX(${100 * (i - slide)}%)`);
  };



  const nextSlide = function () {
    if (currentSlide === maxSlide - 1) {
      currentSlide = 0;
    } else {
      currentSlide++;
    }
    goToSlide(currentSlide);
    activateDot(currentSlide);
  };

  const prevSlide = function () {

    if (currentSlide === 0) {
      currentSlide = maxSlide - 1;
    } else {
      currentSlide--;
    }

    goToSlide(currentSlide);
    activateDot(currentSlide);
  };

  const init = function () {
    goToSlide(0);
    createDots();
    activateDot(0);

  };
  init();


  //Event Handlers
  btnSlideR.addEventListener("click", nextSlide);
  btnSlideL.addEventListener("click", prevSlide);

  document.addEventListener("keydown", function (e) {
    console.log(e);
    if (e.key === "ArrowLeft") prevSlide();
    e.key === "ArrowRight" && nextSlide();

  });

  dotContainer.addEventListener("click", function (e) {
    const event = e.target;
    if (event.classList.contains("dots__dot")) {
      const { slide } = e.target.dataset;
      goToSlide(slide);
      activateDot(slide);
    }
  });
};
slider();