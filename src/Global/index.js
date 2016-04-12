const EventEmitter = require('eventemitter3');
const Input = require('./Input');
module.exports = {
  rn_init_rn: function(stage) {
    this.rn_Input_rn = new Input(stage);
  },
  rn_gameWidth_rn: 500,
  rn_gameHeight_rn: 800,
  rn_Input_rn: null,
  rn_gameEvent_rn: new EventEmitter(),
  rn_gameEventName_rn: {
    rn_soundDone_rn: 'soundDone',
    rn_soundFail_rn: 'soundFail',
    rn_gameStart_rn: 'gameStart',
    rn_score_rn: 'score',
    rn_bonus_rn: 'bonus',
    rn_resetscore_rn: 'resetscore',
    rn_spawn_rn: 'spawn',
    rn_gameover_rn: 'gameover',
    rn_explosion_rn: 'explosion',
    rn_shoot_rn: 'shoot',
    rn_dead_rn: 'dead'
  }
};
