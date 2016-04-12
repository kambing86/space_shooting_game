const PIXI = require('PIXI');
const TweenMax = require('TweenMax');
const TimelineMax = require('TimelineMax');

const Global = require('../Global');
const gameEvent = Global.rn_gameEvent_rn;
const gameEventName = Global.rn_gameEventName_rn;
const Extends = require('../util').rn_extends_rn;
const Collision = require('../Collision');

function Plane(texture) {
  var that = this;
  PIXI.Sprite.call(that, texture);

  var stopped = true;
  var speed = 500;
  var moveToPosition = null;

  var isDown = false;

  that.maxX = Global.rn_gameWidth_rn - that.width / 2;
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
    that.y = Global.rn_gameHeight_rn;
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
        gameEvent.emit(gameEventName.rn_spawn_rn);
      }
    }), 0.5);
  }

  that.rn_init_rn = function() {
    that.anchor.x = that.anchor.y = 0.5;
    that.x = Global.rn_gameWidth_rn / 2;
    Global.rn_Input_rn
      .on('mousedown', onPointerDown)
      .on('touchstart', onPointerDown)
      .on('mouseup', onPointerUp)
      .on('touchend', onPointerUp)
      .on('mouseupoutside', onPointerUp)
      .on('touchendoutside', onPointerUp)
      .on('mousemove', onPointerMove)
      .on('touchmove', onPointerMove);
    that.scale.x = that.scale.y = 0.5;
    Collision.rn_addGroup_rn(that, 'plane', Collision.rn_TYPE_CIRCLE_rn, {
      width: that.width - 10,
      height: that.height - 10
    });
  };

  that.rn_start_rn = spawn;

  that.rn_update_rn = function(dt) {
    if (!that.visible) {
      if (Date.now() - deathTime >= 5000) {
        that.visible = true;
        spawn();
      } else
        return;
    }
    if (stopped) return;
    var moving = isDown;
    if (moveToPosition) {
      if (that.x != moveToPosition.x) {
        var moveToX = moveToPosition.x;
        var distance = Math.min(speed * dt, Math.abs(moveToX - that.x));
        that.x += (that.x < moveToX) ? distance : -distance;
      }
    } else {
      var keyLeft = Global.rn_Input_rn.isDown(Global.rn_Input_rn.rn_KEY_LEFT_rn);
      var keyRight = Global.rn_Input_rn.isDown(Global.rn_Input_rn.rn_KEY_RIGHT_rn);
      if (keyLeft || keyRight) {
        that.x += (keyLeft ? -1 : 1) * speed * dt;
        moving = true;
      }
    }

    //check position
    if (that.x > that.maxX)
      that.x = that.maxX;
    else if (that.x < that.minX)
      that.x = that.minX;

    if (moving)
      gameEvent.emit(gameEventName.rn_shoot_rn, that.x, that.y);

    //check collision with rock
    var target = Collision.rn_isCollide_rn(that, 'rock');
    if (target) {
      target.visible = false;
      that.visible = false;
      deathTime = Date.now();
      gameEvent.emit(gameEventName.rn_dead_rn);
      gameEvent.emit(gameEventName.rn_gameover_rn);
      gameEvent.emit(gameEventName.rn_explosion_rn, target.x, target.y, target.isBig);
      gameEvent.emit(gameEventName.rn_explosion_rn, that.x, that.y);
      stopped = true;
    }

    target = Collision.rn_isCollide_rn(that, 'spark');
    if (target) {
      target.visible = false;
      var score = 100;
      gameEvent.emit(gameEventName.rn_score_rn, score);
      gameEvent.emit(gameEventName.rn_bonus_rn, score);
    }
  };
}
Extends(Plane, PIXI.Sprite);
module.exports = Plane;
