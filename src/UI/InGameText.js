const TweenMax = require('TweenMax');
const Linear = require('Linear');

var textDiv;

var tweenEffect = function() {
  TweenMax.to(textDiv, 1.2, {
    css: {
      scaleX: 2,
      scaleY: 2
    },
    startAt: {
      opacity: 1,
      scaleX: 1,
      scaleY: 1
    }
  });
  TweenMax.to(textDiv, 0.4, {
    opacity: 0,
    delay: 0.8
  });
};

module.exports = {
  init: function() {
    textDiv = $(".inGameTextDiv");
  },
  setText: function(text) {
    textDiv.css({
      opacity: 1,
      color: "#fff",
      transform: ""
    }).html("");
    TweenMax.to(textDiv, 1, {
      text: {
        value: text
      },
      ease: Linear.easeNone
    });
  },
  disappear: function() {
    TweenMax.to(textDiv, 2, {
      opacity: 0
    });
  },
  resetScore: function() {
    textDiv.css({
      color: "#e6262d"
    }).html("Score Reset!!");
    tweenEffect();
  },
  bonusScore: function() {
    textDiv.css({
      color: "#fff500"
    }).html("Bonus Score!!");
    tweenEffect();
  }
};
