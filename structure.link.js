const home1 = 'E17N93';
const home2 = 'E19N94';
const home3 = 'E18N95';
const home4 = 'E18N93';

const structureLink = {

    /** @param  {Room} room  **/
    run: function(room) {

        if (room.name === home1) {
            const linkFrom1 = room.lookForAt('structure', 28, 19)[0];
            const linkFrom2 = room.lookForAt('structure', 24, 26)[0];
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
        } else if (room.name === home2) {
            const linkFrom1 = room.lookForAt('structure', 40, 24)[0];
            // const linkFrom2 = room.lookForAt('structure', 28, 19)[1];
            const linkTo = room.lookForAt('structure', 31, 29)[0];
            if (linkFrom1 && linkTo) {
                if (linkTo.energy < (linkTo.energyCapacity - 100)) {
                    linkFrom1.transferEnergy(linkTo);
                }
            }
        } else if (room.name === home3) {
            const linkFrom1 = room.lookForAt('structure', 43, 16)[0];
            // const linkFrom2 = room.lookForAt('structure', 28, 19)[1];
            const linkTo = room.lookForAt('structure', 33, 26)[0];
            if (linkFrom1 && linkTo) {
                if (linkTo.energy < (linkTo.energyCapacity - 100)) {
                    linkFrom1.transferEnergy(linkTo);
                }
            }
        } else if (room.name === home4) {
            const linkFrom1 = room.lookForAt('structure', 40, 13)[0];
            // const linkFrom2 = room.lookForAt('structure', 28, 19)[1];
            const linkTo = room.lookForAt('structure', 23, 13)[0];
            if (linkFrom1 && linkTo) {
                if (linkTo.energy < (linkTo.energyCapacity - 100)) {
                    linkFrom1.transferEnergy(linkTo);
                }
            }
        }
    }
};
module.exports = structureLink;
