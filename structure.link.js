const structureLink = {

    /** @param  {Room} room  **/
    run: function(room) {

        const linkFrom1 = room.lookForAt('structure', 47, 16)[0];
        const linkFrom2 = room.lookForAt('structure', 28, 19)[1];
        const linkTo = room.lookForAt('structure', 32, 24)[0];
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
