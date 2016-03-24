// require('../css/app.css');
// require('babel-polyfill');
const Global = require('./Global');
const GameEngine = require('./GameEngine');
const Assets = require('./GameObject/Assets');
$(function() {
  var renderer = PIXI.autoDetectRenderer(window.innerWidth, window.innerHeight, {
    view: $("canvas")[0]
  });

  var stage = new PIXI.Container(),
    mask = new PIXI.Graphics(),
    loader = PIXI.loader,
    gameEngine = new GameEngine(stage),
    winObject = $(window);

  Global.gameStage = stage;
  stage.mask = mask;

  loader.baseUrl = "assets/";
  var assetList = [];
  for (var i in Assets)
    assetList.push(Assets[i]);
  loader
    .once('complete', function() {
      gameEngine.init();
      // var area = new PIXI.Graphics();
      // area.beginFill(0xFFFFFF);
      // area.drawRect(0, 0, Global.gameWidth, Global.gameHeight);
      // area.endFill();
      // stage.addChild(area);
      animate();
    })
    .add(assetList)
    .load();

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
  }
});
