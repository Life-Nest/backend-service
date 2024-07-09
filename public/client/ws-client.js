const socket = new WebSocket('ws://localhost:3000');

socket.onmessage = (event) => {
  document.getElementById('messages').innerHTML += 
    `<p>${event.data}</p>`;
};

socket.addEventListener("open", () => { 
  console.log("Client is now connected");
});

function sendMessage(event) {
  const inputMessage = document.getElementById('message');
  const message = JSON.stringify({
    type: 'authorization',
    token: inputMessage.value
  });
  socket.send(message);
  inputMessage.value = "";
  event.preventDefault();
}

document
  .getElementById('input-form')
  .addEventListener('submit', sendMessage);
