'use strict';

function Channel(server, name) {
  this.server = server;
  this.topic = "topic";
  this.members = [];
}

Channel.prototype.send = function(client, message) {
  // send everyone in the channel the message
}

Channel.prototype.join = function(client) {
  this.clients.push(client);
}

Channel.prototype.part = function(client) {
  var index = this.clients.indexOf(client);
  this.clients.splice(index, 1);
}

module.exports = Channel;
