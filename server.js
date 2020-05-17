const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);

const PORT = process.env.PORT || 3000;

let officeState = false

server.listen(PORT, () => console.log(`connectado em porta ${PORT}`));
// WARNING: app.listen(80) will NOT work here!

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.get('/escritorio', (req, res) => {
  res.json({ office: officeState })
});

app.get('/escritorio/:newState', (req, res) => {
  if (req.params.newState === 'on') {
    officeState = true;
    io.emit('update', { office: officeState });
    return res.json({ error: false, message: 'ok' });
  }
  if (req.params.newState === 'off') {
    officeState = false;
    io.emit('update', { office: officeState });
    return res.json({ error: false, message: 'ok' });
  }
  return res.json({ error: true, message: 'command invalid' });
});

io.on('connection', (socket) => {
  console.log('Client connected')
  // socket.emit('news', { hello: 'world' });
  // socket.on('my other event', (data) => {
  //   console.log(data);
  // });
  socket.on('disconnect', () => console.log('Client disconnected'));
});

setInterval(() => io.emit('time', new Date().toTimeString()), 1000);
