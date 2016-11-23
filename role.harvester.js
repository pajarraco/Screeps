var roleBuilder = require('role.builder');

var roleHarvester = {

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
      var targets = creep.room.find(FIND_STRUCTURES, {
        filter: (structure) => {
          return ((structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN ||
                   structure.structureType == STRUCTURE_TOWER) &&
                  structure.energy < structure.energyCapacity) ||
              (structure.structureType == STRUCTURE_CONTAINER &&
               structure.store[RESOURCE_ENERGY] < structure.storeCapacity);
        }
      });
      if (targets.length > 0) {
        if (creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
          creep.moveTo(targets[0]);
        }
      } else {
        roleBuilder.run(creep);
      }
    } else {
      var sources = creep.room.find(FIND_SOURCES);
      var i = creep.memory.source;
      if (creep.harvest(sources[i]) == ERR_NOT_IN_RANGE) {
        creep.moveTo(sources[i]);
      }
    }

  }
};

module.exports = roleHarvester;
