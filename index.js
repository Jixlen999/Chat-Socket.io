const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.use(express.static(__dirname + '/public'));


io.on('connection', (socket) => {
    socket.on('send-message', (msg, user) => {
      socket.broadcast.emit('recieve-message', msg, user);
    });
    socket.on('join-room', (room, user, joinMsg) => {
      socket.join(room);
      joinMsg(`${user} joined room ${room}`);
    });
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});

//не показывает участиникам комнаты, что кто-то присоединился