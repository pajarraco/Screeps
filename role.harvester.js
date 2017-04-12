const roleUpgrader = require('role.upgrader');
const harvest = require('harvest');
const harvestDrop = require('harvest.drop');
const harvestContainer = require('harvest.container');
const harvestStorage = require('harvest.storage');
const harvestLink = require('harvest.link');
const harvestSource = require('harvest.source');


var transferingMaterial = function(creep, resource, room) {
  if (!creep.memory.term) {
    var labs = creep.room.find(FIND_STRUCTURES, {filter: (s) => s.structureType == STRUCTURE_LAB});
    var tk = creep.transfer(labs[0], resource);
    if (tk == ERR_NOT_IN_RANGE) {
      creep.moveTo(labs[0]);
    } else if (tk == ERR_FULL) {
      creep.memory.term = true;
    }
  } else {
    var terminal = creep.room.find(FIND_STRUCTURES, {filter: (s) => s.structureType == STRUCTURE_TERMINAL});
    if (creep.transfer(terminal[0], resource) == ERR_NOT_IN_RANGE) {
      creep.moveTo(terminal[0]);
    } else {
      if (terminal.send(resource, 100, room) == ERR_NOT_ENOUGH_RESOURCES) {
        console.log('wait no ', resource);
      }
    }
  }
};

var harvestMine = function(creep) {
  if (creep.memory.transferring && (!creep.carry[RESOURCE_HYDROGEN] || !creep.carry[RESOURCE_KEANIUM])) {
    creep.memory.transferring = false;
    creep.memory.term = false;
    creep.say('harvesting');
  }
  if (!creep.memory.transferring &&
      (creep.carry[RESOURCE_HYDROGEN] == creep.carryCapacity || creep.carry[RESOURCE_KEANIUM] == creep.carryCapacity)) {
    creep.memory.transferring = true;
    creep.say('transferring');
  }
  if (creep.memory.transferring) {
    transferingMaterial(creep, RESOURCE_HYDROGEN, 'E37S69');
    transferingMaterial(creep, RESOURCE_KEANIUM, 'E37S68');
  } else {
    var sources = creep.room.find(FIND_MINERALS);
    var i = 0;  // creep.memory.source;
    if (creep.harvest(sources[i]) == ERR_NOT_IN_RANGE) {
      creep.moveTo(sources[i]);
    }
  }
};

var roleHarvester = {

  /** @param {Creep} creep **/
  run: function(creep) {

    var depositTargets = creep.pos.findClosestByRange(FIND_STRUCTURES, {
      filter: (s) => {
        return (
            (s.structureType == STRUCTURE_EXTENSION || s.structureType == STRUCTURE_SPAWN) &&
            s.energy < s.energyCapacity);
      }
    });

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
      if (depositTargets) {
        if (creep.transfer(depositTargets, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
          creep.moveTo(depositTargets);
        }
      } else {
        if (creep.memory.role == 'harvester') {
          var storages =
              creep.pos.findClosestByRange(FIND_STRUCTURES, {filter: (s) => s.structureType == STRUCTURE_STORAGE});
          if (creep.transfer(storages, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            creep.moveTo(storages);
          }
        } else {
          roleUpgrader.run(creep);
        }
      }
    } else {
      if (!creep.memory.htarget) {
        if (!harvestLink.run(creep, 500)) {
          if (depositTargets) {
            if (!harvestStorage.run(creep, 100)) {
              if (!harvestDrop.run(creep)) {
                if (!harvestContainer.run(creep, 100)) {
                  harvestSource.run(creep);
                }
              }
            }
          } else {
            if (!harvestDrop.run(creep)) {
              if (!harvestContainer.run(creep, 300)) {
                harvestSource.run(creep);
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
