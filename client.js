const net = require('net');
const readline = require('readline');

const SERVEROPTIONS = { host:'localhost', port:8124 };
const PORT = 8080;
const HOST = '0.0.0.0';

var nickname = "";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const client = net.createConnection(SERVEROPTIONS, () => {
  // 'connect' listener
  console.log('connected to server!');

  rl.question('Please enter your nickname :\n', (answer) => {
    nickname = answer;
    console.log("You have entered the chatroom as [" + nickname + "]");

  });

  rl.on('line', (input) => {
    let response = JSON.stringify({"pseudo":nickname, "message":input});
    client.write(response);
  })

  client.on('data', (data) => {
    console.log(data.toString());
  });

  client.on('end', () => {
    console.log('disconnected from server');
  });

});
