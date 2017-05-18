const home1 = 'E17N93';
const home2 = 'E19N94';
const home3 = 'E18N95';
const home4 = 'E18N93';

const harvestLink = {

    /** @param {Creep} creep **/
    /** @param {Number} max **/
    run: (creep, max) => {

        let _max = max ? max : 200;
        let linkTo = null;
        if (creep.room.name === home1) {
            linkTo = creep.room.lookForAt('structure', 32, 24)[0];
        } else if (creep.room.name === home2) {
            linkTo = creep.room.lookForAt('structure', 31, 29)[0];
        } else if (creep.room.name === home3) {
            linkTo = creep.room.lookForAt('structure', 33, 26)[0];
        }
        if (linkTo) {
            if (linkTo.energy >= (linkTo.energyCapacity - _max)) {
                creep.memory.htarget = linkTo.id;
                creep.memory.htype = 2;
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }
};

module.exports = harvestLink;
