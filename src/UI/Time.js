var timeDiv;
var timeSpan;

module.exports = {
  rn_init_rn: function() {
    timeDiv = $(".timeDiv");
    timeSpan = $(".timeDiv span")[0];
  },
  rn_updateTime_rn: function(time) {
    timeSpan.innerHTML = time;
  },
  rn_updatePosition_rn: function(x, y) {
    timeDiv.css({
      top: y,
      right: x
    });
  }
};
