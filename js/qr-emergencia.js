document.addEventListener("DOMContentLoaded", () => {
    const aviso = document.getElementById("aviso");
    const qrcodeContainer = document.getElementById("qrcode");

    // 1. Lê do localStorage o usuário atual
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

    // 2. Extrai os dados
    const nome           = dados.nome           || "-";
    const cpf            = dados.cpfLimpo       || dados.cpf?.replace(/\D/g, '') || "-";
    const tipoSanguineo  = dados.tipoSanguineo   || "-";
    const alergias       = dados.alergias        || "";
    const condicoes      = dados.condicoes       || "";
    const medicamentos   = dados.medicamentos    || "";
    const contato        = dados.contato         || "-";
    const contatoNome    = dados.contatoNome    || "Contato de Emergência";
    const dataNascimento = dados.dataNascimento || "-";

    // 3. Monta o objeto de dados de emergência
    const dadosEmergencia = {
        nome,
        cpf,
        dataNascimento,
        tipoSanguineo,
        alergias,
        condicoes,
        medicamentos,
        contato,
        contatoNome
    };

    // 4. Codifica em Base64 (UTF-8 seguro)
    const payload = btoa(unescape(encodeURIComponent(JSON.stringify(dadosEmergencia))));

    // 5. Monta a URL apontando para a ficha de emergência
    // (Ajustado para o caminho correto sem a pasta 'usuario/')
    const qrText = `${window.location.origin}/html/ficha-emergencia.html?modo=emergencia&data=${payload}`;

    if (aviso) aviso.style.display = "none";
    qrcodeContainer.innerHTML = "";

    // 6. Gera o QR Code
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

    // 7. Preenche a Ficha Resumida na tela
    document.getElementById("nome").textContent           = nome;
    document.getElementById("tipo-sanguineo").textContent = tipoSanguineo;
    document.getElementById("alergias").textContent       = alergias || "Nenhuma";
    document.getElementById("contato").textContent        = contato;

    // Ações de Botões
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