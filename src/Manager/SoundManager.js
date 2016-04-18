const SoundJS = require('SoundJS');

const gameEvent = require('../Global').rn_gameEvent_rn;
const gameEventName = require('../Global').rn_gameEventName_rn;

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
        gameEvent.emit(gameEventName.rn_soundDone_rn);
      }
    }

    function loadFail() {
      gameEvent.emit(gameEventName.rn_soundFail_rn);
    }

    SoundJS.on("fileload", checkDone);
    SoundJS.on("fileerror", loadFail);

    for (var i in sounds)
      array.push({
        id: sounds[i],
        src: sounds[i] + ".mp3"
      });

    SoundJS.registerSounds(array, path);
  })();

  gameEvent.on(gameEventName.rn_explosion_rn, function(x, y, big) {
    if (big)
      SoundJS.play(sounds.rn_explosion2_rn);
    else
      SoundJS.play(sounds.rn_explosion1_rn);
  });
  gameEvent.on(gameEventName.rn_dead_rn, function() {
    SoundJS.play(sounds.rn_explosion3_rn);
  });
  gameEvent.on(gameEventName.rn_shoot_rn, function() {
    var currentTime = Date.now();
    if (lastTick && currentTime - lastTick < laserDelay) return;
    lastTick = currentTime;
    SoundJS.play(sounds.rn_laser_rn, {
      volume: laserVolume
    });
  });
  gameEvent.once(gameEventName.rn_gameStart_rn, function() {
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
