document.addEventListener("DOMContentLoaded", () => {

    const usuario = JSON.parse(localStorage.getItem("siime_user"));

    if (!usuario) {
        alert("Nenhum usuário encontrado. Faça login novamente.");
        window.location.href = "login.html";
        return;
    }

    document.getElementById("nome_completo").textContent = usuario.nome || "-";
    document.getElementById("cpf").textContent = usuario.cpf || "-";
    document.getElementById("data").textContent = usuario.dataNascimento || "-";
    document.getElementById("alergias").textContent = usuario.alergias || "Nenhuma registrada";
    document.getElementById("condicoes").textContent = usuario.condicoes || "Nenhuma registrada";
    document.getElementById("medicamentos").textContent = usuario.medicamentos || "Nenhuma registrada";
    document.getElementById("contato_de_emergencia").textContent = usuario.contato || "-";
    document.getElementById("tipo_sanguineo").textContent = usuario.tipoSanguineo || "-";
});