document.addEventListener("DOMContentLoaded", () => {
    const aviso = document.getElementById("aviso");
    const qrcodeContainer = document.getElementById("qrcode");

    // Lê do siime_user (novo padrão)
    let dados = null;
    try {
        dados = JSON.parse(localStorage.getItem("siime_user"));
    } catch (error) {
        console.error("Erro ao ler usuário:", error);
    }

    if (!dados) {
        if (aviso) {
            aviso.textContent = "Nenhum usuário encontrado. Redirecionando para o login...";
            aviso.style.color = "#c0392b";
            aviso.style.display = "block";
        }
        setTimeout(() => {
            window.location.href = "login.html";
        }, 1500);
        return;
    }

    const nome          = dados.nome          || "-";
    const cpf           = dados.cpfLimpo      || dados.cpf?.replace(/\D/g, '') || "-";
    const tipoSanguineo = dados.tipoSanguineo  || "-";
    const alergias      = dados.alergias       || "Nenhuma";
    const condicoes     = dados.condicoes      || "Nenhuma";
    const medicamentos  = dados.medicamentos   || "Nenhum";
    const contato       = dados.contato        || "-";
    const emergencyId = dados.emergencyId || null;

    // URL base do projeto — troque pelo seu domínio no Netlify
    const BASE_URL = window.location.hostname === "127.0.0.1" || window.location.hostname === "localhost"
        ? window.location.origin
        : "https://siime.netlify.app/"; // ← coloque aqui o link do Netlify

    if (!emergencyId) {
    if (aviso) {
        aviso.textContent = "Não foi possível gerar o QR Emergência.";
        aviso.style.display = "block";
        aviso.style.color = "#c0392b";
    }
    return;
}

const qrText = `${BASE_URL}/html/ficha-emergencia.html?id=${encodeURIComponent(emergencyId)}`;

    if (aviso) aviso.style.display = "none";
    qrcodeContainer.innerHTML = "";

    if (window.QRCode) {
        try {
            new QRCode(qrcodeContainer, {
                text: qrText,
                width: 300,
                height: 300,
                colorDark: "#000000",
                colorLight: "#ffffff",
                correctLevel: QRCode.CorrectLevel.L
            });
        } catch (error) {
            console.error("Erro ao gerar QR Code:", error);
            qrcodeContainer.innerHTML = `<p style='color:red;text-align:center'>Erro ao gerar o QR Code: ${error.message}</p>`;
        }
    } else {
        qrcodeContainer.innerHTML = "<p style='color:red;text-align:center'>Biblioteca de QR Code não carregada.</p>";
    }

    document.getElementById("nome").textContent          = nome;
    document.getElementById("tipo-sanguineo").textContent = tipoSanguineo;
    document.getElementById("alergias").textContent      = alergias;
    document.getElementById("contato").textContent       = contato;

    const downloadBtn = document.getElementById("download-btn");
    if (downloadBtn) {
        downloadBtn.addEventListener("click", () => {
            const canvas = document.querySelector("#qrcode canvas");
            if (canvas) {
                const link = document.createElement("a");
                link.href = canvas.toDataURL("image/png");
                link.download = `QR_Emergencia_${nome.replace(/\s+/g, "_")}.png`;
                link.click();
            } else {
                alert("QR Code ainda não foi gerado. Tente novamente.");
            }
        });
    }

    const printBtn = document.getElementById("print-btn");
    if (printBtn) {
        printBtn.addEventListener("click", () => window.print());
    }
});