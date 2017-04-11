var roleHarvester = require('role.harvester');

var harvest = function(creep) {
  var target = Game.getObjectById(creep.memory.htarget);
  if (target) {
    switch (creep.memory.htype) {
      case 1:
        if (creep.pickup(target) == ERR_NOT_IN_RANGE) {
          creep.moveTo(target);
        } else if (creep.pickup(target) == ERR_NOT_ENOUGH_RESOURCES) {
          creep.memory.htarget = '';
        }
        break;
      case 2:
        if (creep.withdraw(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
          creep.moveTo(target);
        } else if (creep.withdraw(target, RESOURCE_ENERGY) == ERR_NOT_ENOUGH_RESOURCES) {
          creep.memory.htarget = '';
        }
        break;
      case 3:
        if (creep.harvest(target) == ERR_NOT_IN_RANGE) {
          creep.moveTo(target);
        } else if (creep.harvest(target) == ERR_NOT_ENOUGH_RESOURCES) {
          creep.memory.htarget = '';
        }
        break;
      default:
    }
  } else {
    creep.memory.htarget = '';
  }
};

var roleBuilder = {

  /** @param {Creep} creep **/
  run: function(creep) {

    if (creep.memory.building && creep.carry.energy == 0) {
      creep.memory.building = false;
      creep.say('harvesting');
    }
    if (!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
      creep.memory.building = true;
      creep.say('building');
    }

    if (creep.memory.building) {
      creep.memory.htarget = '';
      var targets = creep.pos.findClosestByRange(FIND_CONSTRUCTION_SITES);
      if (targets) {
        if (creep.build(targets) == ERR_NOT_IN_RANGE) {
          creep.moveTo(targets);
        }
      } else {
        var closestDamagedStructure =
            creep.pos.findClosestByRange(FIND_STRUCTURES, {filter: (s) => s.hits < s.hitsMax && s.hits < 3000});
        if (closestDamagedStructure) {
          if (creep.repair(closestDamagedStructure) == ERR_NOT_IN_RANGE) {
            creep.moveTo(closestDamagedStructure);
          }
        } else {
          roleHarvester.run(creep);
        }
      }
    } else {
      if (!creep.memory.htarget) {
        var target = creep.pos.findClosestByRange(FIND_DROPPED_ENERGY);
        if (target) {
          creep.memory.htarget = target.id;
          creep.memory.htype = 1;
        } else {
          var storages = creep.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (s) => (s.structureType == STRUCTURE_STORAGE || s.structureType == STRUCTURE_CONTAINER) &&
                s.store[RESOURCE_ENERGY] > 100
          });
          if (storages) {
            creep.memory.htarget = storages.id;
            creep.memory.htype = 2;
          } else {
            var sources = creep.pos.findClosestByRange(FIND_SOURCES);
            creep.memory.htarget = sources.id;
            creep.memory.htype = 3;
          }
        }
      }
      harvest(creep);
    }
  }
};

module.exports = roleBuilder;
