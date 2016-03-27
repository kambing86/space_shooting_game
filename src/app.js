// require('../css/app.css');
// require('babel-polyfill');

const PIXI = require('PIXI');

const Global = require('./Global');
const SoundSystem = require('./SoundSystem');
const GameEngine = require('./GameEngine');
const Assets = require('./GameObject/Assets');
const Score = require('./UI/Score');
const Level = require('./UI/Level');

$(function() {
  var renderer = PIXI.autoDetectRenderer(window.innerWidth, window.innerHeight, {
    view: $("canvas")[0]
  });

  var stage = new PIXI.Container(),
    mask = new PIXI.Graphics(),
    gameEngine = new GameEngine(stage),
    winObject = $(window);

  Score.init();
  Level.init();

  Global.gameStage = stage;
  stage.mask = mask;

  //load
  (function(){
    var assetsLoaded = $.Deferred();
    var soundsLoaded = $.Deferred();
    var loader = PIXI.loader;

    loader.baseUrl = "image/";
    var assetList = [];
    for (var i in Assets)
      assetList.push(Assets[i]);
    loader
      .once('complete', function() {
        assetsLoaded.resolve();
      })
      .once('error', function() {
        assetsLoaded.reject();
      })
      .add(assetList)
      .load();

    Global.gameEvent.once('soundDone', function() {
      soundsLoaded.resolve();
    });
    Global.gameEvent.once('soundFail', function() {
      soundsLoaded.reject();
    });
    SoundSystem.init();

    $.when(assetsLoaded, soundsLoaded).then(function() {
      assetsLoaded = soundsLoaded = loader = assetList = null;
      gameEngine.init();
      // var area = new PIXI.Graphics();
      // area.beginFill(0xFFFFFF);
      // area.drawRect(0, 0, Global.gameWidth, Global.gameHeight);
      // area.endFill();
      // stage.addChild(area);
      Global.gameEvent.emit('gameStart');
      animate();
    }, function() {
      alert("Loading failed");
    });
  })();

  function animate() {
    requestAnimationFrame(animate);
    gameEngine.update();
    renderer.render(stage);
  }

  winObject.on("resize", resize);
  resize();

  function resize() {
    var screenWidth, stageWidth, screenHeight, stageHeight;
    screenWidth = stageWidth = winObject.width();
    screenHeight = stageHeight = winObject.height();
    var gameWidth = Global.gameWidth;
    var gameHeight = Global.gameHeight;
    var screenRatio = gameHeight / gameWidth;
    if (stageHeight / stageWidth < screenRatio)
      stageWidth = stageHeight / screenRatio;
    else
      stageHeight = stageWidth * screenRatio;
    mask.clear();
    mask.beginFill(0xFFFFFF, 1);
    var x = (screenWidth - stageWidth) / 2;
    var y = (screenHeight - stageHeight) / 2;
    mask.drawRect(x, y, stageWidth, stageHeight);
    mask.endFill();
    stage.x = x;
    stage.y = y;
    stage.scale.x = stageWidth / gameWidth;
    stage.scale.y = stageHeight / gameHeight;
    renderer.resize(screenWidth, screenHeight);
    Score.updatePosition(x, y);
    Level.updatePosition(x, y, stageWidth);
  }
});
