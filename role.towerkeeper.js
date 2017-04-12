const harvest = require('harvest');
const harvestDrop = require('harvest.drop');
const harvestContainer = require('harvest.container');
const harvestStorage = require('harvest.storage');

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
      creep.memory.htarget = '';
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
      if (!creep.memory.htarget) {
        if (!harvestStorage.run(creep, 100)) {
          if (!harvestContainer.run(creep, 100)) {
            harvestDrop.run(creep);
          }
        }
      }
      harvest.run(creep);
    }
  }
};

module.exports = roleTowerkeeper;
