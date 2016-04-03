var timeDiv;
var timeSpan;

module.exports = {
  init: function() {
    timeDiv = $(".timeDiv");
    timeSpan = $(".timeDiv span");
  },
  updateTime: function(time) {
    timeSpan.html(time);
  },
  updatePosition: function(x, y) {
    timeDiv.css({
      top: y,
      right: x
    });
  }
};
