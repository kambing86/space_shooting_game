const Global = require('../Global');
const Extends = require('../util/extends');

function Background(texture, plane) {
  var that = this;
  PIXI.Container.call(that, texture);

  var speedY = 5;
  var resetHeight;
  var movableWidth;
  var minX = plane.minX;
  var planeMovableWidth = plane.maxX - minX;

  that.init = function() {
    var sprite = new PIXI.Sprite(texture);
    that.addChild(sprite);
    var bgHeight = sprite.height;
    sprite = new PIXI.Sprite(texture);
    sprite.y = -bgHeight;
    that.addChild(sprite);
    var bgScale = Global.gameHeight / bgHeight;
    that.scale.x = that.scale.y = bgScale;
    resetHeight = that.height / 2;
    movableWidth = that.width - Global.gameWidth;
  };

  that.update = function(dt) {
    that.y += speedY * dt * 0.01;
    if (that.y > resetHeight)
      that.y -= resetHeight;
    that.x = -movableWidth * (plane.x - minX) / planeMovableWidth
  };
}
Extends(Background, PIXI.Container);
module.exports = Background;
