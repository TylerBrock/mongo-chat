'use strict';

var net = require('net');
var Client = require('./client');

function Server() {
  console.log('creating new server');
  this.clients = [];
  this.channels = {};
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
  console.log('running ');
}

module.exports = Server;
