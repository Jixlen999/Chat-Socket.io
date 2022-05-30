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
    socket.on('chat message', (msg, user) => {
      io.emit('chat message', msg, user);
    });
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});