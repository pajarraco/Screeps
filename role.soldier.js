const attack = require('attack');

const roleSoldier = {

  /** @param {Creep} creep **/
  run: (creep) => {
    if (!attack.run(creep)) {
      // move to flag
      if (creep.memory.source == 0) {
        creep.moveTo(Game.flags['TopRoom']);
      } else if (creep.memory.source == 1) {
        creep.moveTo(Game.flags['TopRoom']);
      }
    }
  }
};

module.exports = roleSoldier;
