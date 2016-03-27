const PIXI = require('PIXI');
const TweenMax = require('TweenMax');
const TimelineMax = require('TimelineMax');

const Global = require('../Global');
const Extends = require('../util/extends');
const Collision = require('../Collision');

var gameStage;
var gameEvent = Global.gameEvent;
var input = Global.Input;

var now = Date.now;
var min = Math.min;
var abs = Math.abs;
var isCollide = Collision.isCollide;

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
        gameEvent.emit('spawn');
      }
    }), 0.5);
  }

  that.init = function() {
    gameStage = Global.gameStage;
    that.anchor.x = that.anchor.y = 0.5;
    that.x = Global.gameWidth / 2;
    input
      .on('mousedown', onPointerDown)
      .on('touchstart', onPointerDown)
      .on('mouseup', onPointerUp)
      .on('touchend', onPointerUp)
      .on('mouseupoutside', onPointerUp)
      .on('touchendoutside', onPointerUp)
      .on('mousemove', onPointerMove)
      .on('touchmove', onPointerMove);
    Collision.addGroup(that, 'plane');
    spawn();
  };

  that.update = function(dt) {
    if (!that.parent) {
      if (now() - deathTime >= 5000) {
        gameStage.addChild(that);
        spawn();
      } else
        return;
    }
    if (stopped) return;
    if (moveToPosition) {
      if (that.x != moveToPosition.x) {
        var moveToX = moveToPosition.x;
        var distance = min(speed * dt, abs(moveToX - that.x));
        that.x += (that.x < moveToX) ? distance : -distance;
      }
    } else {
      var keyLeft = input.isDown(input.KEY_LEFT);
      var keyRight = input.isDown(input.KEY_RIGHT);
      if (keyLeft || keyRight)
        that.x += (keyLeft ? -1 : 1) * speed * dt;
    }

    //check position
    if (that.x > that.maxX)
      that.x = that.maxX;
    else if (that.x < that.minX)
      that.x = that.minX;

    gameEvent.emit('shoot', that.x, that.y);

    //check collision with rock
    var target = isCollide(that, 'rock');
    if (target) {
      target.parent.removeChild(target);
      that.parent.removeChild(that);
      deathTime = now();
      gameEvent.emit('dead');
      gameEvent.emit('explosion', target.x, target.y, target.isBig);
      gameEvent.emit('explosion', that.x, that.y);
      stopped = true;
    }
  };
}
Extends(Plane, PIXI.Sprite);
module.exports = Plane;
