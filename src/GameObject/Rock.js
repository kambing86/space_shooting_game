const PIXI = require('PIXI');

const Global = require('../Global');
const Extends = require('../util/extends');
const Collision = require('../Collision');
const Assets = require('./Assets');

var gameWidth = Global.gameWidth;

function Rock(textureName, texture) {
  var that = this;
  var name = textureName;
  PIXI.Sprite.call(that, texture);

  if (name == Assets.rock1.name)
    that.initialLife = 4;
  else
    that.initialLife = 1;

  that.life = that.initialLife;

  function refresh() {
    that.x = gameWidth * 0.25 + (Math.random() * gameWidth) / 2;
    that.y = -that.height;
    that.speedX = Math.random() * 1 - 0.5;
    that.speedY = 1 + Math.random() * 4;
    that.speedRotation = (Math.random() * 1 - 0.5) * 0.01;
    that.life = that.initialLife;
  }

  that.name = function() {
    return name;
  };

  that.init = function() {
    that.anchor.x = that.anchor.y = 0.5;
    Collision.addGroup(that, 'rock');
    refresh();
  };

  that.refresh = refresh;

  that.update = function(dt) {
    that.x += that.speedX * dt * 0.1;
    that.y += that.speedY * dt * 0.1;
    if (that.y > Global.gameHeight + that.height) {
      that.parent.removeChild(that);
      return;
    }
    var target = Collision.isCollide(that, 'bullet');
    that.rotation += that.speedRotation * dt;
    if (target) {
      target.parent.removeChild(target);
      that.life--;
        if (that.life > 0) return;
      that.parent.removeChild(that);
      if (name == Assets.rock1.name)
        Global.gameEvent.emit('score', 10);
      else
        Global.gameEvent.emit('score', 5);
    }
  };
}
Extends(Rock, PIXI.Sprite);
module.exports = Rock;
