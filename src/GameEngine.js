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
const InGameText = require('./UI/InGameText');
const LevelSetup = require('./LevelSetup');
const getParameter = require('./util').getParameter;

function GameEngine(stage) {
  var that = this;

  var lastTick;
  var gameObjectList = [];
  var currentScore = 0;
  // var currentLevel = 1;
  var timeLimit = 60;

  var updateTimerTick;

  var plane;
  var rocks;
  var banks;

  var bankSpawnConstant = 8000;
  var bankTick;

  var levelSetup;
  var target = 0;
  var stopped = false;

  function addScore(score) {
    currentScore += score;
    ScoreUI.updateScore(currentScore);
  }

  function resetScore() {
    currentScore = 0;
    ScoreUI.updateScore(currentScore);
    InGameText.resetScore();
  }

  that.init = function() {
    var level = getParameter("level");
    if (level) {
      levelSetup = LevelSetup[parseInt(level) - 1];
      target = levelSetup.target;
    } else {
      $("body").detach();
      alert("Please use correct link to play the game");
    }

    var resources = PIXI.loader.resources;

    plane = new Plane(resources[Assets.plane.name].texture);

    var bg = new Background(resources[Assets.bg.name].texture, plane);

    var bullets = BulletManager.getInstance(resources[Assets.bullet.name].texture);

    rocks = RockManager.getInstance();
    banks = BankManager.getInstance(levelSetup.dbs, levelSetup.banks);

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
    Global.gameEvent.on('bonus', function() {
      InGameText.bonusScore();
    });
    Global.gameEvent.on('resetscore', resetScore);
    Global.gameEvent.once('spawn', function() {
      updateTimerTick = Date.now();
      InGameText.disappear();
    });
    Global.gameEvent.once('gameover', function() {
      stopped = true;
      if (currentScore >= target)
        InGameText.setText("MISSION SUCCESS");
      else
        InGameText.setText("MISSION FAILED");
    });

    ScoreUI.updateScore(currentScore);
    TimeUI.updateTime(timeLimit);

    rocks.updateLevel(levelSetup.rocks);
  };

  that.start = function() {
    InGameText.setText("Target<br/>" + target);
    plane.start();
    bankTick = lastTick = Date.now();
  };

  that.update = function() {
    if (stopped) return;
    var currentTime = Date.now();
    var delta = (currentTime - lastTick) * 0.001;
    for (var i = 0, l = gameObjectList.length; i < l; i++)
      gameObjectList[i].update(delta);
    if (currentTime - bankTick > bankSpawnConstant) {
      banks.spawn();
      bankTick = currentTime;
    }
    if (updateTimerTick && currentTime - updateTimerTick > 1000) {
      updateTimerTick += 1000;
      timeLimit--;
      TimeUI.updateTime(timeLimit);
      if (timeLimit == 0)
        Global.gameEvent.emit('gameover');
    }
    lastTick = currentTime;
  };
}
module.exports = GameEngine;
