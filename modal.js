/* ----- MODAL -----*/
// const modal = document.querySelector(".modal");
// const overlay = document.querySelector('.overlay');
// const btnCloseModal = document.querySelector('.btn--close-modal');
// const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
// const card = document.getElementById("pamonha");

// const openModal = function (e) {
//   e.preventDefault();
//   modal.classList.remove('hidden');

// };

// const closeModal = function () {
//   modal.classList.add('hidden');
//   // overlay.classList.add('hidden');
// };

// btnsOpenModal.forEach(btn => {
//   btn.addEventListener("click", openModal);
// });


// btnCloseModal.addEventListener('click', closeModal);
// // overlay.addEventListener('click', closeModal);

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
    <ul>
    <li>Pamonha Doce</li>
    <li>Pamonha Doce com queijo</li>
    <li>Pamonha Salgada com linguiça e queijo</li>
    </ul>
    <form class="modal__form">
      <label>First Name</label>
      <button class="btn">-</button>
      <input type="text" />
      <button class="btn">+</button>
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