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
const getParameter = require('./util').rn_getParameter_rn;

$(function() {
  var renderer = PIXI.autoDetectRenderer(window.innerWidth, window.innerHeight, {
    view: $("canvas")[0]
  });

  var stage = new PIXI.Container(),
    // mask = new PIXI.Graphics(),
    gameEngine = new GameEngine(stage),
    winObject = $(window);

  ScoreUI.rn_init_rn();
  TimeUI.rn_init_rn();
  InGameText.rn_init_rn();

  Global.rn_init_rn(stage);
  // stage.mask = mask;

  //load
  (function() {
    var loadingDivText = $(".loading div");
    var loadingTweening = TweenMax.to(loadingDivText, 1, {
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

    Global.rn_gameEvent_rn.once(Global.rn_gameEventName_rn.rn_soundDone_rn, function() {
      soundsLoaded.resolve();
    });
    Global.rn_gameEvent_rn.once(Global.rn_gameEventName_rn.rn_soundFail_rn, function() {
      soundsLoaded.reject();
    });
    SoundManager.rn_init_rn();

    $.when(assetsLoaded, soundsLoaded).then(function() {
      assetsLoaded = soundsLoaded = loader = assetList = null;
      gameEngine.rn_init_rn();
      // var area = new PIXI.Graphics();
      // area.beginFill(0xFFFFFF);
      // area.drawRect(0, 0, Global.rn_gameWidth_rn, Global.rn_gameHeight_rn);
      // area.endFill();
      // stage.addChild(area);

      var level = getParameter("level");
      var levelSetup;
      if (level) levelSetup = LevelSetup[parseInt(level) - 1];
      if (!levelSetup) return;

      var loadingScreen = $(".loading");
      var displayText = levelSetup.rn_text_rn + "<br/>";
      if (parseInt(level) <= 2) {
        displayText += "Destroy all oncoming asteroids<br/>";
        if (levelSetup.rn_banks_rn)
          displayText += "Shoot down the competition for bonus points<br/>";
      } else {
        if (levelSetup.rn_banks_rn)
          displayText += "Destroy all oncoming asteroids and the competition<br/>";
        else
          displayText += "Destroy all oncoming asteroids<br/>";
      }
      if (levelSetup.rn_dbs_rn)
        displayText += "Avoid shooting DBS!<br/>";
      if (levelSetup.rn_sparks_rn)
        displayText += "Get the sparks for more bonus points<br/>";
      displayText += "Tap on screen to start";
      var totalTime = displayText.length * 0.05;
      var delay = loadingTweening.duration() * (1 - loadingTweening.progress());
      TweenMax.to(loadingDivText, totalTime, {
        text: {
          value: displayText
        },
        onComplete: function() {
          loadingScreen.on("click", function() {
            loadingScreen.off("click");
            loadingScreen.detach();
            loadingScreen = null;
            loadingTweening = null;
            TweenMax.killTweensOf(loadingDivText);
            Global.rn_gameEvent_rn.emit(Global.rn_gameEventName_rn.rn_gameStart_rn);
            gameEngine.rn_start_rn();
            animate();
          });
        },
        ease: Linear.easeNone,
        delay: delay
      });
    }, function() {
      alert("Loading failed");
    });
  })();

  function animate() {
    requestAnimationFrame(animate);
    gameEngine.rn_update_rn();
    renderer.render(stage);
  }

  winObject.on("resize", resize);
  resize();

  function resize() {
    var screenWidth, stageWidth, screenHeight, stageHeight;
    screenWidth = stageWidth = winObject.width();
    screenHeight = stageHeight = winObject.height();
    var gameWidth = Global.rn_gameWidth_rn;
    var gameHeight = Global.rn_gameHeight_rn;
    var screenRatio = gameHeight / gameWidth;
    if (stageHeight / stageWidth < screenRatio)
      stageWidth = stageHeight / screenRatio;
    else
      stageHeight = stageWidth * screenRatio;
    // mask.clear();
    // mask.beginFill(0xFFFFFF, 1);
    var x = (screenWidth - stageWidth) / 2;
    var y = (screenHeight - stageHeight) / 2;
    // mask.drawRect(x, y, stageWidth, stageHeight);
    // mask.endFill();
    stage.x = x;
    stage.y = y;
    stage.scale.x = stageWidth / gameWidth;
    stage.scale.y = stageHeight / gameHeight;
    renderer.resize(screenWidth, screenHeight);
    ScoreUI.rn_updatePosition_rn(x, y);
    TimeUI.rn_updatePosition_rn((screenWidth - stageWidth) / 2, y);
  }
});
