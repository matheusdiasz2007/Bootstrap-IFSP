import { formatoMoeda, extrairPreco, obterQuantidadeValida, obterNomeIngresso } from '../utils/helpers.js';

export function initFormHandler(formularioCompra, selectTipoIngresso, inputQuantidade, inputNome) {
  const resumoCompra = document.createElement("div");
  resumoCompra.className = "resumo-compra alert alert-primary mt-4 mb-0";
  resumoCompra.setAttribute("role", "status");
  formularioCompra.appendChild(resumoCompra);

  const mensagemFinal = document.createElement("div");
  mensagemFinal.className = "alert alert-success mt-3 mb-0 d-none";
  mensagemFinal.setAttribute("role", "alert");
  formularioCompra.appendChild(mensagemFinal);

  function atualizarResumo() {
    const opcaoSelecionada = selectTipoIngresso.selectedOptions[0];
    const quantidade = obterQuantidadeValida(inputQuantidade);
    const textoIngresso = opcaoSelecionada?.textContent.trim() || "Escolha uma opção";
    const precoUnitario = extrairPreco(textoIngresso);
    const total = precoUnitario * quantidade;

    inputQuantidade.value = quantidade;
    resumoCompra.innerHTML = `
      <strong>Resumo:</strong> ${textoIngresso} | Quantidade: ${quantidade} | 
      Total: ${formatoMoeda.format(total)}
    `;
  }

  selectTipoIngresso.addEventListener("change", atualizarResumo);
  inputQuantidade.addEventListener("input", atualizarResumo);

  formularioCompra.addEventListener("reset", () => {
    setTimeout(() => {
      mensagemFinal.classList.add("d-none");
      atualizarResumo();
    }, 10);
  });

  formularioCompra.addEventListener("submit", (evento) => {
    evento.preventDefault();
    if (!formularioCompra.checkValidity()) {
      formularioCompra.classList.add("was-validated");
      return;
    }

    const nome = inputNome.value.trim().split(" ")[0] || "Cliente";
    const ingresso = selectTipoIngresso.selectedOptions[0].textContent.trim();
    const quantidade = obterQuantidadeValida(inputQuantidade);
    const total = formatoMoeda.format(extrairPreco(ingresso) * quantidade);

    mensagemFinal.textContent = `${nome}, sua compra foi registrada: ${quantidade} ingresso(s) para ${obterNomeIngresso(ingresso)}. Total: ${total}.`;
    mensagemFinal.classList.remove("d-none");
    formularioCompra.classList.remove("was-validated");
  });

  atualizarResumo();
}