const socket = new WebSocket('ws://localhost:3000');
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
  const data = JSON.parse(event.data);
  if (data.type === 'newReservation') {
    const reservation = data.reservation;
    document.getElementById('reservations').innerHTML += 
      `<tr><td>${reservation.id}</td><td>${reservation.status}</td></tr>`;
  } else {
    console.log(data);
  }
};
