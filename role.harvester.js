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
      var depositTargets = creep.room.find(FIND_STRUCTURES, {
        filter: (s) => {
          return (
              (s.structureType == STRUCTURE_EXTENSION || s.structureType == STRUCTURE_SPAWN ||
               s.structureType == STRUCTURE_TOWER) &&
              s.energy < s.energyCapacity);
        }
      });
      if (depositTargets.length > 0) {
        if (creep.transfer(depositTargets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
          creep.moveTo(depositTargets[0]);
        }
      } else {
        //  var depositContainers = creep.room.find(
        //      FIND_STRUCTURES,
        //      {filter: (s) => s.structureType == STRUCTURE_CONTAINER && s.store[RESOURCE_ENERGY] < s.storeCapacity});
        //  if (depositContainers.length > 0) {
        //    if (creep.transfer(depositContainers[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
        //      creep.moveTo(depositContainers[0]);
        //    }
        //  } else {
        roleBuilder.run(creep);
        //  }
      }
    } else {
      var targets = creep.room.find(FIND_STRUCTURES, {
        filter: (s) => {
          return (
              (s.structureType == STRUCTURE_EXTENSION || s.structureType == STRUCTURE_SPAWN ||
               s.structureType == STRUCTURE_TOWER) &&
              s.energy < s.energyCapacity);
        }
      });
      var containers = creep.room.find(
          FIND_STRUCTURES, {filter: (s) => s.structureType == STRUCTURE_CONTAINER && s.store[RESOURCE_ENERGY] > 0});
      if (containers.length > 0 && targets.length > 0) {
        if (creep.withdraw(containers[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
          creep.moveTo(containers[0]);
        }
      } else {
        var sources = creep.room.find(FIND_SOURCES);
        var i = creep.memory.source;
        if (creep.harvest(sources[i]) == ERR_NOT_IN_RANGE) {
          creep.moveTo(sources[i]);
        }
      }
    }

  }
};

module.exports = roleHarvester;
