// const Howl = require('Howl');
const SoundJS = require('SoundJS');

const Global = require('./Global');

var instance = null;

var path = "sound/";
var sounds = {
  laser: "laser",
  explosion1: "explosion1",
  explosion2: "explosion2",
  explosion3: "explosion3",
  music: "music"
};
var done = 0;

var gameEvent = Global.gameEvent;

var now = Date.now;
var laserDelay = 200;
var laserVolume = 0.2;
var lastTick;

function checkDone() {
  done++;
  if (done >= Object.keys(sounds).length)
    gameEvent.emit('soundDone');
}

function loadFail() {
  gameEvent.emit('soundFail');
}

function SoundSystem() {
  SoundJS.on("fileload", checkDone);
  SoundJS.on("fileerror", loadFail);
  var array = [];

  for (var i in sounds)
    array.push({
      id: i,
      src: sounds[i] + ".mp3"
    });

  SoundJS.registerSounds(array, path);
  gameEvent.on('explosion', function(x, y, big) {
    if (big)
      SoundJS.play(sounds.explosion2);
    else
      SoundJS.play(sounds.explosion1);
  });
  gameEvent.on('dead', function() {
    SoundJS.play(sounds.explosion3);
  });
  gameEvent.on('shoot', function() {
    var currentTime = now();
    if (lastTick && currentTime - lastTick < laserDelay) return;
    lastTick = currentTime;
    SoundJS.play(sounds.laser, {
      volume: laserVolume
    });
  });
  gameEvent.once('gameStart', function() {
    SoundJS.play(sounds.music, {
      loop: -1
    });
  });
}

module.exports = {
  init: function() {
    if (instance) return instance;
    instance = new SoundSystem();
    return instance;
  }
};
