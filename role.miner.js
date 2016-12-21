var roleMiner = {

  /** @param {Creep} creep **/
  run: function(creep) {
    var sources = creep.room.find(FIND_SOURCES);
    var i = creep.memory.source;
    if (creep.harvest(sources[i]) == ERR_NOT_IN_RANGE) {
      creep.moveTo(sources[i]);
    }
    var links = creep.pos.findInRange(FIND_STRUCTURES, 1, {filter: {structureType: STRUCTURE_LINK}});
    if (links.length > 0) {
      creep.transfer(links[0], RESOURCE_ENERGY);
    }
    var containers = creep.pos.findInRange(FIND_STRUCTURES, 1, {filter: {structureType: STRUCTURE_CONTAINER}});
    if (containers.length > 0) {
      creep.moveTo(containers[0]);
    }
  }
};

module.exports = roleMiner;
