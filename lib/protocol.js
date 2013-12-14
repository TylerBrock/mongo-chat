'use strict';

var Protocol = {
  decode: function(message) {
    console.log('procesing data: ' + message);
    var result = {};
    var parts = message.trim().split(/ :/);
    var front = parts[0].split(' ');

    if (message.match(/^:/)) {
      result.prefix = front.shift().substring(1);
    }

    result.command = front.shift().toUpperCase();

    if (parts.length > 1) {
      front.push(parts[1]);
    }

    result.args = front;

    return result;
  }
}

module.exports = Protocol;
