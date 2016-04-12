const PIXI = require('PIXI');

const gameEvent = require('./Global').rn_gameEvent_rn;
const gameEventName = require('./Global').rn_gameEventName_rn;
const Assets = require('./GameObject/Assets');
const Background = require('./GameObject/Background');
const Plane = require('./GameObject/Plane');
const BulletManager = require('./Manager/BulletManager');
const RockManager = require('./Manager/RockManager');
const BankManager = require('./Manager/BankManager');
const Spark = require('./GameObject/Spark');
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

  var spawnSpark = false;
  var spark;

  var levelSetup;
  var target = 0;
  var stopped = false;

  function addScore(score) {
    currentScore += score;
    ScoreUI.rn_updateScore_rn(currentScore);
  }

  function resetScore() {
    InGameText.rn_resetScore_rn(currentScore);
    currentScore = 0;
    ScoreUI.rn_updateScore_rn(currentScore);
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
    spawnSpark = levelSetup.rn_sparks_rn;

    var resources = PIXI.loader.resources;

    plane = new Plane(resources[Assets.rn_plane_rn.name].texture);

    var bg = new Background(resources[Assets.rn_bg_rn.name].texture, plane);

    var bullets = BulletManager.getInstance(resources[Assets.rn_bullet_rn.name].texture);

    rocks = RockManager.getInstance();
    banks = BankManager.getInstance(levelSetup.rn_dbs_rn, levelSetup.rn_banks_rn);

    if (spawnSpark)
      spark = new Spark(resources[Assets.rn_spark_rn.name].texture);

    var explosions = ExplosionManager.getInstance();

    stage.addChild(bg);
    stage.addChild(plane);
    bullets.rn_addToStage_rn(stage);
    rocks.rn_addToStage_rn(stage);
    banks.rn_addToStage_rn(stage);
    if (spawnSpark)
      stage.addChild(spark);
    explosions.rn_addToStage_rn(stage);

    gameObjectList.push(plane);
    gameObjectList.push(bg);
    gameObjectList.push(bullets);
    gameObjectList.push(rocks);
    if (spawnSpark)
      gameObjectList.push(spark);
    gameObjectList.push(banks);

    for (var i = 0, l = gameObjectList.length; i < l; i++)
      gameObjectList[i].rn_init_rn();

    gameEvent.on(gameEventName.rn_score_rn, addScore);
    gameEvent.on(gameEventName.rn_bonus_rn, function(score) {
      InGameText.rn_bonusScore_rn(score);
    });
    gameEvent.on(gameEventName.rn_resetscore_rn, resetScore);
    gameEvent.once(gameEventName.rn_spawn_rn, function() {
      updateTimerTick = Date.now();
      InGameText.rn_disappear_rn();
    });
    gameEvent.once(gameEventName.rn_gameover_rn, function() {
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
        gameEvent.emit(gameEventName.rn_gameover_rn);
    }
    if (spawnSpark && timeLimit % 20 == 0 && !spark.visible) {
      spark.visible = true;
      spark.rn_refresh_rn();
    }
    lastTick = currentTime;
  };
}
module.exports = GameEngine;
