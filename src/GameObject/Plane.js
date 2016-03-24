const Global = require('../Global');
const Extends = require('../util/extends');

function Plane(texture) {
  var that = this;
  PIXI.Sprite.call(that, texture);

  var speed = 5;
  var moveToPosition = null;

  var isDown = false;

  that.maxX = Global.gameWidth - that.width / 2;
  that.minX = that.width / 2;

  function onDown(event) {
    isDown = true;
    moveTo(event.data.local);
  }

  function onUp(event) {
    isDown = false;
    moveToPosition = null;
  }

  function onMove(event) {
    if (isDown) moveTo(event.data.local);
  }

  function moveTo(position) {
    moveToPosition = position;
  }

  that.init = function() {
    that.anchor.x = that.anchor.y = 0.5;
    that.x = Global.gameWidth / 2;
    that.y = Global.gameHeight - that.height;
    Global.input
      .on('mousedown', onDown)
      .on('touchstart', onDown)
      .on('mouseup', onUp)
      .on('touchend', onUp)
      .on('mouseupoutside', onUp)
      .on('touchendoutside', onUp)
      .on('mousemove', onMove)
      .on('touchmove', onMove);
  };

  that.update = function(dt) {
    if (moveToPosition && that.x != moveToPosition.x) {
      var moveToX = moveToPosition.x;
      var distance = Math.min(speed * dt * 0.1, Math.abs(moveToX - that.x));
      that.x += (that.x < moveToX) ? distance : -distance;
      if (that.x > that.maxX)
        that.x = that.maxX;
      else if (that.x < that.minX)
        that.x = that.minX;
    }
    if (isDown)
      Global.gameEvent.emit('shoot', that.x, that.y, dt);
  };
}
Extends(Plane, PIXI.Sprite);
module.exports = Plane;
