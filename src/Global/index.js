const EventEmitter = require('eventemitter3');
const Input = require('./Input');
module.exports = {
  rn_init_rn: function(stage) {
    this.rn_Input_rn = new Input(stage);
  },
  rn_gameWidth_rn: 500,
  rn_gameHeight_rn: 800,
  rn_gameEvent_rn: new EventEmitter(),
  rn_Input_rn: null
};
