const PIXI = require('PIXI');

const Global = require('../Global');
const Extends = require('../util').rn_extends_rn;
const Collision = require('../Collision');
// const Assets = require('./Assets');

function Spark(textures) {
  var that = this;
  PIXI.Sprite.call(that, textures);

  var speedConstant = 1;
  var disappear = true;

  that.rn_refresh_rn = function() {
    that.x = Global.rn_gameWidth_rn / 4 + (Math.random() * Global.rn_gameWidth_rn) / 2;
    that.y = -that.height;
    that.rn_speedX_rn = (Math.random() * 1 - 0.5) * 50;
    that.rn_speedY_rn = (1.5 + Math.random() * speedConstant) * 50;
  };

  that.rn_init_rn = function() {
    that.anchor.x = that.anchor.y = 0.5;
    that.visible = false;
    Collision.rn_addGroup_rn(that, 'spark', Collision.rn_TYPE_CIRCLE_rn);
  };

  that.rn_update_rn = function(dt) {
    if (!that.visible) return;
    that.x += that.rn_speedX_rn * dt;
    that.y += that.rn_speedY_rn * dt;
    that.rotation += 5 * dt;
    if (disappear) {
      that.alpha -= dt;
      if (that.alpha <= 0.5) {
        that.alpha = 0.5;
        disappear = false;
      }
    } else {
      that.alpha += dt;
      if (that.alpha >= 1) {
        that.alpha = 1;
        disappear = true;
      }
    }
    if (that.y > Global.rn_gameHeight_rn + that.height) {
      that.visible = false;
      return;
    }
  };
}
Extends(Spark, PIXI.Sprite);
module.exports = Spark;
