const PIXI = require('PIXI');

const Global = require('../Global');
const Extends = require('../util/extends');
const Collision = require('../Collision');
const Assets = require('./Assets');

var gameWidth = Global.gameWidth;

function Rock(textureName, texture) {
  var that = this;
  PIXI.Sprite.call(that, texture);

  if (textureName == Assets.rock1.name)
    that.initialLife = 4;
  else
    that.initialLife = 1;

  function refresh() {
    that.x = gameWidth / 4 + (Math.random() * gameWidth) / 2;
    that.y = -that.height;
    that.speedX = (Math.random() * 1 - 0.5) * 100;
    that.speedY = (1 + Math.random() * 4) * 100;
    that.speedRotation = (Math.random() * 1 - 0.5) * 10;
    that.life = that.initialLife;
  }

  that.name = function() {
    return textureName;
  };

  that.refresh = refresh;

  that.init = function() {
    that.anchor.x = that.anchor.y = 0.5;
    Collision.addGroup(that, 'rock');
    refresh();
  };

  that.update = function(dt) {
    that.x += that.speedX * dt;
    that.y += that.speedY * dt;
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
      if (textureName == Assets.rock1.name)
        Global.gameEvent.emit('score', 10);
      else
        Global.gameEvent.emit('score', 5);
    }
  };
}
Extends(Rock, PIXI.Sprite);
module.exports = Rock;
