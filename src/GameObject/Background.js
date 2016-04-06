const PIXI = require('PIXI');

const Global = require('../Global');
const Extends = require('../util').rn_extends_rn;

function Background(texture, plane) {
  var that = this;
  PIXI.Container.call(that);

  var speedY = 50;
  var resetHeight;
  var movableWidth;
  var minX = plane.minX;
  var planeMovableWidth = plane.maxX - minX;

  that.rn_init_rn = function() {
    var sprite = new PIXI.Sprite(texture);
    that.addChild(sprite);
    resetHeight = sprite.height;
    sprite = new PIXI.Sprite(texture);
    sprite.y = -resetHeight;
    that.addChild(sprite);
    that.scale.x = that.scale.y = Global.rn_gameHeight_rn / resetHeight;
    resetHeight = that.height / 2;
    // var widthForGame = that.width;
    for (var i = 0; i < 4; i++) {
      sprite = new PIXI.Sprite(texture);
      sprite.x = ((i % 2 == 0) ? -1 : 1) * sprite.width;
      sprite.y = ((i < 2) ? -1 : 0) * sprite.height;
      that.addChild(sprite);
    }
    that.cacheAsBitmap = true;
    movableWidth = 50;
  };

  that.rn_update_rn = function(dt) {
    that.y += speedY * dt;
    if (that.y > resetHeight)
      that.y -= resetHeight;
    that.x = -movableWidth * (plane.x - minX) / planeMovableWidth;
  };
}
Extends(Background, PIXI.Container);
module.exports = Background;
