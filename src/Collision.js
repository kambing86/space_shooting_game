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
  if (type1 == Collision.rn_TYPE_RECTANGLE_rn) {
    if (type2 == Collision.rn_TYPE_RECTANGLE_rn)
      return rect_rect(x1, y1, width1, height1, x2, y2, width2, height2);
    else
      return rect_cir(x1, y1, width1, height1, x2, y2, width2, height2);
  } else {
    if (type2 == Collision.rn_TYPE_RECTANGLE_rn)
      return rect_cir(x2, y2, width2, height2, x1, y1, width1, height1);
    else
      return cir_cir(x1, y1, width1, height1, x2, y2, width2, height2);
  }
}

var Collision = {
  rn_TYPE_RECTANGLE_rn: 0,
  rn_TYPE_CIRCLE_rn: 1,
  rn_addGroup_rn: function(instance, group, type, area) {
    if (!type) instance.rn_collisionType_rn = this.rn_TYPE_RECTANGLE_rn;
    else instance.rn_collisionType_rn = type;
    if (area)
      instance.rn_collisionArea_rn = {
        width: area.width,
        height: area.height
      };
    else
      instance.rn_collisionArea_rn = {
        width: instance.width,
        height: instance.height
      };
    var array = groups[group];
    if (array)
      array.push(instance);
    else
      groups[group] = [instance];
  },
  rn_isCollide_rn: function(instance, group) {
    var array = groups[group];
    if (array == undefined) return;
    if (!instance.visible) return;
    var width1 = instance.rn_collisionArea_rn.width;
    var height1 = instance.rn_collisionArea_rn.height;
    var x1 = instance.x + (0.5 - instance.anchor.x) * width1;
    var y1 = instance.y + (0.5 - instance.anchor.y) * height1;
    var type1 = instance.rn_collisionType_rn;
    var target, width2, height2, x2, y2, type2;
    for (var i = 0, l = array.length; i < l; i++) {
      target = array[i];
      if (!target.visible) continue;
      width2 = target.rn_collisionArea_rn.width;
      height2 = target.rn_collisionArea_rn.height;
      x2 = target.x + (0.5 - target.anchor.x) * width2;
      y2 = target.y + (0.5 - target.anchor.y) * height2;
      type2 = target.rn_collisionType_rn;
      if (checkCollision(x1, y1, width1, height1, type1, x2, y2, width2, height2, type2))
        return target;
    }
    return null;
  }
};
module.exports = Collision;