/* ----- MODAL -----*/
'use strict';

const cards = document.querySelectorAll(".card");
const buttonsOpen = document.querySelectorAll(".btn--show-modal");

const produtosModal = [
  [
    { nome: "Pamonha doce", preco: "8" },
    { nome: "Pamonha doce com queijo", preco: "8" },
    { nome: "Pamonha com linguiça e queijo", preco: "R$ 8" }
  ],
  [
    { nome: " Curau quente", preco: "R$ 8" },
    { nome: "Curau temperatura ambiente", preco: "8" },
    { nome: "Curau gelado", preco: "8" }
  ],
  [
    { nome: "Pedaço de bolo", preco: "8" }
  ],
  [
    { nome: "Suco de milho", preco: "8" }
  ],
  [
    { nome: "Quenga com frango", preco: "8" },
    { nome: "Quenga com calabresa e bacon", preco: "8" }
  ],
  [
    { nome: "Milho cozido", preco: "8" }
  ],
  [
    { nome: "Geleia de morango", preco: "8" },
    { nome: "Geleia de morango com amora", preco: "8" },
    { nome: "Geleia de pimenta", preco: "8" },
  ],
  [
    { nome: "Polpa de milho ralado", preco: "8" }
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
        <h2 class="sabor">Produto</h2>
        <h2 class="quantidade">Quantidade</h2>
      </div>
       ${produtosModal[index].map(produto =>
    `<div class="modal-produto-wrap">
          <label>${produto.nome}</label>
          <div class="btns-quantidade-container">
            <button class="btn-quantidade btn-menos">-</button>
            <input type="text"  id="quantidade-input-${index}" />
            <button class="btn-quantidade btn-mais">+</button>
          </div>
        </div>`
  ).join('')}
      
    <div class="container-valor">
    <span class="total-modal">Total</span>
    <span class="linha linha-modal"></span>
    <span class="valor valor-modal" id="valor-total-${index}">R$ 0.00</span>
  </div>
    </form>

    <div class="btns-opt-container">
      <button class="btn-opt btn__opt-cesta"><img src="./imgs/carrinhodecompras.svg"/>Ver cesta</button>
      <button class="btn-opt btn__opt-continuar"><img src="./imgs/add_shopping_cart_FILL0_wght400_GRAD0_opsz24.svg"/>Continuar</button>
      <button class="btn-opt btn__opt-finalizar"><img src="./imgs/carrinhodecomprasFinalizar.svg"/>Finalizar</button>
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
});

const btnsDiminuir = document.querySelectorAll(".btn-menos");
const btnsAumentar = document.querySelectorAll(".btn-mais");
const valorTotal = document.querySelectorAll(".valor-modal");

function calcValorTotal () {
  cards.forEach((card, index) => {
    let total = 0;

    const inputs = card.querySelectorAll("input[type='text']");
    const produtos = produtosModal[index];

    inputs.forEach((input, i) => {
      const quantidade = parseInt(input.value, 10) || 0;
      const preco = parseFloat(produtos[i].preco.replace('R$', '').trim());

      if (!isNaN(preco)) {
        total += quantidade * preco;
      }
    });

    const valorTotal = card.querySelector(".valor-modal");
    const valorFormatado = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(total);
    valorTotal.textContent = valorFormatado;
  });
}

calcValorTotal();

function alterarValor (input, operacao) {
  if (input && input.tagName === 'INPUT' && input.type === 'text') {
    let valorAtual = parseInt(input.value, 10) || 0;

    if (operacao === 'aumentar') {
      valorAtual += 1;
      if (valorAtual > 10) {
        alert("Para pedidos maiores, por gentileza entrar em contato diretamente conosco pelo telefone ou WhatsApp");
        valorAtual = 10;
      }
    } else if (operacao === 'diminuir') {
      valorAtual -= 1;
      if (valorAtual < 0) {
        valorAtual = 0;
      }
    }

    input.value = valorAtual;
    calcValorTotal();
  }
}

btnsAumentar.forEach(function (btnAumentar) {
  btnAumentar.addEventListener("click", function (e) {
    e.preventDefault();
    const input = btnAumentar.previousElementSibling;
    alterarValor(input, 'aumentar');
  });
});

btnsDiminuir.forEach(function (btnDiminuir) {
  btnDiminuir.addEventListener("click", function (e) {
    e.preventDefault();
    const input = btnDiminuir.nextElementSibling;
    alterarValor(input, 'diminuir');
  });
});