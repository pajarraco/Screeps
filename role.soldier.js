/** @param {Creep} creep **/
var findEmptyRampart = function(creep) {
  var returnRampart;
  var soldiers = _.filter(Game.creeps, (c) => c.memory.role == 'soldier' && c.id != creep.id);
  var ramparts = creep.room.find(FIND_STRUCTURES, {filter: (s) => s.structureType == STRUCTURE_RAMPART});
  ramparts.forEach(function(rampart) {
    var emptyRampart = true;
    soldiers.forEach(function(soldier) {
      if (rampart.pos.x == soldier.pos.x && rampart.pos.y == soldier.pos.y) {
        emptyRampart = false;
      }
    });
    if (emptyRampart) {
      returnRampart = rampart;
      return false;
    }
  });
  return returnRampart;
};

var roleSoldier = {

  /** @param {Creep} creep **/
  run: function(creep) {

    var closestHostile = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
    if (closestHostile) {
      if (creep.attack(closestHostile) == ERR_NOT_IN_RANGE) {
        creep.moveTo(closestHostile);
      }
    } else {
      rampart = findEmptyRampart(creep);
      if (rampart) {
        creep.moveTo(rampart);
      }
    }
  }
};

module.exports = roleSoldier;
