var Protocol = require('./protocol');

var Commands = {
  CAP: function(client, arg) {
    console.log('CAP: aint doing shit');
  },

  PING: function(client) {
    client.lastping = new Date();
  },

  PASS: function(client, pass) {
    console.log('PASS NOT IMPLEMENTED');
  },

  NICK: function(client, nick) {
    if (nick === undefined) {
      client.send(Protocol.reply.noNicknameGiven, ":No nickname given");
    } else if (!nick.match(protocol.validation.nick) {
      client.send(Protocol.reply.erroneusNickname, nick, ":Erroneus nickname");
    }
    else {
      client.nick = nick;
    }
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
  },

  LIST: function(client) {
    client.send(Protocol.reply.listStart, client.nick, 'Channel', ':Users Name');
    for (var key in this.channels){
      if (this.channels.hasOwnProperty(key)) {
        var channel = this.channels[key];
        client.send(Protocol.reply.list,
            client.nick, channel.name, channel.members.length, ':[]' + channel.topic)
      }
    }
    client.send(Protocol.reply.listEnd, client.nick, ':End of /LIST');
  },

  JOIN: function(client, channel) {
    this.join(channel, client);
  }
}

module.exports = Commands;
