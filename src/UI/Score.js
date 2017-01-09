var scoreDiv;
var scoreSpan;
module.exports = {
  rn_init_rn: function() {
    scoreDiv = $(".scoreDiv");
    scoreSpan = $(".scoreDiv span")[0];
  },
  rn_updateScore_rn: function(score) {
    scoreSpan.innerHTML = score;
  },
  rn_updatePosition_rn: function(x, y) {
    scoreDiv.css({
      top: y,
      left: x
    });
  }
};