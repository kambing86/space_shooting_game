const PIXI = require('PIXI');

const Global = require('../Global');
const Extends = require('../util').rn_extends_rn;
const Collision = require('../Collision');
const Assets = require('./Assets');

function Bank(textureName, texture) {
  var that = this;
  PIXI.Sprite.call(that, texture);

  that.rn_type_rn = textureName;

  var initialLife = 10;
  var speedConstant = 1;

  that.refresh = function() {
    that.x = Global.rn_gameWidth_rn / 4 + (Math.random() * Global.rn_gameWidth_rn) / 2;
    that.y = -that.height;
    that.speedX = (Math.random() * 1 - 0.5) * 100;
    that.speedY = (1.5 + Math.random() * speedConstant) * 100;
    that.life = initialLife;
  };

  that.rn_init_rn = function() {
    that.anchor.x = that.anchor.y = 0.5;
    that.refresh();
    Collision.rn_addGroup_rn(that, 'bank');
  };

  that.rn_update_rn = function(dt) {
    that.x += that.speedX * dt;
    that.y += that.speedY * dt;
    if (that.y > Global.rn_gameHeight_rn + that.height) {
      that.visible = false;
      return;
    }
    var target = Collision.rn_isCollide_rn(that, 'bullet');
    if (target) {
      target.visible = false;
      that.life--;
      if (that.life > 0) return;
      that.visible = false;
      Global.rn_gameEvent_rn.emit('explosion', that.x, that.y, true);
      if (textureName == Assets.rn_dbs_rn.name)
        Global.rn_gameEvent_rn.emit('resetscore');
      else {
        Global.rn_gameEvent_rn.emit('score', 50);
        Global.rn_gameEvent_rn.emit('bonus');
      }
    }
  };
}
Extends(Bank, PIXI.Sprite);
module.exports = Bank;
