import { initTheme } from './modules/theme.js';
import { initTicketSelector } from './modules/ticketSelector.js';
import { initFormHandler } from './modules/formHandler.js';
import { initScrollObservers } from './modules/scrollObserver.js';

document.addEventListener("DOMContentLoaded", () => {
  const botoesCompra = document.querySelectorAll(".comprar-btn");
  const cardsIngresso = document.querySelectorAll(".ingresso-card");
  const formularioCompra = document.querySelector("#formulario");
  const selectTipoIngresso = document.querySelector("#tipoIngresso");
  const inputQuantidade = document.querySelector("#quantidade");
  const inputNome = document.querySelector("#nome");
  const botaoTema = document.querySelector("#alternarTema");

  // Inicializa todos os módulos
  initTheme(botaoTema);
  initTicketSelector(botoesCompra, cardsIngresso, selectTipoIngresso, formularioCompra);
  initFormHandler(formularioCompra, selectTipoIngresso, inputQuantidade, inputNome);
  initScrollObservers();

  // Inicializa Popovers do Bootstrap
  if (window.bootstrap) {
    document.querySelectorAll('[data-bs-toggle="popover"]').forEach(el => {
      new bootstrap.Popover(el);
    });
  }
});