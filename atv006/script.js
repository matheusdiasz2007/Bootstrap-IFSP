const botoesCompra = document.querySelectorAll(".comprar-btn");
const formularioCompra = document.querySelector("#formulario");
const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]');

popoverTriggerList.forEach((popoverTriggerEl) => {
  new bootstrap.Popover(popoverTriggerEl);
});

botoesCompra.forEach((botao) => {
  botao.addEventListener("click", () => {
    alert("Ingresso selecionado com sucesso!");
  });
});

formularioCompra.addEventListener("submit", (evento) => {
  evento.preventDefault();
  alert("Compra finalizada com sucesso!");
});
