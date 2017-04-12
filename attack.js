const attack = {
  run: (creep) => {
    // attack hostile
    const closestHostile = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
    const closestHostileStructures = creep.pos.findClosestByRange(FIND_HOSTILE_STRUCTURES);
    if (closestHostile || closestHostileStructures) {
      if (closestHostile) {
        if (creep.rangedAttack(closestHostile) == ERR_NOT_IN_RANGE) {
          creep.moveTo(closestHostile);
        }
      } else {
        if (creep.rangedAttack(closestHostileStructures) == ERR_NOT_IN_RANGE) {
          creep.moveTo(closestHostileStructures);
        }
      }
      return true;
    } else {
      return false;
    }
  }
};

module.exports = attack;
