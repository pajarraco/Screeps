const harvestContainer = {

  /** @param {Creep} creep **/
  /** @param {Number} min **/
  run: (creep, min) => {
    let _min = min ? min : 300;
    const containers = creep.pos.findClosestByRange(
        FIND_STRUCTURES, {filter: (s) => s.structureType == STRUCTURE_CONTAINER && s.store[RESOURCE_ENERGY] > _min});
    if (containers) {
      creep.memory.htarget = containers.id;
      creep.memory.htype = 2;
      return true;
    } else {
      return false;
    }
  }
};

module.exports = harvestContainer;
