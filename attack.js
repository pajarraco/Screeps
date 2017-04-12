const attack = {
  run: (creep) => {
    var target = creep.pos.findClosestByRange(FIND_MY_CREEPS, {
      filter: function(object) {
        return object.hits < object.hitsMax;
      }
    });
    if (target) {
      if (creep.heal(target) == ERR_NOT_IN_RANGE) {
        creep.moveTo(target);
      }
    }
    // attack hostile
    const closestHostile = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
    const closestHostileStructures = creep.pos.findClosestByRange(FIND_HOSTILE_STRUCTURES);
    if (closestHostile || closestHostileStructures) {
      if (closestHostile) {
        if (creep.rangedAttack(closestHostile) == ERR_NOT_IN_RANGE) {
          // creep.moveTo(closestHostile);
          creep.moveTo(Game.flags['Flag1']);
        }
      } else {
        if (creep.rangedAttack(closestHostileStructures) == ERR_NOT_IN_RANGE) {
          // creep.moveTo(closestHostileStructures);
          creep.moveTo(Game.flags['Flag1']);
        }
      }
      return true;
    } else {
      return false;
    }
  }
};

module.exports = attack;
