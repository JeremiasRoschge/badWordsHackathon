const socket = io('http://localhost:3000');

//DOM
let message = document.getElementById("message")
let username = document.getElementById("username")
let btn = document.getElementById("send")
let output = document.getElementById("output")
let actions = document.getElementById("actions")



btn.addEventListener('click', () => {
  socket.emit('chat:message', {
    message: message.value,
    username: username.value
  })
})

message.addEventListener('keypress', () => {
  socket.emit('chat:typing', username.value);
});

socket.on('connect', () => {
  console.log('Conexión WebSocket establecida');
});

socket.on('chat:message', (data) => {
  actions.innerHTML = ''
  output.innerHTML += `<p>
  <strong>${data.username}</strong>: ${data.message}
  </p>`
});

socket.on('chat:typing', (data) => {
  actions.innerHTML = `<p><em>${data} esta escribiendo</em></p>`
})

socket.on('disconnect', () => {
  console.log('Conexión WebSocket cerrada');
});
