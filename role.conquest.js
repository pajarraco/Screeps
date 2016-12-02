var roleConquest = {

  /** @param {Creep} creep **/
  run: function(creep) {

    // attack hostile
    var closestHostile = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
    if (closestHostile) {
      if (creep.attack(closestHostile) == ERR_NOT_IN_RANGE) {
        creep.moveTo(closestHostile);
      }
    }

    // attack hostile
    var closestHostileStructures = creep.pos.findClosestByRange(FIND_HOSTILE_STRUCTURES);
    if (closestHostileStructures) {
      if (creep.attack(closestHostileStructures) == ERR_NOT_IN_RANGE) {
        creep.moveTo(closestHostileStructures);
      }
    }

    // find controler
    creep.moveTo(32, 0);



    /* if (creep.room.controller) {
         console.log(creep.claimController(creep.room.controller));
       if (creep.claimController(creep.room.controller) == ERR_NOT_IN_RANGE) {
         creep.moveTo(creep.room.controller);
       }
     }*/

  }
};

module.exports = roleConquest;
