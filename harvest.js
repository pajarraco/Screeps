const harvest = {
  run: (creep) => {
    const target = Game.getObjectById(creep.memory.htarget);
    if (target) {
      switch (creep.memory.htype) {
        case 1:
          if (creep.pickup(target) == ERR_NOT_IN_RANGE) {
            creep.moveTo(target);
          } else if (creep.pickup(target) == ERR_NOT_ENOUGH_RESOURCES) {
            creep.memory.htarget = '';
          }
          break;
        case 2:
          if (creep.withdraw(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            creep.moveTo(target);
          } else if (creep.withdraw(target, RESOURCE_ENERGY) == ERR_NOT_ENOUGH_RESOURCES) {
            creep.memory.htarget = '';
          }
          break;
        default:
      }
    } else {
      creep.memory.htarget = '';
    }
  }
};

module.exports = harvest;
