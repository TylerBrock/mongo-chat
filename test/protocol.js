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

  describe('validation', function() {
    describe('nick', function() {
      it('should reject nicks longer than 9 characters', function() {
        var nick = "TylerBrock";
        assert(!protocol.validation.nick.test(nick));
      })

      it('should reject nicks starting with a number', function() {
        var nick = "6Tyler";
        assert(!protocol.validation.nick.test(nick));
      })

      it('should reject nicks starting with a special character', function() {
        var nick = "^Tyler";
        assert(!protocol.validation.nick.test(nick));
      })

      it('should accept nicks with carets', function() {
        var nick = "Ty^ler^";
        assert(protocol.validation.nick.test(nick));
      })

      it('should accept nicks with braces', function() {
        var nick = "Ty{ler}";
        assert(protocol.validation.nick.test(nick));
      })

      it('should accept nicks with brackets', function() {
        var nick = "Ty[ler]";
        assert(protocol.validation.nick.test(nick));
      })

      it('should accept nicks with ticks', function() {
        var nick = "Ty`ler`";
        assert(protocol.validation.nick.test(nick));
      })

      it('should accept nicks with pipes', function() {
        var nick = "Ty|ler|";
        assert(protocol.validation.nick.test(nick));
      })

      it('should accept nicks with dashes', function() {
        var nick = "Ty-ler-";
        assert(protocol.validation.nick.test(nick));
      })

      it('should accept nicks with numbers', function() {
        var nick = "Ty13r";
        assert(protocol.validation.nick.test(nick));
      })
    })
  })
})
