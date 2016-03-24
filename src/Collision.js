const Global = require('./Global');

var groups = {};
// var stage;
// var point1 = new PIXI.Point();
// var point2 = new PIXI.Point();

var Collision = {
  addGroup: function(instance, group) {
    var array = groups[group];
    if (array)
      array.push(instance);
    else
      groups[group] = [instance];
  },
  isCollide: function(instance, group) {
    if (instance.parent == null) return;
    var instanceWidth = instance.width;
    var instanceHeight = instance.height;
    var x1 = instance.x + (0.5 - instance.anchor.x) * instanceWidth;
    var y1 = instance.y + (0.5 - instance.anchor.y) * instanceHeight;
    var array = groups[group];
    var target, targetWidth, targetHeight, x2, y2;
    for (var i = 0, l = array.length; i < l; i++) {
      target = array[i];
      if (target.parent == null) continue;
      targetWidth = target.width;
      targetHeight = target.height;
      x2 = target.x + (0.5 - target.anchor.x) * targetWidth;
      y2 = target.y + (0.5 - target.anchor.y) * targetHeight;
      if (Math.abs(x1 - x2) < (instanceWidth + targetWidth) * 0.5 && Math.abs(y1 - y2) < (instanceHeight + targetHeight) * 0.5)
        return target;
    }
    return null;
  }
  // isCollide: function(instance, group) {
  //   if (instance.parent == null) return;
  //   if (!stage) stage = Global.gameStage;
  //   var instanceWidth = instance.width;
  //   var instanceHeight = instance.height;
  //   point1.x = instance.x + (0.5 - instance.anchor.x) * instanceWidth;
  //   point1.y = instance.y + (0.5 - instance.anchor.y) * instanceHeight;
  //   // point1 = stage.toLocal(point1, instance);
  //   var array = groups[group];
  //   var target, targetWidth, targetHeight;
  //   for (var i = 0, l = array.length; i < l; i++) {
  //     target = array[i];
  //     if (target.parent == null) continue;
  //     targetWidth = target.width;
  //     targetHeight = target.height;
  //     point2.x = target.x + (0.5 - target.anchor.x) * targetWidth;
  //     point2.y = target.y + (0.5 - target.anchor.y) * targetHeight;
  //     // point2 = stage.toLocal(point2, target);
  //     if (Math.abs(point1.x - point2.x) < (instanceWidth + targetWidth) * 0.5 && Math.abs(point1.y - point2.y) < (instanceHeight + targetHeight) * 0.5)
  //       return target;
  //   }
  //   return null;
  // }
};
module.exports = Collision;
