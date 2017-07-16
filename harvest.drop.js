const harvestDrop = {

  /** @param {Creep} creep **/
  run: (creep) => {
    // const target = creep.room.find(FIND_DROPPED_RESOURCES);
    const y = creep.pos.findClosestByRange(FIND_DROPPED_RESOURCES);
    console.log(y);
    if (y) {
      if (y.resourceType === 'energy') {
        console.log('energy');
      }
    }
    let x = null;
    // let x = target[0];
    // for (let j = 0; j < target.length; j++) {
    //   if (target[j].amount > x.amount) {
    //     x = target[j];
    //   }
    // }
    if (x) {
      creep.memory.htarget = x.id;
      creep.memory.htype = 1;
      return true;
    } else {
      return false;
    }
  }
};

module.exports = harvestDrop;
