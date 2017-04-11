var roleConquest = {

  /** @param {Creep} creep **/
  run: function(creep) {

    // attack hostile
    // var closestHostile = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
    // if (closestHostile) {
    //   if (creep.rangedAttack(closestHostile) == ERR_NOT_IN_RANGE) {
    //     creep.moveTo(closestHostile);
    //   }
    // }
    //
    // // attack hostile structure
    // var closestHostileStructures = creep.pos.findClosestByRange(FIND_HOSTILE_STRUCTURES);
    // if (closestHostileStructures) {
    //   if (creep.rangedAttack(closestHostileStructures) == ERR_NOT_IN_RANGE) {
    //     creep.moveTo(closestHostileStructures);
    //   }
    // }

    // reserve controler
    if (!creep.room.controller.my) {
      // console.log(creep.reserveController(creep.room.controller));
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
};

module.exports = roleConquest;
