var scoreDiv;
var scoreSpan;
module.exports = {
  init: function() {
    scoreDiv = $(".scoreDiv");
    scoreSpan = $(".scoreDiv span")[0];
  },
  updateScore: function(score) {
    scoreSpan.innerHTML = score;
  },
  updatePosition: function(x, y) {
    scoreDiv.css({
      top: y,
      left: x
    });
  }
};
