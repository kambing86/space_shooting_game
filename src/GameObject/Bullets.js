const Global = require('../Global');
const Extends = require('../util/extends');
const Collision = require('../Collision');

function Bullets(texture) {
  var that = this;
  var count = 20;
  var _texture = texture;

  PIXI.Container.call(that);

  var bullets = [];
  var updates = [];

  var lastFire = null;
  var firePerSecond = 10;
  var speed = 10;

  function shoot(x, y, dt) {
    var currentTime = Date.now();
    if (lastFire && currentTime - lastFire < 1000 / firePerSecond) return;
    lastFire = currentTime;
    var bullet = bullets.pop();
    bullet.x = x;
    bullet.y = y;
    updates.push(bullet);
    that.addChild(bullet);
  }

  that.init = function() {
    for (var i = 0; i < count; i++) {
      var bullet = new PIXI.Sprite(_texture);
      bullet.anchor.x = bullet.anchor.y = 0.5;
      bullets.push(bullet);
      Collision.addGroup(bullet, 'bullet');
    }
    Global.gameEvent.on('shoot', shoot);
  };

  that.update = function(dt) {
    for (var i = 0, l = updates.length; i < l; i++) {
      var bullet = updates[i];
      bullet.y -= speed * dt * 0.1;
      if (bullet.y < -bullet.height || !bullet.parent) {
        that.removeChild(bullet);
        bullets.push(bullet);
        updates.splice(i, 1);
        l--;
        i--;
      }
    }
  };
}
Extends(Bullets, PIXI.Container);
module.exports = Bullets;