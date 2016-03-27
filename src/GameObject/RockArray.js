const PIXI = require('PIXI');

const Global = require('../Global');
const Extends = require('../util/extends');
const Assets = require('./Assets');
const Rock = require('./Rock');

function RockArray() {
  var that = this;
  var count = 40;

  PIXI.Container.call(that);

  var rockNames = [Assets.rock1.name, Assets.rock2.name];
  var totalNames = rockNames.length;
  var rocks = {};
  var updates = [];

  var stopped = true;
  var lastFire = null;
  var spawnConstant = 2;
  var rocksPerSecond = spawnConstant;

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
    var resources = PIXI.loader.resources;
    var i, j, name, texture, array, rock;
    for (j = 0; j < totalNames; j++) {
      name = rockNames[j];
      texture = resources[name].texture;
      array = rocks[name] = [];
      for (i = 0; i < count; i++) {
        rock = new Rock(name, texture);
        rock.init();
        rock.visible = false;
        that.addChild(rock);
        array.push(rock);
      }
    }
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

  that.updateLevel = function(level) {
    rocksPerSecond = level * spawnConstant;
  };
}
Extends(RockArray, PIXI.Container);
module.exports = RockArray;
