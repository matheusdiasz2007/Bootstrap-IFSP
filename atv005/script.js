const botoesCompra = document.querySelectorAll(".comprar-btn");

botoesCompra.forEach((botao) => {
  botao.addEventListener("click", () => {
    alert("Ingresso selecionado com sucesso!");
  });
});
