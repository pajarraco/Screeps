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

        if (lab1_2.mineralAmount > 0) {
            const creeps = _.filter(Game.creeps, (creep) => {
                console.log(creep);
            })
            console.log(creeps);
        }


    }
};
module.exports = structureLab;
