const PIXI = require('PIXI');

const Global = require('../Global');
const Extends = require('../util/extends');
const Collision = require('../Collision');
const Assets = require('./Assets');

var gameWidth = Global.gameWidth;
var gameHeight = Global.gameHeight;
var gameEvent = Global.gameEvent;

var random = Math.random;
var isCollide = Collision.isCollide;

function Bank(textureName, texture) {
  var that = this;
  PIXI.Sprite.call(that, texture);

  that.initialLife = 10;

  that.type = textureName;

  var speedConstant = 1;

  function refresh() {
    that.x = gameWidth / 4 + (random() * gameWidth) / 2;
    that.y = -that.height;
    that.speedX = (random() * 1 - 0.5) * 100;
    that.speedY = (1.5 + random() * speedConstant) * 100;
    that.life = that.initialLife;
  }

  that.refresh = refresh;

  that.init = function() {
    that.anchor.x = that.anchor.y = 0.5;
    refresh();
  };

  that.update = function(dt) {
    that.x += that.speedX * dt;
    that.y += that.speedY * dt;
    if (that.y > gameHeight + that.height) {
      that.parent.removeChild(that);
      return;
    }
    var target = isCollide(that, 'bullet');
    if (target) {
      target.parent.removeChild(target);
      that.life--;
      if (that.life > 0) return;
      that.parent.removeChild(that);
      gameEvent.emit('explosion', that.x, that.y, true);
      if (textureName == Assets.dbs.name)
        gameEvent.emit('resetscore');
      else
        gameEvent.emit('score', 100);
    }
  };
}
Extends(Bank, PIXI.Sprite);
module.exports = Bank;
