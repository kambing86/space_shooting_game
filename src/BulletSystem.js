const PIXI = require('PIXI');

const Global = require('./Global');
const Collision = require('./Collision');

var instance = null;

function BulletSystem(stage, texture) {
  var that = this;

  var count = 20;

  var bullets = [];
  var updates = [];

  var lastFire = null;
  var firePerSecond = 10;
  var speed = 1000;

  function shoot(x, y) {
    var currentTime = Date.now();
    if (lastFire && currentTime - lastFire < 1000 / firePerSecond) return;
    lastFire = currentTime;
    var bullet = bullets.pop();
    bullet.x = x;
    bullet.y = y;
    updates.push(bullet);
    bullet.visible = true;
  }

  for (var i = 0; i < count; i++) {
    var bullet = new PIXI.Sprite(texture);
    bullet.anchor.x = bullet.anchor.y = 0.5;
    bullet.visible = false;
    stage.addChild(bullet);
    bullets.push(bullet);
    Collision.addGroup(bullet, 'bullet');
  }
  Global.gameEvent.on('shoot', shoot);

  that.init = function() {};

  that.update = function(dt) {
    for (var i = 0, l = updates.length; i < l; i++) {
      var bullet = updates[i];
      bullet.y -= speed * dt;
      if (bullet.y < -bullet.height || !bullet.visible) {
        bullet.visible = false;
        bullets.push(bullet);
        updates.splice(i, 1);
        l--;
        i--;
      }
    }
  };
}

module.exports = {
  getInstance: function(stage, texture) {
    if (instance) return instance;
    instance = new BulletSystem(stage, texture);
    return instance;
  }
};
