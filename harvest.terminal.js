const harvestTerminal = {

  /** @param {Creep} creep **/
  /** @param {Number} min **/
  run: (creep, min) => {
    let _min = min ? min : 100;
    const terminal = creep.pos.findClosestByRange(
        FIND_STRUCTURES, {filter: (s) => s.structureType == STRUCTURE_TERMINAL && s.store[RESOURCE_ENERGY] > _min});
    if (storages) {
      creep.memory.htarget = terminal.id;
      creep.memory.htype = 2;
      return true;
    } else {
      return false;
    }
  }
};

module.exports = harvestTerminal;
