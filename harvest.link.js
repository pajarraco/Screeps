const harvestLink = {

  /** @param {Creep} creep **/
  /** @param {Number} max **/
  run: (creep, max) => {

    let _max = max ? max : 200;
    const linkTo = creep.room.lookForAt('structure', 32, 24)[0];
    if (linkTo.energy >= (linkTo.energyCapacity - _max)) {
      creep.memory.htarget = linkTo.id;
      creep.memory.htype = 2;
      return true;
    } else {
      return false;
    }
  }
};

module.exports = harvestLink;
