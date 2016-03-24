const Global = require('./Global');
const Assets = require('./GameObject/Assets');
const Background = require('./GameObject/Background');
const Plane = require('./GameObject/Plane');
const Bullets = require('./GameObject/Bullets');
const RockArray = require('./GameObject/RockArray');
const Rock = require('./GameObject/Rock');

function GameEngine(gameStage) {
  var that = this;
  var stage = gameStage;

  var time = Date.now();
  var gameObjectList = [];

  function listen(event) {
    event.data.local = stage.toLocal(event.data.global);
    Global.input.emit(event.type, event);
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

    var rocks = new RockArray();
    stage.addChild(rocks);
    gameObjectList.push(rocks);

    // var rock1 = new Rock(Assets.rock1.name, resources[Assets.rock1.name].texture);
    // stage.addChild(rock1);
    // gameObjectList.push(rock1);
    //
    // var rock2 = new Rock(Assets.rock2.name, resources[Assets.rock2.name].texture);
    // stage.addChild(rock2);
    // gameObjectList.push(rock2);

    stage.interactive = true;
    stage
      .on('mousedown', listen)
      .on('touchstart', listen)
      .on('mouseup', listen)
      .on('touchend', listen)
      .on('mouseupoutside', listen)
      .on('touchendoutside', listen)
      .on('mousemove', listen)
      .on('touchmove', listen);

    for (var i = 0, l = gameObjectList.length; i < l; i++)
      gameObjectList[i].init();

    Global.gameStartTime = Date.now();
  };

  that.update = function() {
    var currentTime = Date.now();
    var delta = currentTime - time;
    for (var i = 0, l = gameObjectList.length; i < l; i++)
      gameObjectList[i].update(delta);
    time = currentTime;
  };
}
module.exports = GameEngine;
