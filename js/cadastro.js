import { auth, db } from "../../firebase.js";
import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { doc, setDoc } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

document.addEventListener("contextmenu", e => e.preventDefault());

window.mascaraCPF = function(input) {
    let v = input.value.replace(/\D/g, '');
    v = v.replace(/(\d{3})(\d)/, '$1.$2');
    v = v.replace(/(\d{3})(\d)/, '$1.$2');
    v = v.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    input.value = v;
};

document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form");

    form.addEventListener("submit", async function(e) {
        e.preventDefault();

        const password = document.getElementById("Password").value;
        const confirmPassword = document.getElementById("Confirmar Password").value;

        if (password !== confirmPassword) {
            alert("As senhas não coincidem. Verifique e tente novamente.");
            return;
        }

        const cpf = document.getElementById("CPF").value.replace(/\D/g, '');
        const email = cpf + "@siime.app"; // CPF vira email fictício

        const dados = {
            nome: document.getElementById("name").value,
            cpf: document.getElementById("CPF").value,
            dataNascimento: document.getElementById("data").value,
            alergias: document.getElementById("allergies").value,
            condicoes: document.getElementById("conditions").value,
            medicamentos: document.getElementById("medications").value,
            contato: document.getElementById("emergency_contact_phone").value,
            contatoNome: document.getElementById("emergency_contact_name").value,
            tipoSanguineo: document.getElementById("blood_type").value
        };

        try {
            // Cria o usuário no Firebase Auth
            const credencial = await createUserWithEmailAndPassword(auth, email, password);
            const uid = credencial.user.uid;

            // Salva os dados médicos no Firestore
            await setDoc(doc(db, "pacientes", uid), {
                ...dados,
                cpfLimpo: cpf,
                uid: uid
            });

            alert("Cadastro realizado com sucesso!");
            window.location.href = "dashboard.html";

        } catch (erro) {
            if (erro.code === "auth/email-already-in-use") {
                alert("Este CPF já está cadastrado no sistema.");
            } else if (erro.code === "auth/weak-password") {
                alert("A senha deve ter pelo menos 6 caracteres.");
            } else {
                alert("Erro ao cadastrar: " + erro.message);
            }
        }
    });
});