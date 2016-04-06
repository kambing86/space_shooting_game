const SoundJS = require('SoundJS');

const Global = require('../Global');

var instance = null;

function SoundManager() {
  var path = "sound/";
  var sounds = {
    rn_laser_rn: "laser",
    rn_explosion1_rn: "explosion1",
    rn_explosion2_rn: "explosion2",
    rn_explosion3_rn: "explosion3",
    rn_music_rn: "music"
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
        Global.rn_gameEvent_rn.emit('soundDone');
      }
    }

    function loadFail() {
      Global.rn_gameEvent_rn.emit('soundFail');
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

  Global.rn_gameEvent_rn.on('explosion', function(x, y, big) {
    if (big)
      SoundJS.play(sounds.rn_explosion2_rn);
    else
      SoundJS.play(sounds.rn_explosion1_rn);
  });
  Global.rn_gameEvent_rn.on('dead', function() {
    SoundJS.play(sounds.rn_explosion3_rn);
  });
  Global.rn_gameEvent_rn.on('shoot', function() {
    var currentTime = Date.now();
    if (lastTick && currentTime - lastTick < laserDelay) return;
    lastTick = currentTime;
    SoundJS.play(sounds.rn_laser_rn, {
      volume: laserVolume
    });
  });
  Global.rn_gameEvent_rn.once('gameStart', function() {
    SoundJS.play(sounds.rn_music_rn, {
      loop: -1
    });
  });
}

module.exports = {
  rn_init_rn: function() {
    if (instance) return instance;
    instance = new SoundManager();
    return instance;
  }
};
