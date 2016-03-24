const EventEmitter = require('eventemitter3');
module.exports = {
  gameStage: null,
  gameWidth: 500,
  gameHeight: 800,
  gameEvent: new EventEmitter(),
  gameStartTime: null,
  input: new EventEmitter()
};
