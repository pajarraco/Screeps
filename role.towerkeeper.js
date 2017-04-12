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
        if (creep.transfer(depositTargets[s], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
          creep.moveTo(depositTargets[s]);
        }
      }
    } else {
      var storages = creep.pos.findClosestByRange(
          FIND_STRUCTURES, {filter: (s) => s.structureType == STRUCTURE_STORAGE && s.store[RESOURCE_ENERGY] > 00});
      if (storages) {
        if (creep.withdraw(storages, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
          creep.moveTo(storages);
        }
      } else {
        var targets = creep.room.find(FIND_DROPPED_ENERGY);
        if (targets.length) {
          if (creep.pickup(targets[0]) == ERR_NOT_IN_RANGE) {
            creep.moveTo(targets[0]);
          }
        } else {
          var container = creep.pos.findClosestByRange(
              FIND_STRUCTURES,
              {filter: (s) => (s.structureType == STRUCTURE_CONTAINER) && s.store[RESOURCE_ENERGY] > 00});
          if (container) {
            if (creep.withdraw(container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
              creep.moveTo(container);
            }
          }
        }
      }
    }
  }
};

module.exports = roleTowerkeeper;
