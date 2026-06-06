// Elementos DOM
const overlay      = document.getElementById('chatOverlay');
const closeBtn     = document.getElementById('closeChatBtn');
const messagesDiv  = document.getElementById('chatMessages');
const chatForm     = document.getElementById('chatForm');
const chatInput    = document.getElementById('chatInput');

// Função para adicionar mensagem
function addMessage(text, type = 'bot') {
  const msg = document.createElement('div');
  msg.className = `message ${type}`;
  msg.textContent = text;
  messagesDiv.appendChild(msg);
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

// Envio de mensagem
chatForm.addEventListener('submit', async e => {
  e.preventDefault();
  const userText = chatInput.value.trim();
  if (!userText) return;

  // Exibe a mensagem do usuário
  addMessage(userText, 'user');
  chatInput.value = '';

  // Envia para backend (exemplo)
  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: userText })
    });

    const data = await response.json();

    // Resposta do bot
    addMessage(data.reply, 'bot');
  } catch (err) {
    addMessage('Olá, o chat de suporte ainda não está totalmente finalizado, espero que esteja gostando do projeto e tenha uma boa tarde!', 'bot');
  }
});

// Fechar chat
closeBtn.addEventListener('click', () => overlay.classList.add('hidden'));

// Abrir automaticamente
window.addEventListener('load', () => overlay.classList.remove('hidden'));

// Foco no input
chatInput.focus();