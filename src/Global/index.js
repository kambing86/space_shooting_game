const EventEmitter = require('eventemitter3');
const Input = require('./Input');
module.exports = {
  init: function(stage) {
    this.gameStage = stage;
    this.Input = new Input(stage);
  },
  gameStage: null,
  gameWidth: 500,
  gameHeight: 800,
  gameEvent: new EventEmitter(),
  gameStartTime: null,
  Input: null
};
