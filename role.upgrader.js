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
      var storages =
          creep.pos.findClosestByRange(FIND_STRUCTURES, {filter: (s) => s.structureType == STRUCTURE_STORAGE});
      if (storages) {
        if (creep.withdraw(storages, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
          creep.moveTo(storages);
        }
      } else {
        var container = creep.pos.findClosestByRange(
            FIND_STRUCTURES, {filter: (s) => s.structureType == STRUCTURE_CONTAINER && s.store[RESOURCE_ENERGY] > 0});
        if (container) {
          if (creep.withdraw(container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            creep.moveTo(container);
          }
        } else {
          var linkTo = creep.room.lookForAt('structure', 12, 30)[1];
          if (linkTo.energy >= (linkTo.energyCapacity - 500)) {
            if (creep.withdraw(linkTo, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
              creep.moveTo(linkTo);
            }
          }
        }
      }
    }
  }
};

module.exports = roleUpgrader;
