const harvest = require('harvest');
const harvestDrop = require('harvest.drop');
const harvestContainer = require('harvest.container');
const harvestStorage = require('harvest.storage');
const harvestLink = require('harvest.link');

var roleTowerkeeper = {

  /** @param {Creep} creep **/

  run: function (creep) {

    if (creep.memory.transferring && creep.carry.energy == 0) {
      creep.memory.transferring = false;
      creep.say('harvesting');
      creep.memory.depositTarget = false;
    }
    if (!creep.memory.transferring && creep.carry.energy == creep.carryCapacity) {
      creep.memory.transferring = true;
      creep.say('transferring');
      creep.memory.depositTarget = lessEnergy(creep);
    }

    if (creep.memory.transferring) {
      creep.memory.htarget = '';
      if (creep.memory.depositTarget) {
        if (creep.transfer(Game.getObjectById(creep.memory.depositTarget), RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
          creep.moveTo(Game.getObjectById(creep.memory.depositTarget));
        }
      } else {
        creep.memory.depositTarget = lessEnergy(creep);
      }
    } else {
      if (!creep.memory.htarget) {
        if (!harvestStorage.run(creep, 100)) {
          if (!harvestContainer.run(creep, 200)) {
            if (!harvestDrop.run(creep)) {
              harvestLink.run(creep, 100);
            }
          }
        }
      }
      harvest.run(creep);
    }
  }
};

module.exports = roleTowerkeeper;

/** @param {Creep} creep **/
const lessEnergy = (creep) => {
  let depositTargets = creep.room.find(FIND_STRUCTURES, {
    filter: (s) => {
      return (s.structureType == STRUCTURE_TOWER && s.energy < s.energyCapacity);
    }
  });
  let target = depositTargets[0];
  depositTargets.map((_target) => {
    if (_target.energy < target.energy) {
      target = _target;
    }
  });
  return target.id;
}
