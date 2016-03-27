const PIXI = require('PIXI');

const Global = require('./Global');
const Assets = require('./GameObject/Assets');
const Background = require('./GameObject/Background');
const Plane = require('./GameObject/Plane');
const Bullets = require('./GameObject/Bullets');
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

  function pointerListener(event) {
    event.data.local = stage.toLocal(event.data.global);
    Global.Input.emit(event.type, event);
  }

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
    stage.addChild(bg);
    gameObjectList.push(bg);

    stage.addChild(plane);
    gameObjectList.push(plane);

    var bullets = new Bullets(resources[Assets.bullet.name].texture);
    stage.addChild(bullets);
    gameObjectList.push(bullets);

    rocks = new RockArray();
    stage.addChild(rocks);
    gameObjectList.push(rocks);

    banks = new BankArray();
    stage.addChild(banks);
    gameObjectList.push(banks);

    ExplosionSystem.init(stage);

    stage.interactive = true;
    stage
      .on('mousedown', pointerListener)
      .on('touchstart', pointerListener)
      .on('mouseup', pointerListener)
      .on('touchend', pointerListener)
      .on('mouseupoutside', pointerListener)
      .on('touchendoutside', pointerListener)
      .on('mousemove', pointerListener)
      .on('touchmove', pointerListener);

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
