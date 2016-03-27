const PIXI = require('PIXI');

const Global = require('./Global');
const Assets = require('./GameObject/Assets');
const JsonToArray = require('./util/JsonToArray');

var instance = null;

function ExplosionSystem(stage) {
  var explosions = {};
  var types = [
    Assets.explosion1.name,
    Assets.explosion2.name
  ];

  (function() {
    var count = 20;
    var totalNames = types.length;
    var i, j, type, textures, array, explosion;
    var resources = PIXI.loader.resources;
    for (i = 0; i < totalNames; i++) {
      type = types[i];
      textures = JsonToArray.convert(resources[type].textures);
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
          this.parent.removeChild(this);
          explosions[this.type].push(this);
        };
        array.push(explosion);
      }
    }
  })();

  Global.gameEvent.on('explosion', function(x, y, big) {
    var type;
    if (big)
      type = types[0];
    else
      type = types[1];
    var explosion = explosions[type].pop();
    if (explosion) {
      explosion.rotation = ((Math.random() > 0.5) ? -1 : 1) * Math.random() * Math.PI;
      explosion.x = x;
      explosion.y = y;
      stage.addChild(explosion);
      explosion.gotoAndPlay(0);
    }
  });
}

module.exports = {
  init: function(stage, textures) {
    if (instance) return instance;
    instance = new ExplosionSystem(stage, textures);
    return instance;
  }
};
