const home1 = 'E17N93';
const home2 = 'E19N94';
const home3 = 'E18N95';
const home4 = 'E18N93';

const structureLab = {

    run: () => {
        const lab1_1 = Game.rooms[home1].find(
            FIND_STRUCTURES, {
                filter: (s) => s.structureType == STRUCTURE_LAB
            });
        console.log(lab1_1);
    }
};
module.exports = structureLab;
