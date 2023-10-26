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
      <div class="produto-wrap">
        <label>Doce</label>
        <div class="btns-quantidade-container">
         
          <button class="btn-quantidade btn-menos">-</button>
          <input type="text" />
          <button class="btn-quantidade btn-mais">+</button>
        </div>
      </div>
      <div class="produto-wrap">
        <label>Doce com queijo</label>
        <div class="btns-quantidade-container">
          <button class="btn-quantidade btn-menos">-</button>
          <input type="text" />
          <button class="btn-quantidade btn-mais">+</button>
        </div>
      </div>
      <div class="produto-wrap">
        <label>Salgado com linguiça e queijo</label>
        <div class="btns-quantidade-container">
          <button class="btn-quantidade btn-menos">-</button>
          <input type="text" />
          <button class="btn-quantidade btn-mais">+</button>
        </div>
      </div>
   
    </div>

    </form>
  </div>
`;
  card.appendChild(modalContainer);
});


buttonsOpen.forEach((button, index) => {
  button.addEventListener("click", function () {
    const modal = document.querySelectorAll(".modal")[index];
    modal.classList.add("active");

  });
});

const buttonsClose = document.querySelectorAll(".btn--close-modal");

buttonsClose.forEach((button, index) => {
  const modal = document.querySelectorAll(".modal")[index];
  button.addEventListener("click", function () {
    modal.classList.remove("active");
  });
});