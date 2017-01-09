const TweenMax = require('TweenMax');
const TimelineMax = require('TimelineMax');
const Linear = require('Linear');

var textDiv;
var effectTimeline;
var disappearEffect;

module.exports = {
  rn_init_rn: function() {
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
  rn_setText_rn: function(text) {
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
  rn_disappear_rn: function() {
    disappearEffect.play(0);
  },
  rn_resetScore_rn: function(score) {
    textDiv.css({
      color: "#e6262d"
    }).html("Score Reset!!" + "<br/>-" + score);
    effectTimeline.play(0);
  },
  rn_bonusScore_rn: function(score) {
    textDiv.css({
      color: "#fff500"
    }).html("Bonus Score!!" + "<br/>" + score);
    effectTimeline.play(0);
  }
};