// not complete
// rotation not in the calculation

var groups = {};

function rect_rect(x1, y1, width1, height1, x2, y2, width2, height2) {
  return Math.abs(x1 - x2) < (width1 + width2) / 2 && Math.abs(y1 - y2) < (height1 + height2) / 2;
}

// not accurate
function rect_cir(x1, y1, width1, height1, x2, y2, width2, height2) {
  var halfWidth1 = width1 / 2;
  var halfHeight1 = height1 / 2;
  var testX = (x1 > x2) ? x1 - halfWidth1 : x1 + halfWidth1;
  var testY = (y1 > y2) ? y1 - halfHeight1 : y1 + halfHeight1;
  return getDistance(Math.abs(testX - x2), Math.abs(testY - y2)) < height2 / 2;
}

function getDistance(x, y) {
  return Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
}

function cir_cir(x1, y1, width1, height1, x2, y2, width2, height2) {
  var totalRadius = height1 / 2 + height2 / 2;
  var distance = getDistance(Math.abs(x1 - x2), Math.abs(y1 - y2));
  return distance < totalRadius;
}

function checkCollision(x1, y1, width1, height1, type1, x2, y2, width2, height2, type2) {
  if (type1 == Collision.TYPE_RECTANGLE) {
    if (type2 == Collision.TYPE_RECTANGLE)
      return rect_rect(x1, y1, width1, height1, x2, y2, width2, height2);
    else
      return rect_cir(x1, y1, width1, height1, x2, y2, width2, height2);
  } else {
    if (type2 == Collision.TYPE_RECTANGLE)
      return rect_cir(x2, y2, width2, height2, x1, y1, width1, height1);
    else
      return cir_cir(x1, y1, width1, height1, x2, y2, width2, height2);
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
    var type1 = instance.collisionType;
    var array = groups[group];
    var target, width2, height2, x2, y2, type2;
    for (var i = 0, l = array.length; i < l; i++) {
      target = array[i];
      if (!target.visible) continue;
      width2 = target.collisionArea.width;
      height2 = target.collisionArea.height;
      x2 = target.x + (0.5 - target.anchor.x) * width2;
      y2 = target.y + (0.5 - target.anchor.y) * height2;
      type2 = target.collisionType;
      if (checkCollision(x1, y1, width1, height1, type1, x2, y2, width2, height2, type2))
        return target;
    }
    return null;
  }
};
module.exports = Collision;
