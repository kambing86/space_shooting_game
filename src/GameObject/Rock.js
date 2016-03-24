const Global = require('../Global');
const Extends = require('../util/extends');
const Collision = require('../Collision');

function Rock(textureName, texture) {
  var that = this;
  var name = textureName;
  PIXI.Sprite.call(that, texture);

  that.speedX = Math.random() * 1 - 0.5;
  that.speedY = 1 + Math.random() * 4;
  that.speedRotation = (Math.random() * 1 - 0.5) * 0.01;

  that.name = function() {
    return name;
  };

  that.init = function() {
    that.anchor.x = that.anchor.y = 0.5;
    Collision.addGroup(that, 'rock');
  };

  that.update = function(dt) {
    that.x += that.speedX * dt * 0.1;
    that.y += that.speedY * dt * 0.1;
    var target = Collision.isCollide(that, 'bullet');
    that.rotation += that.speedRotation * dt;
    if (target) {
      target.parent.removeChild(target);
      that.parent.removeChild(that);
    }
  };
}
Extends(Rock, PIXI.Sprite);
module.exports = Rock;
