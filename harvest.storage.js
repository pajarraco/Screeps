const harvestStorage = {

  /** @param {Creep} creep **/
  /** @param {Number} min **/
  run: (creep, min) => {
    let _min = min ? min : 100;
    const storages = creep.pos.findClosestByRange(
        FIND_STRUCTURES, {filter: (s) => s.structureType == STRUCTURE_STORAGE && s.store[RESOURCE_ENERGY] > _min});
    if (storages) {
      creep.memory.htarget = storages.id;
      creep.memory.htype = 2;
      return true;
    } else {
      return false;
    }
  }
};
module.exports = harvestStorage;
