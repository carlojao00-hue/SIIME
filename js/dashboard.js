document.addEventListener("DOMContentLoaded", () => {

    const dados = JSON.parse(localStorage.getItem("siime_user"));

    if (!dados) {
        window.location.href = "login.html";
        return;
    }

    document.getElementById("boasVindas").textContent = "Bem Vindo, " + dados.nome;
    document.getElementById("alergias").textContent = dados.alergias || "Nenhuma informada";
    document.getElementById("condicoes").textContent = dados.condicoes || "Nenhuma informada";
    document.getElementById("medicamentos").textContent = dados.medicamentos || "Nenhum informado";
});