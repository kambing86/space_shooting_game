const SoundJS = require('SoundJS');

const Global = require('../Global');

var instance = null;

function SoundManager() {
  var path = "sound/";
  var sounds = {
    laser: "laser",
    explosion1: "explosion1",
    explosion2: "explosion2",
    explosion3: "explosion3",
    music: "music"
  };

  var laserDelay = 200;
  var laserVolume = 0.2;
  var lastTick;

  (function() {
    var done = 0;
    var array = [];

    function checkDone() {
      done++;
      if (done >= Object.keys(sounds).length) {
        done = array = null;
        Global.gameEvent.emit('soundDone');
      }
    }

    function loadFail() {
      Global.gameEvent.emit('soundFail');
    }

    SoundJS.on("fileload", checkDone);
    SoundJS.on("fileerror", loadFail);

    for (var i in sounds)
      array.push({
        id: i,
        src: sounds[i] + ".mp3"
      });

    SoundJS.registerSounds(array, path);
  })();

  Global.gameEvent.on('explosion', function(x, y, big) {
    if (big)
      SoundJS.play(sounds.explosion2);
    else
      SoundJS.play(sounds.explosion1);
  });
  Global.gameEvent.on('dead', function() {
    SoundJS.play(sounds.explosion3);
  });
  Global.gameEvent.on('shoot', function() {
    var currentTime = Date.now();
    if (lastTick && currentTime - lastTick < laserDelay) return;
    lastTick = currentTime;
    SoundJS.play(sounds.laser, {
      volume: laserVolume
    });
  });
  Global.gameEvent.once('gameStart', function() {
    SoundJS.play(sounds.music, {
      loop: -1
    });
  });
}

module.exports = {
  init: function() {
    if (instance) return instance;
    instance = new SoundManager();
    return instance;
  }
};
