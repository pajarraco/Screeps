const home1 = 'E17N93';
const home2 = 'E19N94';
const home3 = 'E18N95';
const home4 = 'E18N93';

const structureTerminal = {

    run: () => {
        const terminal1 = Game.rooms[home1].terminal;
        const terminal2 = Game.rooms[home2].terminal;

        let send = terminal1.send(RESOURCE_OXYGEN, 100, home2, 'Energy send');
        console.log('terminal send', send);

    }
};
module.exports = structureTerminal;
