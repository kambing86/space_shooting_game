const TweenMax = require('TweenMax');
const TimelineMax = require('TimelineMax');
const Linear = require('Linear');

var textDiv;
var effectTimeline;
var disappearEffect;

module.exports = {
  init: function() {
    textDiv = $(".inGameTextDiv");
    effectTimeline = new TimelineMax({
      paused: true
    });
    effectTimeline.add(TweenMax.to(textDiv, 1.2, {
      css: {
        scaleX: 2,
        scaleY: 2
      },
      startAt: {
        opacity: 1,
        scaleX: 1,
        scaleY: 1
      }
    })).add(TweenMax.to(textDiv, 0.4, {
      opacity: 0
    }), 0.8);
    disappearEffect = TweenMax.to(textDiv, 2, {
      opacity: 0,
      paused: true
    });
  },
  setText: function(text) {
    effectTimeline.stop();
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
    disappearEffect.play(0);
  },
  resetScore: function() {
    textDiv.css({
      color: "#e6262d"
    }).html("Score Reset!!");
    effectTimeline.play(0);
  },
  bonusScore: function() {
    textDiv.css({
      color: "#fff500"
    }).html("Bonus Score!!");
    effectTimeline.play(0);
  }
};
