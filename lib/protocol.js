'use strict';

var Protocol = {
  decode: function(data) {
    //console.log('procesing data: ' + data);
    var message = {};
    var parts = data.trim().split(/ :/);
    var front = parts[0].split(' ');

    if (data.match(/^:/)) {
      message.prefix = front.shift().substring(1);
    }

    message.command = front.shift().toUpperCase();

    if (parts.length > 1) {
      front.push(parts[1]);
    }

    message.args = front;

    return message;
  },

  eom: '\r\n',

  reply: {
    welcome:   '001',
    yourHost:  '002',
    created:   '003',
    myInfo:    '004',
    motdStart: '375',
    motd:      '372',
    motdEnd:   '376',

    listStart: '321',
    list:      '322',
    listEnd:   '323',

    topic:     '332',
    noTopic:   '331',
    inviting:  '341',
    nameReply: '353',
    endNames:  '366',
  }
}

module.exports = Protocol;
