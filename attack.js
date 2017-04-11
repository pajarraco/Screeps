const attack = {
  run: (creep) => {
    // attack hostile
    const closestHostile = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
    if (closestHostile) {
      if (creep.rangedAttack(closestHostile) == ERR_NOT_IN_RANGE) {
        creep.moveTo(closestHostile);
      }
      return true;
    } else {
      // attack hostile structure
      const closestHostileStructures = creep.pos.findClosestByRange(FIND_HOSTILE_STRUCTURES);
      if (closestHostileStructures) {
        if (creep.rangedAttack(closestHostileStructures) == ERR_NOT_IN_RANGE) {
          creep.moveTo(closestHostileStructures);
        }
        return true;
      } else {
        return false;
      }
    }
  }
};

module.exports = attack;
