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
const util = require('./util');

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
    ScoreUI.rn_updateScore_rn(currentScore);
  }

  function resetScore() {
    currentScore = 0;
    ScoreUI.rn_updateScore_rn(currentScore);
    InGameText.rn_resetScore_rn();
  }

  function postMessage() {
    setTimeout(function() {
      util.rn_postMessage_rn({
        score: currentScore,
        success: currentScore >= target
      });
    }, 2000);
  }

  that.rn_init_rn = function() {
    var level = util.rn_getParameter_rn("level");
    if (level) levelSetup = LevelSetup[parseInt(level) - 1];
    if (!levelSetup) {
      $("body").detach();
      alert("Please use correct link to play the game");
      return;
    }
    target = levelSetup.rn_target_rn;

    var resources = PIXI.loader.resources;

    plane = new Plane(resources[Assets.rn_plane_rn.name].texture);

    var bg = new Background(resources[Assets.rn_bg_rn.name].texture, plane);

    var bullets = BulletManager.getInstance(resources[Assets.rn_bullet_rn.name].texture);

    rocks = RockManager.getInstance();
    banks = BankManager.getInstance(levelSetup.rn_dbs_rn, levelSetup.rn_banks_rn);

    var explosions = ExplosionManager.getInstance();

    stage.addChild(bg);
    stage.addChild(plane);
    bullets.rn_addToStage_rn(stage);
    rocks.rn_addToStage_rn(stage);
    banks.rn_addToStage_rn(stage);
    explosions.rn_addToStage_rn(stage);

    gameObjectList.push(plane);
    gameObjectList.push(bg);
    gameObjectList.push(bullets);
    gameObjectList.push(rocks);
    gameObjectList.push(banks);

    for (var i = 0, l = gameObjectList.length; i < l; i++)
      gameObjectList[i].rn_init_rn();

    Global.rn_gameEvent_rn.on('score', addScore);
    Global.rn_gameEvent_rn.on('bonus', function() {
      InGameText.rn_bonusScore_rn();
    });
    Global.rn_gameEvent_rn.on('resetscore', resetScore);
    Global.rn_gameEvent_rn.once('spawn', function() {
      updateTimerTick = Date.now();
      InGameText.rn_disappear_rn();
    });
    Global.rn_gameEvent_rn.once('gameover', function() {
      stopped = true;
      if (currentScore >= target)
        InGameText.rn_setText_rn("MISSION SUCCESS");
      else
        InGameText.rn_setText_rn("MISSION FAILED");
      postMessage();
    });

    ScoreUI.rn_updateScore_rn(currentScore);
    TimeUI.rn_updateTime_rn(timeLimit);

    rocks.rn_updateLevel_rn(levelSetup.rn_rocks_rn);
  };

  that.rn_start_rn = function() {
    InGameText.rn_setText_rn("Target<br/>" + target);
    plane.rn_start_rn();
    bankTick = lastTick = Date.now();
  };

  that.rn_update_rn = function() {
    if (stopped) return;
    var currentTime = Date.now();
    var delta = (currentTime - lastTick) * 0.001;
    for (var i = 0, l = gameObjectList.length; i < l; i++)
      gameObjectList[i].rn_update_rn(delta);
    if (currentTime - bankTick > bankSpawnConstant) {
      banks.spawn();
      bankTick = currentTime;
    }
    if (updateTimerTick && currentTime - updateTimerTick > 1000) {
      updateTimerTick += 1000;
      timeLimit--;
      TimeUI.rn_updateTime_rn(timeLimit);
      if (timeLimit == 0)
        Global.rn_gameEvent_rn.emit('gameover');
    }
    lastTick = currentTime;
  };
}
module.exports = GameEngine;
