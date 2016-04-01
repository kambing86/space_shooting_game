const PIXI = require('PIXI');

const Global = require('./Global');
const Assets = require('./GameObject/Assets');
const Background = require('./GameObject/Background');
const Plane = require('./GameObject/Plane');
const BulletSystem = require('./BulletSystem');
const RockArray = require('./GameObject/RockArray');
const BankArray = require('./GameObject/BankArray');
const ExplosionSystem = require('./ExplosionSystem');
const Score = require('./UI/Score');
const Level = require('./UI/Level');

function GameEngine(stage) {
  var that = this;

  var lastTick = Date.now();
  var gameObjectList = [];
  var currentScore = 0;
  var currentLevel = 1;
  var rocks;
  var banks;

  var bankSpawnConstant = 10000;
  var bankTick;

  function addScore(score) {
    currentScore += score;
    Score.updateScore(currentScore);
    if (currentLevel < 4 && currentLevel < currentScore / 500) {
      currentLevel++;
      Level.updateLevel(currentLevel);
      rocks.updateLevel(currentLevel);
    }
  }

  function resetScore() {
    currentScore = 0;
    Score.updateScore(currentScore);
  }

  that.init = function() {
    var resources = PIXI.loader.resources;

    var plane = new Plane(resources[Assets.plane.name].texture);

    var bg = new Background(resources[Assets.bg.name].texture, plane);

    rocks = new RockArray();

    banks = new BankArray();

    stage.addChild(bg);
    stage.addChild(plane);
    var bullets = BulletSystem.getInstance(stage, resources[Assets.bullet.name].texture);
    stage.addChild(rocks);
    stage.addChild(banks);

    ExplosionSystem.getInstance(stage);

    gameObjectList.push(plane);
    gameObjectList.push(bg);
    gameObjectList.push(bullets);
    gameObjectList.push(rocks);
    gameObjectList.push(banks);

    for (var i = 0, l = gameObjectList.length; i < l; i++)
      gameObjectList[i].init();

    Global.gameStartTime = Date.now();
    Global.gameEvent.on('score', addScore);
    Global.gameEvent.on('resetscore', resetScore);

    bankTick = Date.now();
  };

  that.update = function() {
    var currentTime = Date.now();
    var delta = (currentTime - lastTick) * 0.001;
    for (var i = 0, l = gameObjectList.length; i < l; i++)
      gameObjectList[i].update(delta);
    if (currentTime - bankTick > bankSpawnConstant) {
      banks.spawn();
      bankTick = currentTime;
    }
    lastTick = currentTime;
  };
}
module.exports = GameEngine;
