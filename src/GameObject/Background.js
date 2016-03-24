const PIXI = require('PIXI');

const Global = require('../Global');
const Extends = require('../util/extends');

function Background(texture, plane) {
  var that = this;
  PIXI.Container.call(that);

  var speedY = 50;
  var resetHeight;
  var movableWidth;
  var minX = plane.minX;
  var planeMovableWidth = plane.maxX - minX;

  that.init = function() {
    var sprite = new PIXI.Sprite(texture);
    that.addChild(sprite);
    resetHeight = sprite.height;
    sprite = new PIXI.Sprite(texture);
    sprite.y = -resetHeight;
    that.addChild(sprite);
    that.scale.x = that.scale.y = Global.gameHeight / resetHeight;
    resetHeight = that.height / 2;
    that.cacheAsBitmap = true;
    movableWidth = that.width - Global.gameWidth;
  };

  that.update = function(dt) {
    that.y += speedY * dt;
    if (that.y > resetHeight)
      that.y -= resetHeight;
    that.x = -movableWidth * (plane.x - minX) / planeMovableWidth;
  };
}
Extends(Background, PIXI.Container);
module.exports = Background;
