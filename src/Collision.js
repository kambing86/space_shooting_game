//not complete
//rotation not in the calculation

var groups = {};

function rect_rect(x1, y1, width1, height1, rotation1, x2, y2, width2, height2, rotation2) {
  return Math.abs(x1 - x2) < (width1 + width2) / 2 && Math.abs(y1 - y2) < (height1 + height2) / 2;
}

function rect_cir(x1, y1, width1, height1, rotation1, x2, y2, width2, height2, rotation2) {
  var direction = Math.atan2(y1 - y2, x1 - x2);
  var x3 = x2 + width2 / 2 * Math.cos(direction);
  var y3 = y2 + height2 / 2 * Math.sin(direction);
  return Math.abs(x3 - x1) < width1 / 2 && Math.abs(y3 - y1) < height1 / 2;
}

function cir_cir(x1, y1, width1, height1, rotation1, x2, y2, width2, height2, rotation2) {
  var direction1 = Math.atan2(y2 - y1, x2 - x1);
  var x3 = x1 + width1 / 2 * Math.cos(direction1);
  var y3 = y1 + height1 / 2 * Math.sin(direction1);
  var direction2 = -(Math.PI - direction1);
  var x4 = x2 + width2 / 2 * Math.cos(direction2);
  var y4 = y2 + height2 / 2 * Math.sin(direction2);
  return Math.abs(x4 - x1) < Math.abs(x3 - x1) && Math.abs(y4 - y1) < Math.abs(y3 - y1);
}

function checkCollision(x1, y1, width1, height1, rotation1, type1, x2, y2, width2, height2, rotation2, type2) {
  if (type1 == Collision.TYPE_RECTANGLE) {
    if (type2 == Collision.TYPE_RECTANGLE)
      return rect_rect(x1, y1, width1, height1, rotation1, x2, y2, width2, height2, rotation2);
    else
      return rect_cir(x1, y1, width1, height1, rotation1, x2, y2, width2, height2, rotation2);
  } else {
    if (type2 == Collision.TYPE_RECTANGLE)
      return rect_cir(x2, y2, width2, height2, rotation2, x1, y1, width1, height1, rotation1);
    else
      return cir_cir(x1, y1, width1, height1, rotation1, x2, y2, width2, height2, rotation2);
  }
}

var Collision = {
  TYPE_RECTANGLE: 0,
  TYPE_CIRCLE: 1,
  addGroup: function(instance, group, type, area) {
    if (!type) instance.collisionType = this.TYPE_RECTANGLE;
    else instance.collisionType = type;
    if (area)
      instance.collisionArea = {
        width: area.width,
        height: area.height
      };
    else
      instance.collisionArea = {
        width: instance.width,
        height: instance.height
      };
    var array = groups[group];
    if (array)
      array.push(instance);
    else
      groups[group] = [instance];
  },
  isCollide: function(instance, group) {
    if (!instance.visible) return;
    var width1 = instance.collisionArea.width;
    var height1 = instance.collisionArea.height;
    var x1 = instance.x + (0.5 - instance.anchor.x) * width1;
    var y1 = instance.y + (0.5 - instance.anchor.y) * height1;
    var rotation1 = instance.rotation;
    var type1 = instance.collisionType;
    var array = groups[group];
    var target, width2, height2, x2, y2, rotation2, type2;
    for (var i = 0, l = array.length; i < l; i++) {
      target = array[i];
      if (!target.visible) continue;
      width2 = target.collisionArea.width;
      height2 = target.collisionArea.height;
      x2 = target.x + (0.5 - target.anchor.x) * width2;
      y2 = target.y + (0.5 - target.anchor.y) * height2;
      rotation2 = target.rotation;
      type2 = target.collisionType;
      if (checkCollision(x1, y1, width1, height1, rotation1, type1, x2, y2, width2, height2, rotation2, type2))
        return target;
    }
    return null;
  }
};
module.exports = Collision;
