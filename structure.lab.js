const home1 = 'E17N93';
const home2 = 'E19N94';
const home3 = 'E18N95';
const home4 = 'E18N93';

const structureLab = {

    run: () => {
        const labs1 = Game.rooms[home1].find(
            FIND_STRUCTURES, {
                filter: (s) => s.structureType == STRUCTURE_LAB
            });
        const lab1_1 = labs1[0];
        const lab1_2 = labs1[1];
        const lab1_3 = labs1[2];

        // if (lab1_3.mineralAmount > 0) {
        //     const creeps = _.filter(Game.creeps, (creep) => creep.room.name === home1 && creep.memory.role === 'soldier');
        //     if (creeps.length > 0) {
        //       let boosts = lab1_3.boostCreep(creeps[0]);
        //       console.log('boosts',boosts);
        //         if (boosts === ERR_NOT_IN_RANGE) {
        //             creeps[0].moveTo(lab1_3);
        //         }
        //     }
        // }
    }
};
module.exports = structureLab;
