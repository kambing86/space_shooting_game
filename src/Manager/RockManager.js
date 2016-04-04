const PIXI = require('PIXI');

const Global = require('../Global');
const Assets = require('../GameObject/Assets');
const Rock = require('../GameObject/Rock');

var instance = null;

function RockManager() {
  var that = this;
  var count = 40;

  var rockNames = [Assets.rock1.name, Assets.rock2.name];
  var totalNames = rockNames.length;
  var rocks = {};
  var updates = [];

  var stopped = true;
  var lastFire = null;
  var rocksPerSecond = 2;

  (function() {
    var resources = PIXI.loader.resources;
    var i, j, name, texture, array, rock;
    for (i = 0; i < totalNames; i++) {
      name = rockNames[i];
      texture = resources[name].texture;
      array = rocks[name] = [];
      for (j = 0; j < count; j++) {
        rock = new Rock(name, texture);
        rock.init();
        rock.visible = false;
        array.push(rock);
      }
    }
  })();

  that.addToStage = function(stage) {
    var name, array, i;
    for (name in rocks) {
      array = rocks[name];
      for (i = 0; i < count; i++)
        stage.addChild(array[i]);
    }
  };

  function spawnRock() {
    var currentTime = Date.now();
    if (stopped ||
      updates.length > totalNames * count ||
      (lastFire && currentTime - lastFire < 1000 / rocksPerSecond))
      return;
    lastFire = currentTime;
    var name = rockNames[Math.floor(Math.random() * totalNames)];
    var rock;
    while (!rock) {
      rock = rocks[name].pop();
      if (!rock) {
        name = (name + 1) % totalNames;
        return;
      }
      rock.refresh();
      updates.push(rock);
      rock.visible = true;
    }
  }

  that.init = function() {
    Global.gameEvent.on('spawn', function() {
      stopped = false;
    });
    Global.gameEvent.on('dead', function() {
      stopped = true;
    });
  };

  that.update = function(dt) {
    for (var i = 0, l = updates.length; i < l; i++) {
      var rock = updates[i];
      if (rock.visible && rock.y < Global.gameHeight + rock.height)
        rock.update(dt);
      else {
        rocks[rock.type].push(rock);
        updates.splice(i, 1);
        l--;
        i--;
      }
    }
    spawnRock();
  };

  that.updateLevel = function(spawnConstant) {
    rocksPerSecond = spawnConstant;
  };
}

module.exports = {
  getInstance: function() {
    if (instance) return instance;
    instance = new RockManager();
    return instance;
  }
};
