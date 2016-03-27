const PIXI = require('PIXI');

const Global = require('../Global');
const Extends = require('../util/extends');
const Assets = require('./Assets');
const Bank = require('./Bank');

var gameHeight = Global.gameHeight;
var floor = Math.floor;
var random = Math.random;

function BankArray() {
  var that = this;
  var count = 2;

  PIXI.Container.call(that);

  var bankNames = [Assets.dbs.name, Assets.standard.name, Assets.uob.name];
  var totalNames = bankNames.length;
  var banks = {};
  var updates = [];

  function spawnBank() {
    var name = bankNames[floor(random() * totalNames)];
    var bank;
    while (!bank) {
      bank = banks[name].pop();
      if (!bank) {
        name = (name + 1) % totalNames;
        return;
      }
      bank.refresh();
      updates.push(bank);
      that.addChild(bank);
    }
  }

  that.init = function() {
    var resources = PIXI.loader.resources;
    var i, j, name, texture, array, bank;
    for (j = 0; j < totalNames; j++) {
      name = bankNames[j];
      texture = resources[name].texture;
      array = banks[name] = [];
      for (i = 0; i < count; i++) {
        bank = new Bank(name, texture);
        bank.init();
        array.push(bank);
      }
    }
  };

  that.update = function(dt) {
    for (var i = 0, l = updates.length; i < l; i++) {
      var bank = updates[i];
      if (bank.parent && bank.y < gameHeight + bank.height)
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
Extends(BankArray, PIXI.Container);
module.exports = BankArray;
