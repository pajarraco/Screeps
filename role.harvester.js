var roleUpgrader = require('role.upgrader');

var harvest = function(creep) {
  var target = Game.getObjectById(creep.memory.htarget);
  if (target) {
    switch (creep.memory.htype) {
      case 1:
        if (creep.pickup(target) == ERR_NOT_IN_RANGE) {
          creep.moveTo(target);
        }
        break;
      case 2:
        if (creep.withdraw(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
          creep.moveTo(target);
        }
        break;
      default:
    }
  } else {
    creep.memory.htarget = '';
  }
};

var harvestContainer = function(creep) {
  var containers = creep.pos.findClosestByRange(
      FIND_STRUCTURES, {filter: (s) => s.structureType == STRUCTURE_CONTAINER && s.store[RESOURCE_ENERGY] > 300});
  if (containers) {
    creep.memory.htarget = containers.id;
    creep.memory.htype = 2;
  } else {
    harvestSource(creep);
  }
};

var harvestSource = function(creep) {
  creep.memory.htarget = 'xxxxx';
  var sources = creep.room.find(FIND_SOURCES);
  var i = /*0; */ creep.memory.source;
  var harvest = creep.harvest(sources[i]);
  if (harvest == ERR_NOT_IN_RANGE) {
    creep.moveTo(sources[i]);
  } else if (harvest == ERR_NOT_ENOUGH_RESOURCES) {
    if (creep.harvest(sources[1]) == ERR_NOT_IN_RANGE) {
      creep.moveTo(sources[1]);
    }
  }
};

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
      if (depositTargets) {
        var storages = creep.pos.findClosestByRange(
            FIND_STRUCTURES, {filter: (s) => s.structureType == STRUCTURE_STORAGE && s.store[RESOURCE_ENERGY] > 100});
        if (storages) {
          creep.memory.htarget = storages.id;
          creep.memory.htype = 2;
        } else {
          harvestContainer(creep);
        }
      } else {
        if (!creep.memory.htarget) {
          var target = creep.room.find(FIND_DROPPED_ENERGY);
          var x = target[0];
          for (j = 0; j < target.length; j++) {
            if (target[j].amount > x.amount) {
              x = target[j];
            }
          }
          if (x) {
            creep.memory.htarget = x.id;
            creep.memory.htype = 1;
          } else {
            harvestContainer(creep);
          }
        }
      }
      harvest(creep);
    }
  }
};

module.exports = roleHarvester;
