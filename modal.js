/* ----- MODAL -----*/
'use strict';

const cards = document.querySelectorAll(".card");
const buttonsOpen = document.querySelectorAll(".btn--show-modal");

const produtosModal = {
  pamonha: [
    {
      nome: "Pamonha doce",
      preco: "8.00"
    },
    {
      nome: "Pamonha doce com queijo",
      preco: "8.00"
    },
    {
      nome: "Pamonha com linguiça e queijo",
      preco: "8.00"
    }
  ],
  curau: [
    {
      nome: "Curau quente",
      preco: "8.00"
    },
    {
      nome: "Curau temperatura ambiente",
      preco: "8.00"
    },
    {
      nome: "Curau gelado",
      preco: "8.00"
    }
  ],
  bolo: [
    {
      nome: "Pedaço de bolo",
      preco: "8.00"
    }],
  suco: [
    {
      nome: "Suco de milho",
      preco: "7.00"
    }],

  quengas: [{
    nome: "Quenga com frango",
    preco: "8.00"
  },
  {
    nome: "Quenga com calabresa e bacon",
    preco: "8.00"
  }],

  milhoCozido: [{
    nome: "Milho cozido",
    preco: "3.00"
  }],

  geleias: [
    {
      nome: "Geleia de morango",
      preco: "10.00"
    },
    {
      nome: "Geleia de morango com amora",
      preco: "10.00"
    },
    {
      nome: "Geleia de pimenta",
      preco: "10.00"
    }],

  polpa: [
    {
      nome: "Polpa de milho ralado",
      preco: "30.00"
    }
  ]
};

cards.forEach((card, index) => {
  const modalContainer = document.createElement('div');
  modalContainer.innerHTML = /*html*/ `
  <div class="modal">
    <div class="wrap-titulo-modal">
      <h2 class="modal__header">Adicione à sua cesta</h2>
      <button class="btn--close-modal">&times;</button>
    </div>
    <div class="subtitulos-form">
        <h2 class="sabor">Produto</h2>
        <h2 class="quantidade">Quantidade</h2>
    </div>

      <form class="modal__form">
      
      ${Object.keys(produtosModal).map((categoria) => {
    if (categoria === card.getAttribute("id")) {
      return produtosModal[categoria].map((produto, i) => `
          <div class="modal-produto-wrap">
            
              <p>${produto.nome}</p>
        
            <div class="btns-quantidade-container">
              <button class="btn-quantidade btn-menos">-</button>
              <input type="number" value="0" id="quantidade-input-${i}"/>
              <button class="btn-quantidade btn-mais">+</button>
            </div>
          </div>
          `
      ).join('');
    }
  }).join('')}
    
  <div class="container-valor container-valor-modal">
  <span class="total-modal">Total</span>
  <span class="linha linha-modal"></span>
  <span class="valor valor-modal" id="valor-total-${index}">R$ 0.00</span>
</div>
      </form >
   

  <div class="btns-opt-container">
    <button class="btn-opt btn__opt-cesta"><img src="./imgs/carrinhodecompras.svg" />Ver cesta</button>
    <button class="btn-opt btn__opt-continuar"><img src="./imgs/add_shopping_cart_FILL0_wght400_GRAD0_opsz24.svg" />Continuar</button>

   
    <button class="btn-opt btn__opt-finalizar"><a id="icon-whatsapp" aria-label="Chat on WhatsApp" href=""><img src="./imgs/carrinhodecomprasFinalizar.svg" /></a>Finalizar</button>

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

  const scrollPosition = cardTop - (windowHeight / 2) + (cardHeight / 4);

  window.scrollBy({
    top: scrollPosition,
    behavior: 'smooth',
  });
  overlay.classList.remove("hidden");
  document.body.style.overflowY = "hidden";

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
  const carrinhoAtivo = document.querySelector(".modal-carrinho.active-carrinho");

  if (modal) {
    modal.classList.remove("active");
  }

  if (carrinhoAtivo) {
    carrinhoAtivo.classList.remove("active-carrinho");
  }

  overlay.classList.add("hidden");
  document.body.style.overflowY = "scroll";

});

const btnsDiminuir = document.querySelectorAll(".btn-menos");
const btnsAumentar = document.querySelectorAll(".btn-mais");
const valorTotal = document.querySelectorAll(".valor-modal");

function calcValorTotal () {
  cards.forEach((card) => {
    let total = 0;

    const inputs = card.querySelectorAll("input[type='number']");
    const produtos = produtosModal[card.getAttribute("id")];

    inputs.forEach((input, i) => {
      const quantidade = parseInt(input.value);
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

const btnsMais = document.querySelectorAll(".btn-mais");
const btnsMenos = document.querySelectorAll(".btn-menos");
const inputs = document.querySelectorAll("input[type='number']");

btnsMais.forEach((btnMais, index) => {
  btnMais.addEventListener("click", (e) => {
    e.preventDefault();
    const input = inputs[index];
    let valorAtual = parseInt(input.value) || 0;
    if (input) {
      valorAtual++;
      input.value = valorAtual;
      calcValorTotal();
    }
  });
});

btnsMenos.forEach((btnMenos, index) => {
  btnMenos.addEventListener("click", (e) => {
    e.preventDefault();
    const input = inputs[index];
    let valorAtual = input.value;
    if (valorAtual > 0) {
      valorAtual--;
      input.value = valorAtual;
      calcValorTotal();
    }
  });
});



function renderizaCarrinho (index) {

  const modal = modals[index];
  modal.classList.remove("active");

  let listaDiv = document.querySelector(".lista-cesta");

  if (!listaDiv) {
    listaDiv = document.createElement("div");
    listaDiv.classList.add("lista-cesta");
    listaDiv.classList.add("modal-carrinho");
    listaDiv.innerHTML = /*html */`
    <div class="wrap-titulo-modal">
    <h2 class="modal__header">Seu carrinho</h2>
    <button class="btn--close-modal">&times;</button>
  </div>
      <div class="conteudo"></div>
      <div class="container-valor container-valor-modal">
    <span class="total-modal">Total</span>
    <span class="linha linha-modal"></span>
    <span class="valor valor-modal" id="valor-total-${index}">R$ 0.00</span>
    <div class="btns-opt-container">
    <button class="btn-opt btn__opt-continuar"><img src="./imgs/add_shopping_cart_FILL0_wght400_GRAD0_opsz24.svg" />Continuar</button>

    <button class="btn-opt btn__opt-finalizar"><a id="icon-whatsapp" aria-label="Chat on WhatsApp" href=""><img src="./imgs/carrinhodecomprasFinalizar.svg"/></a>Finalizar</button>
    renderiza
  </div>
    `;
    const body = document.querySelector("body");
    body.appendChild(listaDiv);
  } else {
    const lista = document.querySelector(".conteudo");
    lista.innerHTML = "";
  }

  cards.forEach((card) => {
    const lista = document.querySelector(".conteudo");
    const inputs = card.querySelectorAll("input[type='number']");
    const produtos = produtosModal[card.getAttribute("id")];

    inputs.forEach((input, inputIndex) => {
      const quantidade = input.value;
      if (quantidade > 0) {
        const listItem = document.createElement("p");
        listItem.classList.add("item-carrinho");
        listItem.textContent = `${quantidade} - ${produtos[inputIndex].nome}`;
        lista.appendChild(listItem);
      }
    });

  });
  eventoFinalizar();
}


function openCarrinho (index) {
  renderizaCarrinho(index);
  const listaDiv = document.querySelector(".lista-cesta");
  setTimeout(() => {
    listaDiv.classList.add("active-carrinho");
  }, 10);
  overlay.classList.remove("hidden");
  document.body.style.overflowY = "hidden";
}
const verCesta = document.querySelectorAll(".btn__opt-cesta");

verCesta.forEach((btn, index) => {
  btn.addEventListener("click", () => {
    openCarrinho(index);

  });
});

function atualizarURLWhatsApp () {
  const finalizarButtons = document.querySelectorAll(".btn__opt-finalizar #icon-whatsapp");

  let mensagem = "Olá, gostaria de fazer meu pedido:";

  cards.forEach((card) => {
    const inputs = card.querySelectorAll("input[type='number']");
    const produtos = produtosModal[card.getAttribute("id")];

    inputs.forEach((input, inputIndex) => {
      const quantidade = input.value;
      if (quantidade > 0) {
        mensagem += `${quantidade} - ${produtos[inputIndex].nome}`;
      }
    });
  });

  const mensagemUri = encodeURI(mensagem);

  finalizarButtons.forEach((button) => {
    const url = "https://wa.me/55170000000000?text=" + mensagemUri;
    button.setAttribute("href", url);
  });
}


function eventoFinalizar () {
  const finalizarButtons = document.querySelectorAll(".btn__opt-finalizar");
  finalizarButtons.forEach(btn => {
    btn.addEventListener("click", atualizarURLWhatsApp);
  });
}


adicionarEventoFinalizar();