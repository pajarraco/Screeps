const harvestDrop = {

  /** @param {Creep} creep **/
  run: (creep) {
    const target = creep.room.find(FIND_DROPPED_ENERGY);
    let x = target[0];
    for (let j = 0; j < target.length; j++) {
      if (target[j].amount > x.amount) {
        x = target[j];
      }
    }
    if (x) {
      creep.memory.htarget = x.id;
      creep.memory.htype = 1;
      return true;
    } else {
      return false;
    }
  };
};
module.exports = harvestDrop;
