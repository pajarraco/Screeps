const attack = require('attack');

const roleConquest = {

  /** @param {Creep} creep **/
  run: (creep) => {

    if (!attack.run(creep)) {
      // reserve controler
      if (!creep.room.controller.my) {
        if (creep.reserveController(creep.room.controller) == ERR_NOT_IN_RANGE) {
          creep.moveTo(creep.room.controller);
        }
      } else {
        if (creep.memory.source == 0) {
          creep.moveTo(Game.flags['TopRoom']);
        } else if (creep.memory.source == 1) {
          creep.moveTo(Game.flags['TopRoom']);
        }
      }
    }
  }
};

module.exports = roleConquest;
