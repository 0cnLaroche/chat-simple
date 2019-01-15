const net = require('net');
const chat = require('./chat.js');

const HOST = 'localhost'; // All local ip address on this machine
const PORT = 8124;

const server = net.createServer((c) => {
  // 'connection' listener
  chat.addConnection(c);
  console.log('client ' + c.remoteAddress + ' connected');
  c.on('data', (data) => {
    chat.broadcast(data.toString(), c.remoteAddress);
  })
  c.on('end', () => {
    console.log('client disconnected');
  });
});
server.on('error', (err) => {
  throw err;
});
server.listen(PORT, HOST, () => {
  console.log('Chat server bound');
  console.log('listening on port ' + PORT);
});
