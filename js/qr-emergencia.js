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

    const nome          = dados.nome          || "-";
    const cpf           = dados.cpfLimpo      || dados.cpf?.replace(/\D/g, '') || "-";
    const tipoSanguineo = dados.tipoSanguineo  || "-";
    const alergias      = dados.alergias       || "";
    const condicoes     = dados.condicoes      || "";
    const medicamentos  = dados.medicamentos   || "";
    const contato       = dados.contato        || "-";
    const contatoNome   = dados.contatoNome   || "Contato de Emergência";
    const dataNascimento= dados.dataNascimento|| "-";

    // 2. Monta o pacote de dados vitais para o QR Code
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

    // Codifica os dados em Base64 seguro para acentuação (UTF-8)
    const payload = btoa(unescape(encodeURIComponent(JSON.stringify(dadosEmergencia))));

    // 3. Monta a URL dinâmica apontando para ficha-emergencia.html
    const origin = window.location.origin;
    const pathname = window.location.pathname;
    const folderPath = pathname.substring(0, pathname.lastIndexOf('/') + 1);
    
    // URL contendo o modo de emergência e os dados codificados
    const qrText = `${origin}${folderPath}ficha-emergencia.html?modo=emergencia&data=${payload}`;

    if (aviso) aviso.style.display = "none";
    qrcodeContainer.innerHTML = "";

    // 4. Gera o QR Code
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

    // 5. Preenche a prévia da Ficha Resumida na página
    document.getElementById("nome").textContent          = nome;
    document.getElementById("tipo-sanguineo").textContent = tipoSanguineo;
    document.getElementById("alergias").textContent      = alergias || "Nenhuma";
    document.getElementById("contato").textContent       = contato;

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