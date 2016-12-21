var structureLink = {

  /** @param  {Room} room  **/
  run: function(room) {

    var linkFrom = room.lookForAt('structure', 29, 39)[1];
    var linkTo = room.lookForAt('structure', 32, 26)[1];
    if (linkFrom && linkTo) {
      if (linkTo.energy < (linkTo.energyCapacity - 100)) {
        linkFrom.transferEnergy(linkTo);
      }
    }
  }
};
module.exports = structureLink;
