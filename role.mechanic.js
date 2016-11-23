var roleMechanic = {
  run: function(creep) {
    if (creep.carry.energy < creep.carryCapacity) {
      var sources = creep.room.find(FIND_SOURCES);
      var i = creep.memory.source;
      if (creep.harvest(sources[i]) == ERR_NOT_IN_RANGE) {
        creep.moveTo(sources[i]);
      }
    } else {
      var closestDamagedStructure =
          creep.pos.findClosestByRange(FIND_STRUCTURES, {filter: (structure) => structure.hits < structure.hitsMax});
      if (closestDamagedStructure) {
        creep.repair(closestDamagedStructure);
      }
    }
  }
};

module.exports = roleMechanic;