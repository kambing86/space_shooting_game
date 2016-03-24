var levelDiv;
var levelSpan;
module.exports = {
  init: function() {
    levelDiv = $(".levelDiv");
    levelSpan = $(".levelDiv span");
  },
  updateLevel: function(level) {
    levelSpan.html(level);
  },
  updatePosition: function(x, y, width) {
    levelDiv.css({
      top: y,
      left: x,
      width: width
    });
  }
};
