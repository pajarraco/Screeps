var structureLink = {

  /** @param  {Room} room  **/
  run: function(room) {

    var linkFrom1 = room.lookForAt('structure', 5, 3)[1];
    var linkFrom2 = room.lookForAt('structure', 23, 32)[1];
    var linkTo = room.lookForAt('structure', 32, 24)[0];
    if (linkFrom1 && linkTo) {
      if (linkTo.energy < (linkTo.energyCapacity - 100)) {
        linkFrom1.transferEnergy(linkTo);
      }
    }
    if (linkFrom2 && linkTo) {
      if (linkTo.energy < (linkTo.energyCapacity - 100)) {
        linkFrom2.transferEnergy(linkTo);
      }
    }
  }
};
module.exports = structureLink;
