var assert = require('assert');
var protocol = require('../lib/protocol');

describe('Protocol', function() {
  describe('decode', function() {
    it('should decode command and arguments', function() {
      var data = "AWESOME arg1 arg2";
      var message = {
        command: 'AWESOME',
        args: ['arg1', 'arg2']
      };
      assert.deepEqual(protocol.decode(data), message);
    })

    it('should decode a message with prefix', function() {
      var data = ":first AWESOME arg1";
      var message = {
        prefix: 'first',
        command: 'AWESOME',
        args: ['arg1']
      };
      assert.deepEqual(protocol.decode(data), message);
    })

    it('should decode a trailer with a trailer', function() {
      var data = "AWESOME arg1 :Tyler Brock";
      var message = {
        command: 'AWESOME',
        args: ['arg1', 'Tyler Brock']
      }
      assert.deepEqual(protocol.decode(data), message);
    })

    it('should convert commands to uppercase', function() {
      var data = "awesome arg1";
      var message = {
        command: 'AWESOME',
        args: ['arg1']
      };
      assert.deepEqual(protocol.decode(data), message);
    })
  })
})
