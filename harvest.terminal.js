const harvestTerminal = {

  /** @param {Creep} creep **/
  /** @param {Number} min **/
  run: (creep, min) => {
    let _min = min ? min : 400;
    const terminal = creep.pos.findClosestByRange(FIND_STRUCTURES, {
      filter: (s) => s.structureType == STRUCTURE_TERMINAL && s.store[RESOURCE_ENERGY] > _min
    });
    if (terminal) {
      creep.memory.htarget = terminal.id;
      creep.memory.htype = 2;
      return true;
    } else {
      return false;
    }
  }
};

module.exports = harvestTerminal;
