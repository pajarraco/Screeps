const attack = require('attack');

const roleConquest = {

    /** @param {Creep} creep **/
    run: (creep) => {

        // if (!attack.run(creep)) {
            // reserve controler
            // if (!Game.flags['Home2'].room.controller.my) {
            //     if (creep.claimController(Game.flags['Home2'].room.controller) == ERR_NOT_IN_RANGE) {
            //         creep.moveTo(Game.flags['Home2'].room.controller);
            //     }
            // } else {
                // if (creep.memory.room == 1) {
                //     creep.moveTo(Game.flags['Room2']);
                // } else if (creep.memory.room == 2) {
                    creep.moveTo(Game.flags['Home2']);
                // }
            // }
        // }
    }
};

module.exports = roleConquest;
