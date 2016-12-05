var roleMiner = {

  /** @param {Creep} creep **/
  run: function(creep) {
    // if (creep.carry.energy < creep.carryCapacity) {
    var sources = creep.room.find(FIND_SOURCES);
    var i = creep.memory.source;
    if (creep.harvest(sources[i]) == ERR_NOT_IN_RANGE) {
      creep.moveTo(sources[i]);

      var container = creep.pos.findInRange(FIND_STRUCTURES, 1, {filter: {structureType: STRUCTURE_CONTAINER}});
      var containerPos = creep.pos.getDirectionTo(container);
      console.log(containerPos);
    }
    /*} else {
      var container = creep.pos.findClosestByRange(
          FIND_STRUCTURES,
          {filter: (s) => s.structureType == STRUCTURE_CONTAINER && s.store[RESOURCE_ENERGY] < s.storeCapacity});
      if (container) {
        if (creep.transfer(container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
          creep.moveTo(container);
        }
      } else {
        var storage = creep.pos.findClosestByRange(
            FIND_STRUCTURES,
            {filter: (s) => s.structureType == STRUCTURE_STORAGE && s.store[RESOURCE_ENERGY] < s.storeCapacity});
        if (storage) {
          if (creep.transfer(storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            creep.moveTo(storage);
          }
        }
      }
    }*/
  }
};

module.exports = roleMiner;
