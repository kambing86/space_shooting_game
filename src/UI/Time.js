var timeDiv;
var timeSpan;

module.exports = {
  init: function() {
    timeDiv = $(".timeDiv");
    timeSpan = $(".timeDiv span")[0];
  },
  updateTime: function(time) {
    timeSpan.innerHTML = time;
  },
  updatePosition: function(x, y) {
    timeDiv.css({
      top: y,
      right: x
    });
  }
};
