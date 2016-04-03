const PIXI = require('PIXI');

const Global = require('./Global');
const Assets = require('./GameObject/Assets');
const Background = require('./GameObject/Background');
const Plane = require('./GameObject/Plane');
const BulletManager = require('./Manager/BulletManager');
const RockManager = require('./Manager/RockManager');
const BankManager = require('./Manager/BankManager');
const ExplosionManager = require('./Manager/ExplosionManager');
const ScoreUI = require('./UI/Score');
const TimeUI = require('./UI/Time');

function GameEngine(stage) {
  var that = this;

  var lastTick;
  var gameObjectList = [];
  var currentScore = 0;
  // var currentLevel = 1;
  var timeLimit = 60;

  var updateTimerTick;

  var rocks;
  var banks;

  var bankSpawnConstant = 10000;
  var bankTick;

  function addScore(score) {
    currentScore += score;
    ScoreUI.updateScore(currentScore);
  }

  function resetScore() {
    currentScore = 0;
    ScoreUI.updateScore(currentScore);
  }

  that.init = function () {
    var resources = PIXI.loader.resources;

    var plane = new Plane(resources[Assets.plane.name].texture);

    var bg = new Background(resources[Assets.bg.name].texture, plane);

    var bullets = BulletManager.getInstance(resources[Assets.bullet.name].texture);

    rocks = RockManager.getInstance();
    banks = BankManager.getInstance();

    var explosions = ExplosionManager.getInstance();

    stage.addChild(bg);
    stage.addChild(plane);
    bullets.addToStage(stage);
    rocks.addToStage(stage);
    banks.addToStage(stage);
    explosions.addToStage(stage);

    gameObjectList.push(plane);
    gameObjectList.push(bg);
    gameObjectList.push(bullets);
    gameObjectList.push(rocks);
    gameObjectList.push(banks);

    for (var i = 0, l = gameObjectList.length; i < l; i++)
      gameObjectList[i].init();

    Global.gameEvent.on('score', addScore);
    Global.gameEvent.on('resetscore', resetScore);

    ScoreUI.updateScore(currentScore);
    TimeUI.updateTime(timeLimit);

    updateTimerTick = bankTick = lastTick = Date.now();
  };

  that.update = function () {
    var currentTime = Date.now();
    var delta = (currentTime - lastTick) * 0.001;
    for (var i = 0, l = gameObjectList.length; i < l; i++)
      gameObjectList[i].update(delta);
    if (currentTime - bankTick > bankSpawnConstant) {
      banks.spawn();
      bankTick = currentTime;
    }
    if (currentTime - updateTimerTick > 1000) {
      updateTimerTick += 1000;
      TimeUI.updateTime();
    }
    lastTick = currentTime;
  };
}
module.exports = GameEngine;
