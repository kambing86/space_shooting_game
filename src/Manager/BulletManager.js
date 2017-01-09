const PIXI = require('PIXI');

const gameEvent = require('../Global').rn_gameEvent_rn;
const gameEventName = require('../Global').rn_gameEventName_rn;
const Collision = require('../Collision');

var instance = null;

function BulletManager(texture) {
  var that = this;

  var count = 20;

  var bullets = [];
  var updates = [];

  var lastFire = null;
  var firePerSecond = 10;
  var speed = 1000;

  (function() {
    for (var i = 0; i < count; i++) {
      var bullet = new PIXI.Sprite(texture);
      bullet.anchor.x = bullet.anchor.y = 0.5;
      bullet.visible = false;
      bullets.push(bullet);
      Collision.rn_addGroup_rn(bullet, 'bullet');
    }
  })();

  that.rn_addToStage_rn = function(stage) {
    var i;
    for (i = 0; i < count; i++)
      stage.addChild(bullets[i]);
  };

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

  that.rn_init_rn = function() {
    gameEvent.on(gameEventName.rn_shoot_rn, shoot);
  };

  that.rn_update_rn = function(dt) {
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
  getInstance: function(texture) {
    if (instance) return instance;
    instance = new BulletManager(texture);
    return instance;
  }
};