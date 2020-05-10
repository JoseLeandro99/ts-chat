let username;

while(!username) {
  username = prompt('Informe um nome de usuário');
}

const socket = io('http://localhost:3333');

socket.on('messageResponse', data => renderMessage(data));

const messageList = document.getElementsByClassName('messageContainer')[0];
const messageText = document.getElementsByName('messageText')[0];
const header = document.getElementById('header');

document.addEventListener('submit', event => {
  event.preventDefault();

  const newMessage = {
    username,
    date: Date.now(),
    text: messageText.value,
  }

  messageText.value = null;
  messageText.focus();

  socket.emit('messageRequest', { newMessage });
});

function renderMessage(data = []) {
  messageList.innerHTML = null;
  data.messages.map(msg => {
    let li = document.createElement('li');
    let strong = document.createElement('strong');
    let p = document.createElement('p');

    strong.innerHTML = `@${msg.username}`;
    p.innerHTML = msg.text;
  
    li.appendChild(strong);
    li.appendChild(p);

    messageList.appendChild(li);
  });

  messageList.scrollTop = messageList.scrollHeight;
  header.innerHTML = `
    <span>${data.users_count} Usuários online</span> |
    <span>${data.messages_count} mensagens</span>
  `;
}
