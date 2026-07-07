// Elementos DOM
const overlay = document.getElementById("chatOverlay");
const closeBtn = document.getElementById("closeChatBtn");
const messagesDiv = document.getElementById("chatMessages");
const chatForm = document.getElementById("chatForm");
const chatInput = document.getElementById("chatInput");

function addMessage(text, type = "bot") {
  const msg = document.createElement("div");

  msg.className = `message ${type}`;

  msg.textContent = text;

  messagesDiv.appendChild(msg);

  messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

// Base de respostas
const respostas = [
  {
    chaves: ["editar", "ficha"],

    resposta: 'Para editar sua ficha, acesse "Editar Perfil" no menu lateral.',
  },

  {
    chaves: ["dashboard"],

    resposta:
      "O Dashboard mostra um resumo das suas informações médicas cadastradas. Caso deseje acessar sua ficha completa, utilize a opção 'Minha Ficha' no menu lateral.",
  },

  {
    chaves: ["qr", "emergencia"],

    resposta:
      "O QR Emergência foi criado para permitir acesso rápido às informações médicas e pode ser acessado no menu lateral.",
  },

  {
    chaves: ["cadastro"],

    resposta:
      "Para criar uma conta, utilize a página de cadastro e preencha todos os campos.",
  },

  {
    chaves: ["login"],

    resposta: "para entrar no sistema utilize o CFP e senha cadastrados anteriormente.",
  },

  {
    chaves: ["alergia"],

    resposta:
      'As alergias cadastradas aparecem automaticamente na sua ficha médica. Caso queira editá-las, acesse a seção "Editar Ficha" no menu lateral.',
  },

  {
    chaves: ["medicamento"],

    resposta:
      'Medicamentos cadastrados ficam disponíveis na ficha do paciente. Caso queira editá-los, acesse a seção "Editar Ficha" no menu lateral.',
  },

  {
    chaves: ["senha"],

    resposta: "Caso tenha problemas com sua senha, tente recriar o cadastro.",
  },

  {
    chaves: ["firebase"],

    resposta:
      "FireBase é um serviço de backend da Google que oferece armazenamento em tempo real e autenticação de usuários, estamos trabalhando para integrá-lo ao nosso sistema.",
  },

  {
    chaves: ["siime"],

    resposta:
      "O SIIME (Sistema Integrado de Informações Médicas Emergenciais) é um projeto de feira de ciências desenvolvido por alunos da E.E.J.V.R.M, com o objetivo de criar um sistema de informações médicas emergenciais para facilitar o acesso a dados importantes em situações de emergência.",
  },

  {
    chaves: ["Exames", "consulta"],

    resposta:
      "As informações sobre exames e consultas estão disponíveis na pagina 'Exames e consultas' no menu lateral."
  },

];

function responder(pergunta) {
  const texto = pergunta.toLowerCase();

  for (const item of respostas) {
    const encontrou = item.chaves.some((palavra) => texto.includes(palavra));

    if (encontrou) {
      return item.resposta;
    }
  }

  return `
Não encontrei essa informação.

Você pode tentar perguntar:

• Como editar minha ficha
• Onde fica o QR Emergência
• Como fazer login
• O que é o SIIME
`;
}

// Envio
chatForm.addEventListener(
  "submit",

  (e) => {
    e.preventDefault();

    const userText = chatInput.value.trim();

    if (!userText) return;

    addMessage(userText, "user");

    chatInput.value = "";

    setTimeout(() => {
      const resposta = responder(userText);

      addMessage(resposta, "bot");
    }, 400);
  },
);

// Fechar
closeBtn.addEventListener("click", () => {
  overlay.classList.add("hidden");
});

// Abrir
window.addEventListener("load", () => {
  overlay.classList.remove("hidden");

  addMessage(
    "Olá! Sou o assistente virtual do SIIME. Como posso ajudar você hoje? (Tente usar palavras-chave como 'editar ficha', 'QR emergência', 'login', 'Exames', etc.)",
    "bot",
  );
});

// Foco
chatInput.focus();
