import { obterNomeIngresso } from '../utils/helpers.js';

export function initTicketSelector(botoesCompra, cardsIngresso, selectTipoIngresso, formularioCompra) {
  
  function destacarCard(nomeIngresso) {
    cardsIngresso.forEach((card) => {
      const titulo = card.querySelector(".card-title")?.textContent.trim() || "";
      card.classList.toggle("selecionado", titulo.includes(nomeIngresso));
    });
  }

  function selecionarIngressoPeloCard(botao) {
    const card = botao.closest(".ingresso-card");
    const titulo = card?.querySelector(".card-title")?.childNodes[0]?.textContent.trim();
    if (!titulo) return;

    const opcao = Array.from(selectTipoIngresso.options).find(option => 
      option.textContent.includes(titulo)
    );

    if (opcao) {
      selectTipoIngresso.value = opcao.value;
      destacarCard(titulo);
      formularioCompra.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  botoesCompra.forEach(botao => {
    botao.addEventListener("click", () => selecionarIngressoPeloCard(botao));
  });

  selectTipoIngresso.addEventListener("change", () => {
    const nomeIngresso = obterNomeIngresso(selectTipoIngresso.selectedOptions[0].textContent);
    destacarCard(nomeIngresso);
  });
}