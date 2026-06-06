import { auth, db } from "../../firebase.js";
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { collection, query, where, getDocs } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

document.addEventListener("contextmenu", e => e.preventDefault());

window.mascaraCPF = function(input) {
    let v = input.value.replace(/\D/g, '');
    v = v.replace(/(\d{3})(\d)/, '$1.$2');
    v = v.replace(/(\d{3})(\d)/, '$1.$2');
    v = v.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    input.value = v;
};

const loginForm = document.getElementById("loginForm");

if (loginForm) {
    loginForm.addEventListener("submit", async function(e) {
        e.preventDefault();

        const cpf = document.getElementById("cpf").value.replace(/\D/g, '');
        const senha = document.getElementById("senha").value;
        const msg = document.getElementById("msg");
        const email = cpf + "@siime.app";

        try {
            // Autentica no Firebase
            const credencial = await signInWithEmailAndPassword(auth, email, senha);
            const uid = credencial.user.uid;

            // Busca os dados do paciente no Firestore
            const snap = await getDocs(query(
                collection(db, "pacientes"),
                where("uid", "==", uid)
            ));

            if (!snap.empty) {
                const dados = snap.docs[0].data();
                // Salva localmente só para leitura rápida nas outras páginas
                localStorage.setItem("siime_user", JSON.stringify(dados));
                localStorage.setItem("siime_uid", uid);
            }

            msg.style.color = "green";
            msg.textContent = "Login realizado com sucesso!";

            setTimeout(() => {
                window.location.href = "dashboard.html";
            }, 1200);

        } catch (erro) {
            msg.style.color = "red";
            if (erro.code === "auth/invalid-credential" || erro.code === "auth/user-not-found") {
                msg.textContent = "CPF ou senha incorretos.";
            } else {
                msg.textContent = "Erro ao fazer login: " + erro.message;
            }
        }
    });
}