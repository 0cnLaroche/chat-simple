'use strict';

class Chat {

  constructor() {
    this.users = [];
    this.sockets = [];
  }

  setPseudo(pseudo, client) {
    this.users.push({client: client, pseudo: pseudo});
  }
  getPseudo(client) {
    this.users.forEach((item) => {
      if (item.client === client) {
        return item.client;
      } else {
        return 'unknown';
      }
    })
  }
  write(message, socket) {

  }

  addConnection(client) {
    this.sockets.push(client);
    //c.write('Enter pseudo');
    /*c.on('data', (data) => {
      let usr = data.toString()
      this.setPseudo(c.remoteAddress, usr);
      console.log(usr + '\rConnected from ' + c.remoteAddress );
      c.write(usr + '\rYou are in');
    })*/
  }
  broadcast(response, client) {
    this.sockets.forEach((c) => {
      let res = JSON.parse(response);
      c.write('[' + res.pseudo /*this.getPseudo(client)*/ + '] wrote :\n' + res.message);
    });
  }

}

module.exports = new Chat();
