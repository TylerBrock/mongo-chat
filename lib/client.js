'use strict';

var Carrier = require('carrier');
var Protocol = require('./protocol');

function Client(socket, server) {
  this.socket = socket;
  this.server = server;
  this.nick = null;
  this.username = null;
  this.realname = null;
  this.init();
}

Client.prototype.host = function() {
  this.socket.remoteAddress;
};

Client.prototype.port = function() {
  this.socket.remotePort;
};

Client.prototype.init = function() {
  this.carrier = Carrier.carry(this.socket);
  this.carrier.on('line', this.processData.bind(this));
};

Client.prototype.processData = function(data) {
  var message = Protocol.decode(data);
  var result = this.server.processMessage(message, this);
};

Client.prototype.send = function() {
  if (!this.socket) return;
  this.socket.write(Array.prototype.slice.call(arguments).join(' '));
  this.socket.write(Protocol.eom);
};

module.exports = Client;
