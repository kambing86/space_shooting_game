const EventEmitter = require('eventemitter3');
const Input = require('./Input');
module.exports = {
  gameStage: null,
  gameWidth: 500,
  gameHeight: 800,
  gameEvent: new EventEmitter(),
  gameStartTime: null,
  Input: new Input()
};
