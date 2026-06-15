export function initTheme(botaoTema) {
  function aplicarTema(tema) {
    document.body.dataset.theme = tema;
    localStorage.setItem("tema-site-ingressos", tema);
    
    if (botaoTema) {
      botaoTema.textContent = tema === "dark" ? "Modo light" : "Modo dark";
      botaoTema.classList.toggle("btn-warning", tema === "dark");
      botaoTema.classList.toggle("btn-outline-warning", tema !== "dark");
    }
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
}