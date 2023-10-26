'use strict';
const slider = function () {
  const slides = document.querySelectorAll(".slide");

  const btnSlideR = document.querySelector(".slider__btn--right");
  const btnSlideL = document.querySelector(".slider__btn--left");
  const slidesContainer = document.querySelector(".slider");
  const dotContainer = document.querySelector(".dots");


  let touchStartX = 0;
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

  // Event listeners for touch events
  slidesContainer.addEventListener("touchstart", (e) => {
    touchStartX = e.touches[0].clientX;
  });

  slidesContainer.addEventListener("touchend", (e) => {
    console.log(e);
    const touchEndX = e.changedTouches[0].clientX;
    const difX = touchEndX - touchStartX;

    if (difX > 0) {
      prevSlide();
    } else if (difX < 0) {
      nextSlide();
    }
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

//Saiba Mais

const buttonSaibaMais = document.querySelector(".button-saiba-mais");
const saibaMaisTexto = document.querySelectorAll(".saiba-mais");

let escondido = false;
let lerMais = true;

buttonSaibaMais.addEventListener("click", () => {
  console.log("clicou");

  escondido = !escondido;
  lerMais = !lerMais;

  saibaMaisTexto.forEach(el => el.classList.contains("mostrar") ? el.classList.remove("mostrar") : el.classList.add("mostrar"));

  buttonSaibaMais.textContent = lerMais ? "Saiba mais" : "Ler menos";

});

const linhas = document.querySelectorAll(".scroll");


linhas.forEach(link => {
  link.addEventListener('click', function (e) {
    e.preventDefault();
    const targetId = this.firstElementChild.getAttribute('href').substring(1);
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  });
});


const menu = document.querySelector(".menu-container");
const nav = document.getElementById("menu");

menu.addEventListener("click", () => {
  nav.classList.toggle("active");
});

