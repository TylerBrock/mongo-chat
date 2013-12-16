var Protocol = require('./protocol');

var Commands = {
  CAP: function(client, arg) {
    console.log('CAP: aint doing shit');
  },

  NICK: function(client, nick) {
    client.nick = nick;
  },

  USER: function(client, username, hostname, servername, realname) {
    client.username = username;
    client.hostname = hostname;
    this.register(client);
    client.send(Protocol.reply.welcome, client.nick, 'Welcome to IRC');
    client.send(Protocol.reply.yourHost, client.nick, 'whatever');
    client.send(Protocol.reply.created, client.nick, 'created');
    client.send(Protocol.reply.myInfo, client.nick, 'info');
    this.motd(client);
  }
}

module.exports = Commands;
