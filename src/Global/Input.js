const EventEmitter = require('eventemitter3');
const Extends = require('../util/extends');
const Global = require('../Global');

function Input(stage) {
  var that = this;
  EventEmitter.call(that);

  var keyDownList = {};
  // var pointerList = {};

  that.KEY_LEFT = 37;
  that.KEY_UP = 38;
  that.KEY_RIGHT = 39;
  that.KEY_DOWN = 40;

  $(function() {
    $(window)
      .keydown(keyListener)
      .keyup(keyListener)
      .keypress(keyListener);
  });

  function keyListener(event) {
    that.emit(event.type, event);
    if (event.type == "keydown")
      keyDownList[event.keyCode] = true;
    else if (event.type == "keyup")
      keyDownList[event.keyCode] = false;
  }

  function pointerListener(event) {
    event.data.local = stage.toLocal(event.data.global);
    that.emit(event.type, event);
  }

  that.isDown = function(key) {
    return keyDownList[key];
  };

  that.isUp = function(key) {
    return !keyDownList[key];
  };

  // that.isPointerDown = function() {
  //
  // };
  //
  // that.isPointerUp = function() {
  //
  // };
  //
  // that.isPointerMove = function() {
  //
  // };
  //
  // function pointerListener(event) {
  // }
  //

  stage.interactive = true;
  stage
    .on('mousedown', pointerListener)
    .on('touchstart', pointerListener)
    .on('mouseup', pointerListener)
    .on('touchend', pointerListener)
    .on('mouseupoutside', pointerListener)
    .on('touchendoutside', pointerListener)
    .on('mousemove', pointerListener)
    .on('touchmove', pointerListener);
}
Extends(Input, EventEmitter);
module.exports = Input;
