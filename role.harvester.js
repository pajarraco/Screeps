var roleTowerkeeper = require('role.towerkeeper');

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
              (s.structureType == STRUCTURE_EXTENSION || s.structureType == STRUCTURE_SPAWN) &&
              s.energy < s.energyCapacity);
        }
      });
      if (depositTargets.length > 0) {
        if (creep.transfer(depositTargets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
          creep.moveTo(depositTargets[0]);
        }
      } else {
        roleTowerkeeper.run(creep);
      }
    } else {
      var containers = creep.pos.findClosestByRange(
          FIND_STRUCTURES, {filter: (s) => s.structureType == STRUCTURE_CONTAINER && s.store[RESOURCE_ENERGY] > 300});
      if (containers) {
        if (creep.withdraw(containers, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
          creep.moveTo(containers);
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
};

module.exports = roleHarvester;
