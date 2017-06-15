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

        if (lab1_1.store > 0){
          console.log(lab1_1.store);
        }


    }
};
module.exports = structureLab;
