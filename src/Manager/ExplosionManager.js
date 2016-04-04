const PIXI = require('PIXI');

const Global = require('../Global');
const Assets = require('../GameObject/Assets');
const JsonToArray = require('../util').json2Array;

var instance = null;

function ExplosionManager() {
  var that = this;

  var explosions = {};
  var types = [{
    name: Assets.explosion1.name,
    count: 10
  }, {
    name: Assets.explosion2.name,
    count: 20
  }];

  (function() {
    var totalNames = types.length;
    var i, j, type, count, textures, array, explosion;
    var resources = PIXI.loader.resources;
    for (i = 0; i < totalNames; i++) {
      type = types[i].name;
      count = types[i].count;
      textures = JsonToArray(resources[type].textures);
      array = explosions[type] = [];
      for (j = 0; j < count; j++) {
        explosion = new PIXI.extras.MovieClip(textures);
        explosion.anchor.x = explosion.anchor.y = 0.5;
        explosion.loop = false;
        explosion.type = type;
        if (i == 0) {
          explosion.animationSpeed = 0.5;
          explosion.scale.x = explosion.scale.y = 2;
        }
        explosion.onComplete = function() {
          this.visible = false;
          explosions[this.type].push(this);
        };
        explosion.visible = false;
        array.push(explosion);
      }
    }
  })();

  that.addToStage = function(stage) {
    var name, array, i, count;
    for (name in explosions) {
      array = explosions[name];
      count = array.length;
      for (i = 0; i < count; i++)
        stage.addChild(array[i]);
    }
  };

  Global.gameEvent.on('explosion', function(x, y, big) {
    var type;
    if (big)
      type = types[0].name;
    else
      type = types[1].name;
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
