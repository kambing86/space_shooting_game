const PIXI = require('PIXI');

const Global = require('../Global');
const Extends = require('../util/extends');
const Collision = require('../Collision');
const Assets = require('./Assets');

function Rock(textureName, texture) {
  var that = this;
  PIXI.Sprite.call(that, texture);

  if (textureName == Assets.rock1.name)
    that.initialLife = 4;
  else
    that.initialLife = 1;

  that.type = textureName;
  that.isBig = textureName == Assets.rock1.name;

  var speedConstant = (that.isBig) ? 2 : 4;

  function refresh() {
    that.x = Global.gameWidth / 4 + (Math.random() * Global.gameWidth) / 2;
    that.y = -that.height;
    that.speedX = (Math.random() * 1 - 0.5) * 100;
    that.speedY = (1.5 + Math.random() * speedConstant) * 100;
    that.speedRotation = (Math.random() * 1 - 0.5) * 10;
    that.life = that.initialLife;
  }

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
      Global.gameEvent.emit('explosion', that.x, that.y, that.isBig);
      if (that.isBig)
        Global.gameEvent.emit('score', 10);
      else
        Global.gameEvent.emit('score', 5);
    }
  };
}
Extends(Rock, PIXI.Sprite);
module.exports = Rock;
