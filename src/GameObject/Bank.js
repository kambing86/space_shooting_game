const PIXI = require('PIXI');

const Global = require('../Global');
const gameEvent = Global.rn_gameEvent_rn;
const gameEventName = Global.rn_gameEventName_rn;
const Extends = require('../util').rn_extends_rn;
const Collision = require('../Collision');
const Assets = require('./Assets');

function Bank(textureName, texture) {
  var that = this;
  PIXI.Sprite.call(that, texture);

  that.rn_type_rn = textureName;

  var initialLife = 10;
  var speedConstant = 1;

  that.rn_refresh_rn = function() {
    that.x = Global.rn_gameWidth_rn / 4 + (Math.random() * Global.rn_gameWidth_rn) / 2;
    that.y = -that.height;
    that.rn_speedX_rn = (Math.random() * 1 - 0.5) * 100;
    that.rn_speedY_rn = (1.5 + Math.random() * speedConstant) * 100;
    that.rn_life_rn = initialLife;
  };

  that.rn_init_rn = function() {
    that.anchor.x = that.anchor.y = 0.5;
    that.rn_refresh_rn();
    Collision.rn_addGroup_rn(that, 'bank');
  };

  that.rn_update_rn = function(dt) {
    that.x += that.rn_speedX_rn * dt;
    that.y += that.rn_speedY_rn * dt;
    if (that.y > Global.rn_gameHeight_rn + that.height) {
      that.visible = false;
      return;
    }
    var target = Collision.rn_isCollide_rn(that, 'bullet');
    if (target) {
      target.visible = false;
      that.rn_life_rn--;
      if (that.rn_life_rn > 0) return;
      that.visible = false;
      gameEvent.emit(gameEventName.rn_explosion_rn, that.x, that.y, true);
      if (textureName == Assets.rn_dbs_rn.name)
        gameEvent.emit(gameEventName.rn_resetscore_rn);
      else {
        var score = 50;
        gameEvent.emit(gameEventName.rn_score_rn, score);
        gameEvent.emit(gameEventName.rn_bonus_rn, score);
      }
    }
  };
}
Extends(Bank, PIXI.Sprite);
module.exports = Bank;
