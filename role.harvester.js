const roleUpgrader = require('role.upgrader');
const harvest = require('harvest');
const harvestDrop = require('harvest.drop');
const harvestContainer = require('harvest.container');
const harvestStorage = require('harvest.storage');
const harvestLink = require('harvest.link');
const harvestSource = require('harvest.source');
const harvestTerminal = require('harvest.terminal');

var roleHarvester = {

  /** @param {Creep} creep **/
  run: function (creep) {

    var depositTargets = creep.pos.findClosestByRange(FIND_STRUCTURES, {
      filter: (s) => {
        return (
          (s.structureType == STRUCTURE_EXTENSION || s.structureType == STRUCTURE_SPAWN) &&
          s.energy < s.energyCapacity);
      }
    });

    let sum = _.sum(creep.carry);
    if (creep.memory.transferring && sum == 0) {
      creep.memory.transferring = false;
      creep.say('harvesting');
    }
    if (!creep.memory.transferring && sum == creep.carryCapacity) {
      creep.memory.transferring = true;
      creep.say('transferring');
    }

    if (creep.memory.transferring) {
      creep.memory.htarget = '';
      if (depositTargets) {
        if (creep.transfer(depositTargets, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
          creep.moveTo(depositTargets);
        }
      } else {
        if (creep.memory.role == 'harvester') {
          var storages = creep.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (s) => s.structureType == STRUCTURE_STORAGE
          });
          var terminal = creep.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (s) => s.structureType == STRUCTURE_TERMINAL
          });
          _.each(creep.carry, (resource, key) => {
            // if (terminal) {
            //     if (creep.transfer(terminal, key) == ERR_NOT_IN_RANGE) {
            //         creep.moveTo(terminal);
            //     }
            // } else {
            if (creep.transfer(storages, key) == ERR_NOT_IN_RANGE) {
              creep.moveTo(storages);
            } else {
              creep.moveTo(creep.pos.findClosestByRange(FIND_STRUCTURES, {
                filter: (s) => s.structureType == STRUCTURE_SPAWN
              }));
            }
            // }
          });
        } else {
          roleUpgrader.run(creep);
        }
      }
    } else {
      if (!creep.memory.htarget) {
        if (!harvestTerminal.run(creep)) {
          if (!harvestLink.run(creep, 600)) {
            if (depositTargets) {
              if (!harvestTerminal.run(creep)) {
                if (!harvestStorage.run(creep, 500)) {
                  if (!harvestDrop.run(creep)) {
                    if (!harvestContainer.run(creep, 100)) {
                      harvestSource.run(creep);
                    }
                  }
                }
              }
            } else {
              if (!harvestTerminal.run(creep)) {
                if (!harvestDrop.run(creep)) {
                  if (!harvestContainer.run(creep, 100)) {
                    harvestSource.run(creep);
                  }
                }
              }
            }
          }
        }
      }
      harvest.run(creep);
    }
  }
};

module.exports = roleHarvester;
