const attack = require('attack');

const roleSoldier = {

    /** @param {Creep} creep **/
    run: (creep) => {
        if (!attack.run(creep)) {
            // move to flag
            // if (creep.memory.source == 0) {
            //     creep.moveTo(Game.flags['Home']);
            // } else if (creep.memory.source == 1) {
            //     creep.moveTo(Game.flags['Home']);
            // }
        }
    }
};

module.exports = roleSoldier;
