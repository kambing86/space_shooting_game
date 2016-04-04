// require('../css/app.css');
// require('babel-polyfill');
//
// import Point from './Point';
// console.log(Point);

const PIXI = require('PIXI');
const TweenMax = require('TweenMax');
const Linear = require('Linear');

const Global = require('./Global');
const SoundManager = require('./Manager/SoundManager');
const GameEngine = require('./GameEngine');
const Assets = require('./GameObject/Assets');
const ScoreUI = require('./UI/Score');
const TimeUI = require('./UI/Time');
const InGameText = require('./UI/InGameText');
const LevelSetup = require('./LevelSetup');
const getParameter = require('./util').getParameter;

$(function() {
  var renderer = PIXI.autoDetectRenderer(window.innerWidth, window.innerHeight, {
    view: $("canvas")[0]
  });

  var stage = new PIXI.Container(),
    mask = new PIXI.Graphics(),
    gameEngine = new GameEngine(stage),
    winObject = $(window);

  ScoreUI.init();
  TimeUI.init();
  InGameText.init();

  Global.init(stage);
  stage.mask = mask;

  //load
  (function() {
    var loadingDivText = $(".loading div");
    TweenMax.to(loadingDivText, 1, {
      text: {
        value: "Loading..."
      },
      ease: Linear.easeNone
    });

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
    SoundManager.init();

    $.when(assetsLoaded, soundsLoaded).then(function() {
      assetsLoaded = soundsLoaded = loader = assetList = null;
      gameEngine.init();
      // var area = new PIXI.Graphics();
      // area.beginFill(0xFFFFFF);
      // area.drawRect(0, 0, Global.gameWidth, Global.gameHeight);
      // area.endFill();
      // stage.addChild(area);

      var level = getParameter("level");
      var levelSetup;
      if (level) levelSetup = LevelSetup[parseInt(level) - 1];
      if (!levelSetup) return;

      var loadingScreen = $(".loading");
      var displayText = "Level " + level + "<br/>";
      if (levelSetup.dbs)
        displayText += "Avoid shooting DBS<br/>";
      if (levelSetup.banks)
        displayText += "Shoot other banks for getting bonus points<br/>";
      displayText += "Tap on screen to start";
      var totalTime = displayText.length * 0.05;
      TweenMax.to(loadingDivText, totalTime, {
        text: {
          value: displayText
        },
        onComplete: function() {
          loadingScreen.on("click", function() {
            loadingScreen.off("click");
            loadingScreen.detach();
            loadingScreen = null;
            Global.gameEvent.emit('gameStart');
            gameEngine.start();
            animate();
          });
        },
        ease: Linear.easeNone,
        delay: 1
      });
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
    ScoreUI.updatePosition(x, y);
    TimeUI.updatePosition((screenWidth - stageWidth) / 2, y);
  }
});
