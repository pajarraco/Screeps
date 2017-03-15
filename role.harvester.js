var roleUpgrader = require('role.upgrader');

var harvestContainer = function(creep) {
  var containers = creep.pos.findClosestByRange(
      FIND_STRUCTURES, {filter: (s) => s.structureType == STRUCTURE_CONTAINER && s.store[RESOURCE_ENERGY] > 300});
  if (containers) {
    if (creep.withdraw(containers, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
      creep.moveTo(containers);
    }
  } else {
    harvestSource(creep);
  }
};

var harvestSource = function(creep) {
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
    console.log(creep.memory.transferring);
    console.log(creep.carry[RESOURCE_HYDROGEN]);
    console.log('keanium', creep.carry[RESOURCE_KEANIUM]);
    console.log(creep.carryCapacity);

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

    /*var link = creep.room.lookForAt('structure', 32, 26)[1];
    if (!link) {
      link = {};
    }*/

    var depositTargets = creep.pos.findClosestByRange(FIND_STRUCTURES, {
      filter: (s) => {
        return (
            (s.structureType == STRUCTURE_EXTENSION || s.structureType == STRUCTURE_SPAWN) &&
            s.energy < s.energyCapacity);
      }
    });

    // if (creep.memory.source == 0 || creep.carry.energy != 0) {
    if (creep.memory.transferring && creep.carry.energy == 0) {
      creep.memory.transferring = false;
      creep.say('harvesting');
    }
    if (!creep.memory.transferring && creep.carry.energy == creep.carryCapacity) {
      creep.memory.transferring = true;
      creep.say('transferring');
    }

    if (creep.memory.transferring) {
      if (depositTargets) {
        if (creep.transfer(depositTargets, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
          creep.moveTo(depositTargets);
        }
      } else {
        // if (link && creep.memory.role == 'harvester') {
        if (creep.memory.role == 'harvester') {
          /*if (link.energy > 0 && creep.carry.energy < creep.carryCapacity) {
            if (creep.withdraw(link, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
              creep.moveTo(link);
            }
          } else {*/
          var storages =
              creep.pos.findClosestByRange(FIND_STRUCTURES, {filter: (s) => s.structureType == STRUCTURE_STORAGE});
          if (creep.transfer(storages, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            creep.moveTo(storages);
          }
          //}
        } else {
          roleUpgrader.run(creep);
        }
      }
    } else {
      var target = creep.pos.findClosestByRange(FIND_DROPPED_ENERGY);
      if (target) {
        if (creep.pickup(target) == ERR_NOT_IN_RANGE) {
          creep.moveTo(target);
        }
      } else {
        /*if (link.energy > 100) {
          if (creep.withdraw(link, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            creep.moveTo(link);
          }
        } else {*/
        if (depositTargets) {
          var storages = creep.pos.findClosestByRange(
              FIND_STRUCTURES, {filter: (s) => s.structureType == STRUCTURE_STORAGE && s.store[RESOURCE_ENERGY] > 100});
          if (storages) {
            if (creep.withdraw(storages, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
              creep.moveTo(storages);
            }
          } else {
            harvestContainer(creep);
          }
        } else {
          harvestContainer(creep);
        }
        //}
      }
    }
    // } else {
    //   harvestMine(creep);
    // }
  }
};

module.exports = roleHarvester;
