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
      default:
    }
  } else {
    creep.memory.htarget = '';
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
    if (creep.harvest(sources[i]) == ERR_NOT_IN_RANGE) {
      creep.moveTo(sources[i]);
    }
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
        var linkTo = creep.room.lookForAt('structure', 12, 30)[1];
        if (linkTo.energy >= (linkTo.energyCapacity - 200)) {
          creep.memory.htarget = linkTo.id;
          creep.memory.htype = 2;
        } else {
          var target = creep.pos.findClosestByRange(FIND_DROPPED_ENERGY);
          if (target) {
            creep.memory.htarget = target.id;
            creep.memory.htype = 1;
          } else {
            var storages = creep.pos.findClosestByRange(FIND_STRUCTURES, {
              filter: (s) => (s.structureType == STRUCTURE_STORAGE || s.structureType == STRUCTURE_CONTAINER) &&
                  s.store[RESOURCE_ENERGY] > 200
            });
            if (storages) {
              creep.memory.htarget = storages.id;
              creep.memory.htype = 2;
            } else {
              harvestSource(creep);
            }
          }
        }
      }
      harvest(creep);
    }
  }
};

module.exports = roleBuilder;
