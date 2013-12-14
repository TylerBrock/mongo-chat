'use strict';

var Carrier = require('carrier');
var Protocol = require('./protocol');

function Client(socket, server) {
  this.socket = socket;
  this.server = server;
  var self = this;
  var carrier = Carrier.carry(socket);
  carrier.on('line', this.processData);
}

Client.prototype.processData = function(data) {
  var message = Protocol.decode(data);
  console.log("%j", message);
  var result = self.server.processMessage(message);
};

module.exports = Client;
