const attack = require('attack');

const harvestSource = function(creep) {
    // var source = creep.pos.findClosestByRange(FIND_SOURCES);
    const sources = creep.room.find(FIND_SOURCES);
    let i = /*0; */ creep.memory.source;
    if (creep.harvest(sources[i]) == ERR_NOT_IN_RANGE) {
        creep.moveTo(sources[i]);
    }
    const containers = creep.pos.findInRange(FIND_STRUCTURES, 1, {
        filter: {
            structureType: STRUCTURE_CONTAINER
        }
    });
    if (containers.length > 0) {
        creep.moveTo(containers[0]);
    }
};

const roleExplorerminer = {

    /** @param {Creep} creep **/
    run: function(creep) {

        if (!attack.run(creep)) {
            // movet to room
            if (creep.memory.room == 1) {
                if (creep.pos.roomName == Game.flags['Room1'].pos.roomName) {
                    harvestSource(creep);
                } else {
                    creep.moveTo(Game.flags['Room1']);
                }
            } else if (creep.memory.room == 2) {
                if (creep.pos.roomName == Game.flags['Room2'].pos.roomName) {
                    harvestSource(creep);
                } else {
                    creep.moveTo(Game.flags['Room2']);
                }
            }else if (creep.memory.room == 3) {
                if (creep.pos.roomName == Game.flags['Home2'].pos.roomName) {
                    harvestSource(creep);
                } else {
                    creep.moveTo(Game.flags['Home2']);
                }
            }
        }
    }
};

module.exports = roleExplorerminer;
