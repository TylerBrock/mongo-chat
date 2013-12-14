function Client(socket) {
  this.socket = socket;
  this.carrier = carrier.carry(socket);
  this.carrier.on('line', this.processMessage);
}

Client.prototype.processMessage = function(message) {
  console.log('procesing data: ' + message);
  var tokens = message.split(' ');
  console.log('\tcommand: ' + tokens[0]);
  console.log('\tparams: ' + tokens.slice(1));
};

var net = require('net');
var carrier = require('carrier');
var clients = [];

var server = net.createServer(function(socket) {
  console.log('client connected');
  var client = new Client(socket);
  clients.push(client);
});

server.listen(1234, function(){ console.log('server started') });
