// 'use strict';
//
// const express = require('express');
// const socketIO = require('socket.io');
//
// const PORT = process.env.PORT || 3000;
// const INDEX = '/index.html';
//
// const server = express()
//   .use((req, res) => res.sendFile(INDEX, { root: __dirname }))
//   .listen(PORT, () => console.log(`Listening on ${PORT}`));
//
// const io = socketIO(server);
//
// io.on('connection', (socket) => {
//   console.log('Client connected');
//   socket.on('disconnect', () => console.log('Client disconnected'));
// });
//
// setInterval(() => io.emit('time', new Date().toTimeString()), 1000);

const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);

const PORT = process.env.PORT || 3000;

server.listen(PORT);
// WARNING: app.listen(80) will NOT work here!

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  console.log('Conectado porra')
  // socket.emit('news', { hello: 'world' });
  socket.on('my other event', (data) => {
    console.log(data);
  });
});

setInterval(() => io.emit('time', new Date().toTimeString()), 1000);
