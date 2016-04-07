const PIXI = require('PIXI');

const Global = require('../Global');
const Assets = require('../GameObject/Assets');
const JsonToArray = require('../util').rn_json2Array_rn;

var instance = null;

function ExplosionManager() {
  var that = this;

  var explosions = {};
  var types = [{
    rn_name_rn: Assets.rn_explosion1_rn.name,
    rn_count_rn: 10
  }, {
    rn_name_rn: Assets.rn_explosion2_rn.name,
    rn_count_rn: 20
  }];

  (function() {
    var totalNames = types.length;
    var i, j, type, count, textures, array, explosion;
    var resources = PIXI.loader.resources;
    for (i = 0; i < totalNames; i++) {
      type = types[i].rn_name_rn;
      count = types[i].rn_count_rn;
      textures = JsonToArray(resources[type].textures);
      array = explosions[type] = [];
      for (j = 0; j < count; j++) {
        explosion = new PIXI.extras.MovieClip(textures);
        explosion.anchor.x = explosion.anchor.y = 0.5;
        explosion.loop = false;
        explosion.rn_type_rn = type;
        if (i == 0) {
          explosion.animationSpeed = 0.5;
          explosion.scale.x = explosion.scale.y = 2;
        }
        explosion.onComplete = function() {
          this.visible = false;
          explosions[this.rn_type_rn].push(this);
        };
        explosion.visible = false;
        array.push(explosion);
      }
    }
  })();

  that.rn_addToStage_rn = function(stage) {
    var name, array, i, count;
    for (name in explosions) {
      array = explosions[name];
      count = array.length;
      for (i = 0; i < count; i++)
        stage.addChild(array[i]);
    }
  };

  Global.rn_gameEvent_rn.on('explosion', function(x, y, big) {
    var type;
    if (big)
      type = types[0].rn_name_rn;
    else
      type = types[1].rn_name_rn;
    var explosion = explosions[type].pop();
    if (explosion) {
      explosion.rotation = ((Math.random() > 0.5) ? -1 : 1) * Math.random() * Math.PI;
      explosion.x = x;
      explosion.y = y;
      explosion.visible = true;
      explosion.gotoAndPlay(0);
    }
  });
}

module.exports = {
  getInstance: function() {
    if (instance) return instance;
    instance = new ExplosionManager();
    return instance;
  }
};
