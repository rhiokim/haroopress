var vows       = require('vows'),
    assert     = require('assert'),
    Unidecoder = require('../lib/unidecoder');

var encoded = "Today it was -140° outside!";
var decoded = "Today it was -140deg outside!";

vows.describe('Unidecoder').addBatch({

  'when decoding "Today it was -140° outside!" from unicode to ASCII': {
    topic: function() { return Unidecoder.decode(encoded); },

    'the result should be "Today it was -140deg outside!"': function(topic) {
      assert.equal(topic, decoded);
    },
  }

}).export(module);