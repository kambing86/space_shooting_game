var scoreDiv;
var scoreSpan;
module.exports = {
  init: function() {
    scoreDiv = $(".scoreDiv");
    scoreSpan = $(".scoreDiv span");
  },
  updateScore: function(score) {
    scoreSpan.html(score);
  },
  updatePosition: function(x, y) {
    scoreDiv.css({
      top: y,
      left: x
    });
  }
};
