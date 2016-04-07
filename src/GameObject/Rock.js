const PIXI = require('PIXI');

const Global = require('../Global');
const Extends = require('../util').rn_extends_rn;
const Collision = require('../Collision');
const Assets = require('./Assets');

function Rock(textureName, texture) {
  var that = this;
  PIXI.Sprite.call(that, texture);

  if (textureName == Assets.rn_rock1_rn.name)
    that.initialLife = 4;
  else
    that.initialLife = 1;

  that.rn_type_rn = textureName;
  that.isBig = textureName == Assets.rn_rock1_rn.name;

  var speedConstant = (that.isBig) ? 2 : 4;

  function refresh() {
    that.x = Global.rn_gameWidth_rn / 4 + (Math.random() * Global.rn_gameWidth_rn) / 2;
    that.y = -that.height;
    that.rn_speedX_rn = (Math.random() * 1 - 0.5) * 100;
    that.rn_speedY_rn = (1.5 + Math.random() * speedConstant) * 100;
    that.rn_speedRotation_rn = (Math.random() * 1 - 0.5) * 10;
    that.rn_life_rn = that.initialLife;
  }

  that.rn_refresh_rn = refresh;

  that.rn_init_rn = function() {
    that.anchor.x = that.anchor.y = 0.5;
    Collision.rn_addGroup_rn(that, 'rock', Collision.rn_TYPE_CIRCLE_rn);
    refresh();
  };

  that.rn_update_rn = function(dt) {
    that.x += that.rn_speedX_rn * dt;
    that.y += that.rn_speedY_rn * dt;
    if (that.y > Global.rn_gameHeight_rn + that.height) {
      that.visible = false;
      return;
    }
    var target = Collision.rn_isCollide_rn(that, 'bullet');
    that.rotation += that.rn_speedRotation_rn * dt;
    if (target) {
      target.visible = false;
      that.rn_life_rn--;
      if (that.rn_life_rn > 0) return;
      that.visible = false;
      Global.rn_gameEvent_rn.emit('explosion', that.x, that.y, that.isBig);
      if (that.isBig)
        Global.rn_gameEvent_rn.emit('score', 30);
      else
        Global.rn_gameEvent_rn.emit('score', 10);
    }
  };
}
Extends(Rock, PIXI.Sprite);
module.exports = Rock;
