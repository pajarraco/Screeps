var roleDelivery = {

  /** @param {Creep} creep **/
  run: function(creep) {

    if (creep.memory.source == 1) {
      var linkFrom = creep.room.lookForAt('structure', 29, 39)[1];
      if (creep.pos.x == 30 && creep.pos.y == 39) {
        var containers = creep.pos.findInRange(FIND_STRUCTURES, 1, {filter: {structureType: STRUCTURE_CONTAINER}});
        if (containers.length > 0) {
          if (creep.withdraw(containers[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            creep.moveTo(containers[0]);
          } else {
            if (creep.transfer(linkFrom, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
              creep.moveTo(linkFrom);
            }
          }
        }
      } else {
        creep.moveTo(30, 39);
      }
    } else {
      var linkTo = creep.room.lookForAt('structure', 32, 26)[1];
      if (creep.carry.energy < creep.carryCapacity) {
        if (creep.withdraw(linkTo, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
          creep.moveTo(linkTo);
        } else {
          creep.moveTo(31, 26);
        }
      } else {
        var storageTargets = creep.room.find(
            FIND_STRUCTURES,
            {filter: (s) => s.structureType == STRUCTURE_STORAGE && s.store[RESOURCE_ENERGY] < s.storeCapacity});
        if (storageTargets.length > 0) {
          if (creep.transfer(storageTargets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            creep.moveTo(storageTargets[0]);
          }
        } else {
          var depositTargets = creep.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (s) => {
              return (
                  (s.structureType == STRUCTURE_EXTENSION || s.structureType == STRUCTURE_SPAWN) &&
                  s.energy < s.energyCapacity);
            }
          });
          if (depositTargets) {
            if (creep.transfer(depositTargets, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
              creep.moveTo(depositTargets);
            }
          }
        }
      }
    }
  }
};

module.exports = roleDelivery;
