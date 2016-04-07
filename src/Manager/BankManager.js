const PIXI = require('PIXI');

const Global = require('../Global');
const Assets = require('../GameObject/Assets');
const Bank = require('../GameObject/Bank');

var instance = null;

function BankManager(gotDbs, gotBanks) {
  var that = this;
  var count = 2;

  var bankNames = [];
  if (gotDbs)
    bankNames.push(Assets.rn_dbs_rn.name);
  if (gotBanks) {
    bankNames.push(Assets.rn_standard_rn.name, Assets.rn_uob_rn.name);
  }
  var totalNames = bankNames.length;
  var banks = {};
  var updates = [];

  (function() {
    var resources = PIXI.loader.resources;
    var i, j, name, texture, array, bank;
    for (i = 0; i < totalNames; i++) {
      name = bankNames[i];
      texture = resources[name].texture;
      array = banks[name] = [];
      for (j = 0; j < count; j++) {
        bank = new Bank(name, texture);
        bank.rn_init_rn();
        bank.visible = false;
        array.push(bank);
      }
    }
  })();

  that.rn_addToStage_rn = function(stage) {
    var name, array, i;
    for (name in banks) {
      array = banks[name];
      for (i = 0; i < count; i++)
        stage.addChild(array[i]);
    }
  };

  function spawnBank() {
    if (!totalNames) return;
    if (updates.length > totalNames * count) return;
    var name = bankNames[Math.floor(Math.random() * totalNames)];
    var bank;
    while (!bank) {
      bank = banks[name].pop();
      if (!bank) return;
      bank.rn_refresh_rn();
      updates.push(bank);
      bank.visible = true;
    }
  }

  that.rn_init_rn = function() {};

  that.rn_update_rn = function(dt) {
    for (var i = 0, l = updates.length; i < l; i++) {
      var bank = updates[i];
      if (bank.visible && bank.y < Global.rn_gameHeight_rn + bank.height)
        bank.rn_update_rn(dt);
      else {
        banks[bank.rn_type_rn].push(bank);
        updates.splice(i, 1);
        l--;
        i--;
      }
    }
  };

  that.spawn = spawnBank;
}

module.exports = {
  getInstance: function(dbs, banks) {
    if (instance) return instance;
    instance = new BankManager(dbs, banks);
    return instance;
  }
};
