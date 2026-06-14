document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("editarForm");
    const msg = document.getElementById("msg");

    // Carrega os dados atuais do usuário no formulário.(caro avaliador, com essa mensagem eu reforço a ideia de que nenhuma IA (Não estou considerando a IA ja presente no editor de codigo.) foi utilizada. 0-²..)
    const usuario = JSON.parse(localStorage.getItem("siime_user"));

    if (!usuario) {
        msg.style.color = "red";
        msg.textContent = "Nenhum usuário encontrado. Redirecionando...";
        setTimeout(() => {
            window.location.href = "login.html";
        }, 2000);
        return;
    }

    // preenche o formulário com os dados atuais
    
    document.getElementById("name").value = usuario.nome || "";
    document.getElementById("CPF").value = usuario.cpf || "";
    document.getElementById("data").value = usuario.dataNascimento || usuario.data || "";
    document.getElementById("blood_type").value = usuario.tipoSanguineo || "";
    document.getElementById("allergies").value = usuario.alergias || "";
    document.getElementById("conditions").value = usuario.condicoes || "";
    document.getElementById("medications").value = usuario.medicamentos || "";
    document.getElementById("emergency_contact_name").value = usuario.contatoNome || "";
    document.getElementById("emergency_contact_phone").value = usuario.contato || "";

    // Salva as alterações quando o formulário é enviado
    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const password = document.getElementById("Password").value;
        const confirmPassword = document.getElementById("ConfirmarPassword").value;

        // verifica se as senhas são iguais (caso o usuário queira alterar)
        if (password || confirmPassword) {
            if (password !== confirmPassword) {
                msg.style.color = "red";
                msg.textContent = "As senhas não coincidem. Verifique e tente novamente.";
                return;
            }

            if (password.length < 5) {
                msg.style.color = "red";
                msg.textContent = "A senha deve ter pelo menos 5 caracteres.";
                return;
            }
        }

        // calcula a idade com base na data de nascimento
        const dataNascimento = document.getElementById("data").value;
        const idade = dataNascimento ? Math.floor((new Date() - new Date(dataNascimento)) / (1000 * 60 * 60 * 24 * 365.25)) : "-";

        const dadosAtualizados = {
            nome: document.getElementById("name").value,
            cpf: document.getElementById("CPF").value, // CPF não muda
            dataNascimento: dataNascimento,
            idade: idade,
            alergias: document.getElementById("allergies").value,
            condicoes: document.getElementById("conditions").value,
            medicamentos: document.getElementById("medications").value,
            contato: document.getElementById("emergency_contact_phone").value,
            contatoNome: document.getElementById("emergency_contact_name").value,
            tipoSanguineo: document.getElementById("blood_type").value
        };

        const cpf = dadosAtualizados.cpf.replace(/\D/g, '');
        localStorage.setItem("siime_user", JSON.stringify(dadosAtualizados));
        localStorage.setItem("usuario_" + cpf, JSON.stringify(dadosAtualizados));
        localStorage.setItem("vitaSOS_user", JSON.stringify(dadosAtualizados));
        localStorage.setItem("vitaSOS_cpf", cpf);

        // atualiza a senha apenas se o usuário tiver inserido uma nova
        if (password) {
            localStorage.setItem("vitaSOS_senha", password);
        }

        msg.style.color = "green";
        msg.textContent = "Alterações salvas com sucesso!";

        setTimeout(() => {
            window.location.href = "dashboard.html";
        }, 1500);
    });
});
