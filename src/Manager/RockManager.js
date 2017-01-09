const PIXI = require('PIXI');

const Global = require('../Global');
const gameEvent = Global.rn_gameEvent_rn;
const gameEventName = Global.rn_gameEventName_rn;
const Assets = require('../GameObject/Assets');
const Rock = require('../GameObject/Rock');

var instance = null;

function RockManager() {
  var that = this;
  var count = 40;

  var rockNames = [Assets.rn_rock1_rn.name, Assets.rn_rock2_rn.name];
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
        rock.rn_init_rn();
        rock.visible = false;
        array.push(rock);
      }
    }
  })();

  that.rn_addToStage_rn = function(stage) {
    var name, array, i;
    for (name in rocks) {
      array = rocks[name];
      for (i = 0; i < count; i++)
        stage.addChild(array[i]);
    }
  };

  function spawnRock() {
    if (!totalNames) return;
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
        name = rockNames[Math.floor(Math.random() * totalNames)];
        continue;
      }
      rock.rn_refresh_rn();
      updates.push(rock);
      rock.visible = true;
    }
  }

  that.rn_init_rn = function() {
    gameEvent.on(gameEventName.rn_spawn_rn, function() {
      stopped = false;
    });
    gameEvent.on(gameEventName.rn_dead_rn, function() {
      stopped = true;
    });
  };

  that.rn_update_rn = function(dt) {
    for (var i = 0, l = updates.length; i < l; i++) {
      var rock = updates[i];
      if (rock.visible && rock.y < Global.rn_gameHeight_rn + rock.height)
        rock.rn_update_rn(dt);
      else {
        rocks[rock.rn_type_rn].push(rock);
        updates.splice(i, 1);
        l--;
        i--;
      }
    }
    spawnRock();
  };

  that.rn_updateLevel_rn = function(spawnConstant) {
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