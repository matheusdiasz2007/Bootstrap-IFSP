const form = document.getElementById("formIngresso");

form.addEventListener("submit", function (event) {
    event.preventDefault();

    alert("Compra de ingresso cadastrada com sucesso!");
    form.reset();
});
