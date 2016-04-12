var timeDiv;
var timeSpan;
var redClass = "red";

module.exports = {
  rn_init_rn: function() {
    timeDiv = $(".timeDiv");
    timeSpan = $(".timeDiv span")[0];
  },
  rn_updateTime_rn: function(time) {
    timeSpan.innerHTML = time;
    if (time <= 10 && !timeDiv.hasClass(redClass))
      timeDiv.addClass(redClass);
  },
  rn_updatePosition_rn: function(x, y) {
    timeDiv.css({
      top: y,
      right: x
    });
  }
};
