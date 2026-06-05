document.addEventListener("DOMContentLoaded", () => {
  const formatoMoeda = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL"
  });

  const botoesCompra = document.querySelectorAll(".comprar-btn");
  const cardsIngresso = document.querySelectorAll(".ingresso-card");
  const formularioCompra = document.querySelector("#formulario");
  const selectTipoIngresso = document.querySelector("#tipoIngresso");
  const inputQuantidade = document.querySelector("#quantidade");
  const inputNome = document.querySelector("#nome");
  const botaoTema = document.querySelector("#alternarTema");
  const linksMenu = document.querySelectorAll(".nav-link[href^='#']");
  const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]');

  if (!formularioCompra || !selectTipoIngresso || !inputQuantidade) {
    return;
  }

  if (window.bootstrap) {
    popoverTriggerList.forEach((popoverTriggerEl) => {
      new bootstrap.Popover(popoverTriggerEl);
    });
  }

  function aplicarTema(tema) {
    document.body.dataset.theme = tema;
    localStorage.setItem("tema-site-ingressos", tema);

    if (!botaoTema) {
      return;
    }

    botaoTema.textContent = tema === "dark" ? "Modo light" : "Modo dark";
    botaoTema.classList.toggle("btn-warning", tema === "dark");
    botaoTema.classList.toggle("btn-outline-warning", tema !== "dark");
  }

  const temaSalvo = localStorage.getItem("tema-site-ingressos");
  const prefereDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  aplicarTema(temaSalvo || (prefereDark ? "dark" : "light"));

  if (botaoTema) {
    botaoTema.addEventListener("click", () => {
      const novoTema = document.body.dataset.theme === "dark" ? "light" : "dark";
      aplicarTema(novoTema);
    });
  }

  const resumoCompra = document.createElement("div");
  resumoCompra.className = "resumo-compra alert alert-primary mt-4 mb-0";
  resumoCompra.setAttribute("role", "status");
  formularioCompra.appendChild(resumoCompra);

  const mensagemFinal = document.createElement("div");
  mensagemFinal.className = "alert alert-success mt-3 mb-0 d-none";
  mensagemFinal.setAttribute("role", "alert");
  formularioCompra.appendChild(mensagemFinal);

  function extrairPreco(texto) {
    const preco = texto.match(/R\$\s*([\d.]+,\d{2})/);

    if (!preco) {
      return 0;
    }

    return Number(preco[1].replace(/\./g, "").replace(",", "."));
  }

  function obterQuantidadeValida() {
    const minimo = Number(inputQuantidade.min || 1);
    const maximo = Number(inputQuantidade.max || 10);
    const quantidade = Number(inputQuantidade.value || minimo);

    return Math.min(Math.max(quantidade, minimo), maximo);
  }

  function obterNomeIngresso(texto) {
    return texto.split("-")[0].trim();
  }

  function destacarCard(nomeIngresso) {
    cardsIngresso.forEach((card) => {
      const titulo = card.querySelector(".card-title")?.textContent.trim() || "";
      card.classList.toggle("selecionado", titulo.includes(nomeIngresso));
    });
  }

  function atualizarResumo() {
    const opcaoSelecionada = selectTipoIngresso.selectedOptions[0];
    const quantidade = obterQuantidadeValida();
    const textoIngresso = opcaoSelecionada?.value ? opcaoSelecionada.textContent.trim() : "Escolha uma opção";
    const precoUnitario = extrairPreco(textoIngresso);
    const total = precoUnitario * quantidade;

    inputQuantidade.value = quantidade;
    resumoCompra.innerHTML = `
      <strong>Resumo:</strong>
      ${textoIngresso} | Quantidade: ${quantidade} | Total: ${formatoMoeda.format(total)}
    `;
  }

  function selecionarIngressoPeloCard(botao) {
    const card = botao.closest(".ingresso-card");
    const titulo = card?.querySelector(".card-title")?.childNodes[0]?.textContent.trim();

    if (!titulo) {
      return;
    }

    const opcao = Array.from(selectTipoIngresso.options).find((option) => {
      return option.textContent.includes(titulo);
    });

    if (!opcao) {
      return;
    }

    selectTipoIngresso.value = opcao.value;
    destacarCard(titulo);
    mensagemFinal.classList.add("d-none");
    atualizarResumo();
    formularioCompra.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  botoesCompra.forEach((botao) => {
    botao.addEventListener("click", () => selecionarIngressoPeloCard(botao));
  });

  selectTipoIngresso.addEventListener("change", () => {
    const nomeIngresso = obterNomeIngresso(selectTipoIngresso.selectedOptions[0].textContent);

    destacarCard(nomeIngresso);
    mensagemFinal.classList.add("d-none");
    atualizarResumo();
  });

  inputQuantidade.addEventListener("input", () => {
    mensagemFinal.classList.add("d-none");
    atualizarResumo();
  });

  formularioCompra.addEventListener("reset", () => {
    window.setTimeout(() => {
      cardsIngresso.forEach((card) => card.classList.remove("selecionado"));
      mensagemFinal.classList.add("d-none");
      atualizarResumo();
    });
  });

  formularioCompra.addEventListener("submit", (evento) => {
    evento.preventDefault();
    evento.stopPropagation();

    if (!formularioCompra.checkValidity()) {
      formularioCompra.classList.add("was-validated");
      return;
    }

    const nome = inputNome.value.trim().split(" ")[0] || "Cliente";
    const ingresso = selectTipoIngresso.selectedOptions[0].textContent.trim();
    const quantidade = obterQuantidadeValida();
    const total = formatoMoeda.format(extrairPreco(ingresso) * quantidade);

    mensagemFinal.textContent = `${nome}, sua compra foi registrada: ${quantidade} ingresso(s) para ${obterNomeIngresso(ingresso)}. Total: ${total}.`;
    mensagemFinal.classList.remove("d-none");
    formularioCompra.classList.remove("was-validated");
  });

  const observadorSecoes = new IntersectionObserver((entradas) => {
    entradas.forEach((entrada) => {
      if (entrada.isIntersecting) {
        entrada.target.classList.add("visivel");
      }
    });
  }, { threshold: 0.18 });

  document.querySelectorAll("main section").forEach((secao) => {
    observadorSecoes.observe(secao);
  });

  const observadorMenu = new IntersectionObserver((entradas) => {
    entradas.forEach((entrada) => {
      if (!entrada.isIntersecting) {
        return;
      }

      linksMenu.forEach((link) => {
        link.classList.toggle("active", link.getAttribute("href") === `#${entrada.target.id}`);
      });
    });
  }, { rootMargin: "-35% 0px -55% 0px" });

  document.querySelectorAll("main section[id]").forEach((secao) => {
    observadorMenu.observe(secao);
  });

  atualizarResumo();
});