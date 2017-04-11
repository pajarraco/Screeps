var roleUpgrader = {

  /** @param {Creep} creep **/
  run: function(creep) {

    if (creep.memory.upgrading && creep.carry.energy == 0) {
      creep.memory.upgrading = false;
      creep.say('harvesting');
    }
    if (!creep.memory.upgrading && creep.carry.energy == creep.carryCapacity) {
      creep.memory.upgrading = true;
      creep.say('upgrading');
    }

    if (creep.memory.upgrading) {
      if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
        creep.moveTo(creep.room.controller);
      }
    } else {
      var linkTo = creep.room.lookForAt('structure', 12, 30)[1];
      if (linkTo.energy >= (linkTo.energyCapacity - 100)) {
        if (creep.withdraw(linkTo, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
          creep.moveTo(linkTo);
        }
      } else {
        var storages = creep.pos.findClosestByRange(FIND_STRUCTURES, {
          filter: (s) => (s.structureType == STRUCTURE_STORAGE || s.structureType == STRUCTURE_CONTAINER) &&
              s.store[RESOURCE_ENERGY] > 0
        });
        if (storages) {
          if (creep.withdraw(storages, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            creep.moveTo(storages);
          }
        } else {
          var sources = creep.room.find(FIND_SOURCES);
          var i = creep.memory.source;
          if (creep.harvest(sources[i]) == ERR_NOT_IN_RANGE) {
            creep.moveTo(sources[i]);
          }
        }
      }
    }
  }
};

module.exports = roleUpgrader;
