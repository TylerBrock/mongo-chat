'use strict';

var net = require('net');
var Client = require('./client');
var Commands = require('./commands');
var Protocol = require('./protocol');
var Channel = require('./channel');

function Server() {
  console.log('creating new server');
  this.hostname = 'localhost';
  this.clients = [];
  this.registered = [];
  this.channels = {
    test: new Channel(this, 'test')
  };
  this.server = net.createServer(connectionHandler);

  var self = this;

  function connectionHandler(socket) {
    console.log('client connected');
    var client = new Client(socket, self);
    self.clients.push(client);
  };

  this.server.listen(1234, function() {
    console.log('server started')
  });
}

Server.prototype.processMessage = function(message, client) {
  console.log('processing %j for %s', message, client);
  Commands[message.command].apply(this, [client].concat(message.args));
}

Server.prototype.register = function(client) {
  console.log('registering client');
  this.registered.push(client);
}

Server.prototype.list = function() {
}

Server.prototype.join = function(channel, client) {
  this.channels[channel].join(client);
  client.send(this.hostname, Protocol.reply.topic)
}

Server.prototype.part = function(channel, client) {
  this.channels[channel].part(client);
}

Server.prototype.motd = function(client) {
  client.send(this.hostname, Protocol.reply.motdStart, client.nick, ':---MOTD---');
  client.send(this.hostname, Protocol.reply.motd, client.nick, 'WOW');
  client.send(this.hostname, Protocol.reply.motdEnd, client.nick, ':----------');
}

module.exports = Server;
