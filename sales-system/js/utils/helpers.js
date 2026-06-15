export const formatoMoeda = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL"
});

export function extrairPreco(texto) {
  const preco = texto.match(/R\$\s*([\d.]+,\d{2})/);
  if (!preco) return 0;
  return Number(preco[1].replace(/\./g, "").replace(",", "."));
}

export function obterQuantidadeValida(inputQuantidade) {
  const minimo = Number(inputQuantidade.min || 1);
  const maximo = Number(inputQuantidade.max || 10);
  const quantidade = Number(inputQuantidade.value || minimo);
  return Math.min(Math.max(quantidade, minimo), maximo);
}

export function obterNomeIngresso(texto) {
  return texto.split("-")[0].trim();
}