const attack = require('attack');

const roleSoldier = {

    /** @param {Creep} creep **/
    run: (creep) => {
        if (!attack.run(creep)) {
            // move to flag
            if (creep.memory.source == 0) {
                creep.moveTo(Game.flags['Room3']);
            } else if (creep.memory.source == 1) {
                creep.moveTo(Game.flags['Room3']);
            }
        }
    }
};

module.exports = roleSoldier;
