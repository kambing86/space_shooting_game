const PIXI = require('PIXI');
const TweenMax = require('TweenMax');
const TimelineMax = require('TimelineMax');

const Global = require('../Global');
const Extends = require('../util').extends;
const Collision = require('../Collision');

function Plane(texture) {
  var that = this;
  PIXI.Sprite.call(that, texture);

  var stopped = true;
  var speed = 500;
  var moveToPosition = null;

  var isDown = false;

  that.maxX = Global.gameWidth - that.width / 2;
  that.minX = that.width / 2;

  var timeline;
  var deathTime;

  function onPointerDown(event) {
    isDown = true;
    moveToPosition = event.data.local;
  }

  function onPointerUp() {
    isDown = false;
    moveToPosition = null;
  }

  function onPointerMove(event) {
    if (isDown) moveToPosition = event.data.local;
  }

  function spawn() {
    that.scale.x = that.scale.y = 1;
    that.y = Global.gameHeight;
    if (timeline) {
      timeline.play(0);
      return;
    }
    var y1 = that.y - that.height;
    var y2 = y1 + that.height / 2;
    timeline = new TimelineMax();
    timeline.add(TweenMax.to(that.scale, 1.5, {
      x: 0.5,
      y: 0.5
    }), 0);
    timeline.add(TweenMax.to(that, 0.5, {
      y: y1
    }), 0);
    timeline.add(TweenMax.to(that, 1, {
      y: y2,
      onComplete: function() {
        stopped = false;
        Global.gameEvent.emit('spawn');
      }
    }), 0.5);
  }

  that.init = function() {
    that.anchor.x = that.anchor.y = 0.5;
    that.x = Global.gameWidth / 2;
    Global.Input
      .on('mousedown', onPointerDown)
      .on('touchstart', onPointerDown)
      .on('mouseup', onPointerUp)
      .on('touchend', onPointerUp)
      .on('mouseupoutside', onPointerUp)
      .on('touchendoutside', onPointerUp)
      .on('mousemove', onPointerMove)
      .on('touchmove', onPointerMove);
    that.scale.x = that.scale.y = 0.5;
    Collision.addGroup(that, 'plane', Collision.TYPE_CIRCLE, {
      width: that.width - 10,
      height: that.height - 10
    });
  };

  that.start = spawn;

  that.update = function(dt) {
    if (!that.visible) {
      if (Date.now() - deathTime >= 5000) {
        that.visible = true;
        spawn();
      } else
        return;
    }
    if (stopped) return;
    if (moveToPosition) {
      if (that.x != moveToPosition.x) {
        var moveToX = moveToPosition.x;
        var distance = Math.min(speed * dt, Math.abs(moveToX - that.x));
        that.x += (that.x < moveToX) ? distance : -distance;
      }
    } else {
      var keyLeft = Global.Input.isDown(Global.Input.KEY_LEFT);
      var keyRight = Global.Input.isDown(Global.Input.KEY_RIGHT);
      if (keyLeft || keyRight)
        that.x += (keyLeft ? -1 : 1) * speed * dt;
    }

    //check position
    if (that.x > that.maxX)
      that.x = that.maxX;
    else if (that.x < that.minX)
      that.x = that.minX;

    Global.gameEvent.emit('shoot', that.x, that.y);

    //check collision with rock
    var target = Collision.isCollide(that, 'rock');
    if (target) {
      target.visible = false;
      that.visible = false;
      deathTime = Date.now();
      Global.gameEvent.emit('dead');
      Global.gameEvent.emit('gameover');
      Global.gameEvent.emit('explosion', target.x, target.y, target.isBig);
      Global.gameEvent.emit('explosion', that.x, that.y);
      stopped = true;
    }
  };
}
Extends(Plane, PIXI.Sprite);
module.exports = Plane;
