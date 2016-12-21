var roleTowerkeeper = {

  /** @param {Creep} creep **/
  run: function(creep) {

    if (creep.memory.transferring && creep.carry.energy == 0) {
      creep.memory.transferring = false;
      creep.say('harvesting');
    }
    if (!creep.memory.transferring && creep.carry.energy == creep.carryCapacity) {
      creep.memory.transferring = true;
      creep.say('transferring');
    }

    if (creep.memory.transferring) {
      var depositTargets = creep.room.find(FIND_STRUCTURES, {
        filter: (s) => {
          return ((s.structureType == STRUCTURE_TOWER) && s.energy < s.energyCapacity);
        }
      });
      if (depositTargets.length > 0) {
        var s = creep.memory.source;
        if (creep.room.name == 'E37S68') {
          s = 0;
        }
        if (creep.transfer(depositTargets[s], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
          creep.moveTo(depositTargets[s]);
        }
      }
    } else {
      var storages = creep.pos.findClosestByRange(FIND_STRUCTURES, {
        filter: (s) => (s.structureType == STRUCTURE_STORAGE || s.structureType == STRUCTURE_CONTAINER) &&
            s.store[RESOURCE_ENERGY] > 300
      });
      if (storages) {
        if (creep.withdraw(storages, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
          creep.moveTo(storages);
        }
      } else {
        var sources = creep.room.find(FIND_SOURCES);
        var i = 0;  // creep.memory.source;
        if (creep.harvest(sources[i]) == ERR_NOT_IN_RANGE) {
          creep.moveTo(sources[i]);
        }
      }
    }
  }
}
}
;

module.exports = roleTowerkeeper;
