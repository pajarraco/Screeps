const roleHarvester = require('role.harvester');
const harvest = require('harvest');


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
            }
          }
        }
      }
      harvest.run(creep);
    }
  }
};

module.exports = roleBuilder;
