/* ----- MODAL -----*/
'use strict';

const cards = document.querySelectorAll(".card");
const buttonsOpen = document.querySelectorAll(".btn--show-modal");

const produtosModal = [
  [
    { nome: "Pamonha doce", preco: "R$ 8,00" },
    { nome: "Pamonha doce com queijo", preco: "R$ 8,00" },
    { nome: "Pamonha salgada com linguiça e queijo", preco: "R$ 8,00" }
  ],
  [
    { nome: "Quente", preco: "R$ 8,00" },
    { nome: "Temperatura ambiente - natural", preco: "R$ 8,00" },
    { nome: "Gelado", preco: "R$ 8,00" }
  ],
  [
    { nome: "Bolo", preco: "R$ 8,00" }
  ],
  [
    { nome: "Suco de milho", preco: "R$ 8,00" }
  ],
  [
    { nome: "Frango", preco: "R$ 8,00" },
    { nome: "Calabresa com bacon", preco: "R$ 8,00" }
  ],
  [
    { nome: "Milho cozido", preco: "R$ 8,00" }
  ],
  [
    { nome: "Morango", preco: "R$ 8,00" },
    { nome: "Morango com amora", preco: "R$ 8,00" },
    { nome: "Pimenta", preco: "R$ 8,00" },
  ],
  [
    { nome: "Polpa de milho ralado", preco: "R$ 8,00" }
  ],
];

cards.forEach((card, index) => {
  const modalContainer = document.createElement('div');
  modalContainer.innerHTML = /*html*/ `
  <div class="modal">
    <div class="wrap-titulo-modal">
      <h2 class="modal__header">Adicione à sua cesta</h2>
      <button class="btn--close-modal">&times;</button>
    </div>
    <form class="modal__form">
      <div class="subtitulos-form">
        <h2 class="sabor"></h2>
        <h2 class="quantidade">Quantidade</h2>
      </div>
      ${produtosModal[index].map(produto =>
    `<div class="modal-produto-wrap">
          <label>${produto.nome}</label>
          <div class="btns-quantidade-container">
            <button class="btn-quantidade btn-menos">-</button>
            <input type="text" />
            <button class="btn-quantidade btn-mais">+</button>
          </div>
        </div>`
  ).join('')}
      
      <div class="container-valor">
        <span class="total-modal">Total</span>
        <span class="linha linha-modal"></span>
        <span class="valor valor-modal">R$ 0.00</span>
      </div>
    </form>

    <div class="btns-opt-container">
      <button class="btn-opt">Minha cesta</button>
      <button class="btn-opt">Seguir comprando</button>
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
});;;;