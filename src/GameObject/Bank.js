const PIXI = require('PIXI');

const Global = require('../Global');
const Extends = require('../util/extends');
const Collision = require('../Collision');
const Assets = require('./Assets');

function Bank(textureName, texture) {
  var that = this;
  PIXI.Sprite.call(that, texture);

  that.type = textureName;

  var initialLife = 10;
  var speedConstant = 1;

  that.refresh = function() {
    that.x = Global.gameWidth / 4 + (Math.random() * Global.gameWidth) / 2;
    that.y = -that.height;
    that.speedX = (Math.random() * 1 - 0.5) * 100;
    that.speedY = (1.5 + Math.random() * speedConstant) * 100;
    that.life = initialLife;
  };

  that.init = function() {
    that.anchor.x = that.anchor.y = 0.5;
    that.refresh();
  };

  that.update = function(dt) {
    that.x += that.speedX * dt;
    that.y += that.speedY * dt;
    if (that.y > Global.gameHeight + that.height) {
      that.parent.removeChild(that);
      return;
    }
    var target = Collision.isCollide(that, 'bullet');
    if (target) {
      target.parent.removeChild(target);
      that.life--;
      if (that.life > 0) return;
      that.parent.removeChild(that);
      Global.gameEvent.emit('explosion', that.x, that.y, true);
      if (textureName == Assets.dbs.name)
        Global.gameEvent.emit('resetscore');
      else
        Global.gameEvent.emit('score', 100);
    }
  };
}
Extends(Bank, PIXI.Sprite);
module.exports = Bank;
