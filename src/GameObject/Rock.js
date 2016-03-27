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
    that.x = gameWidth / 4 + (random() * gameWidth) / 2;
    that.y = -that.height;
    that.speedX = (random() * 1 - 0.5) * 100;
    that.speedY = (1.5 + random() * speedConstant) * 100;
    that.speedRotation = (random() * 1 - 0.5) * 10;
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
    if (that.y > gameHeight + that.height) {
      that.parent.removeChild(that);
      return;
    }
    var target = isCollide(that, 'bullet');
    that.rotation += that.speedRotation * dt;
    if (target) {
      target.parent.removeChild(target);
      that.life--;
      if (that.life > 0) return;
      that.parent.removeChild(that);
      gameEvent.emit('explosion', that.x, that.y, that.isBig);
      if (that.isBig)
        gameEvent.emit('score', 10);
      else
        gameEvent.emit('score', 5);
    }
  };
}
Extends(Rock, PIXI.Sprite);
module.exports = Rock;
