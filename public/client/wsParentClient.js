const url = `ws://${window.location.host}`;
const socket = new WebSocket(url);

const authorize = () => {
  const message = JSON.stringify({
    type: 'authorization',
    token: localStorage.getItem('userAuthToken'),
  });
  socket.send(message);
}

socket.addEventListener("open", () => { 
  authorize();
});

socket.onmessage = (event) => {
  const message = JSON.parse(event.data);
  console.log(message);
};
