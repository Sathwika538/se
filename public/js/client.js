const socket = io();
const form = document.querySelector('form');
const input = document.querySelector('input');
const messages = document.querySelector('#messages');

socket.on('connect', () => {
  fetch('/gaming')
    .then(res => res.json())
    .then(chats => {
      chats.forEach(chat => {
        const div = document.createElement('div');
        div.innerHTML = `<strong>${chat.sender}: </strong>${chat.message}`;
        chatbox.append(div);
      });
    })
    .catch(err => console.error(err));
});

socket.on('previous chats', (chats) => {
  for (let chat of chats) {
    const item = document.createElement('li');
    item.textContent = `${chat.sender}: ${chat.message}`;
    messages.appendChild(item);
  }
});

form.addEventListener('submit', (e) => {
  e.preventDefault();
  socket.emit('chat message', input.value);
  input.value = '';
});

socket.on('chat message', (chat) => {
  const item = document.createElement('li');
  item.textContent = `${chat.sender}: ${chat.message}`;
  messages.appendChild(item);
});