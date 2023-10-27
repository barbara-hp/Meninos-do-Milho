/* ----- MODAL -----*/
'use strict';

const cards = document.querySelectorAll(".card");
const buttonsOpen = document.querySelectorAll(".btn--show-modal");



cards.forEach((card) => {
  const modalContainer = document.createElement('div');
  modalContainer.innerHTML = /*html*/ `
  <div class="modal">
    <div class="wrap-titulo-modal">
      <h2 class="modal__header">Adicione à sua cesta</h2>
      <button class="btn--close-modal">&times;</button>
    </div>
    <form class="modal__form">
      <div class="subtitulos-form">
        <h2 class="sabor">Sabor</h2>
        <h2 class="quantidade">Quantidade</h2>
      </div>
      <div class="modal-produto-wrap">
        <label>Doce</label>
        <div class="btns-quantidade-container">
         
          <button class="btn-quantidade btn-menos">-</button>
          <input type="text" />
          <button class="btn-quantidade btn-mais">+</button>
        </div>
      </div>
      <div class="modal-produto-wrap">
        <label>Doce com queijo</label>
        <div class="btns-quantidade-container">
          <button class="btn-quantidade btn-menos">-</button>
          <input type="text" />
          <button class="btn-quantidade btn-mais">+</button>
        </div>
      </div>
      <div class="modal-produto-wrap">
        <label>Salgado com linguiça e queijo</label>
        <div class="btns-quantidade-container">
          <button class="btn-quantidade btn-menos">-</button>
          <input type="text" />
          <button class="btn-quantidade btn-mais">+</button>
        </div>
      </div>
    </form>
    <div class="btns-opt-container">
        <button class="btn-opt">Minha cesta</button>
        <button class="btn-opt"><a>Seguir comprando</a></button>
        <button class="btn-opt">Finalizar compra</button>
      </div>
  </div>
`;
  card.appendChild(modalContainer);
});

const overlay = document.querySelector(".overlay");
const modals = document.querySelectorAll(".modal");
const buttonsClose = document.querySelectorAll(".btn--close-modal");

function openModal (index) {
  const modal = modals[index];
  // const overlay = overlays[index];
  modal.classList.add("active");


  const card = cards[index];
  const cardPosition = card.getBoundingClientRect();
  const windowHeight = window.innerHeight;

  const cardTop = cardPosition.top;
  const cardHeight = cardPosition.height;

  const scrollPosition = cardTop - (windowHeight / 2) + (cardHeight / 2);

  window.scrollBy({
    top: scrollPosition,
    behavior: 'smooth',
  });
  overlay.classList.remove("hidden");
}



function closeModal (index) {
  const modal = modals[index];
  // const overlay = overlays[index];
  modal.classList.remove("active");
  overlay.classList.add("hidden");
}

buttonsOpen.forEach((button, index) => {
  button.addEventListener("click", function () {
    openModal(index);
  });
});

buttonsClose.forEach((button, index) => {
  button.addEventListener("click", function () {
    closeModal(index);
  });
});

overlay.addEventListener('click', function () {
  const modal = document.querySelector(".modal.active");
  if (modal) {
    modal.classList.remove("active");
    overlay.classList.add("hidden");
  }
});