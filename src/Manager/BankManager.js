const PIXI = require('PIXI');

const Global = require('../Global');
const Assets = require('../GameObject/Assets');
const Bank = require('../GameObject/Bank');

var instance = null;

function BankManager() {
  var that = this;
  var count = 2;

  var bankNames = [Assets.dbs.name, Assets.standard.name, Assets.uob.name];
  var totalNames = bankNames.length;
  var banks = {};
  var updates = [];

  (function(){
    var resources = PIXI.loader.resources;
    var i, j, name, texture, array, bank;
    for (i = 0; i < totalNames; i++) {
      name = bankNames[i];
      texture = resources[name].texture;
      array = banks[name] = [];
      for (j = 0; j < count; j++) {
        bank = new Bank(name, texture);
        bank.init();
        bank.visible = false;
        array.push(bank);
      }
    }
  })();

  that.addToStage = function(stage) {
    var name, array, i;
    for (name in banks) {
      array = banks[name];
      for (i = 0; i < count; i++)
        stage.addChild(array[i]);
    }
  };

  function spawnBank() {
    if (updates.length > totalNames * count) return;
    var name = bankNames[Math.floor(Math.random() * totalNames)];
    var bank;
    while (!bank) {
      bank = banks[name].pop();
      if (!bank) {
        name = (name + 1) % totalNames;
        return;
      }
      bank.refresh();
      updates.push(bank);
      bank.visible = true;
    }
  }

  that.init = function() {
  };

  that.update = function(dt) {
    for (var i = 0, l = updates.length; i < l; i++) {
      var bank = updates[i];
      if (bank.visible && bank.y < Global.gameHeight + bank.height)
        bank.update(dt);
      else {
        banks[bank.type].push(bank);
        updates.splice(i, 1);
        l--;
        i--;
      }
    }
  };

  that.spawn = spawnBank;
}

module.exports = {
  getInstance: function() {
    if (instance) return instance;
    instance = new BankManager();
    return instance;
  }
};
