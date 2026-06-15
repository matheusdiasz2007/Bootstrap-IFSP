export function initScrollObservers() {
  // Animação ao scroll
  const observadorSecoes = new IntersectionObserver((entradas) => {
    entradas.forEach(entrada => {
      if (entrada.isIntersecting) {
        entrada.target.classList.add("visivel");
      }
    });
  }, { threshold: 0.18 });

  document.querySelectorAll("main section").forEach(secao => {
    observadorSecoes.observe(secao);
  });

  // Menu ativo ao scroll
  const linksMenu = document.querySelectorAll(".nav-link[href^='#']");
  const observadorMenu = new IntersectionObserver((entradas) => {
    entradas.forEach(entrada => {
      if (entrada.isIntersecting) {
        linksMenu.forEach(link => {
          link.classList.toggle("active", link.getAttribute("href") === `#${entrada.target.id}`);
        });
      }
    });
  }, { rootMargin: "-35% 0px -55% 0px" });

  document.querySelectorAll("main section[id]").forEach(secao => {
    observadorMenu.observe(secao);
  });
}