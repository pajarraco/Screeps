const harvestSource = {

    /** @param {Creep} creep **/
    run: (creep) => {

        creep.memory.htarget = 'xxxxx';
        const sources = creep.room.find(FIND_SOURCES);
        let i = creep.memory.source;
        const harvest = creep.harvest(sources[i]);
        if (harvest == ERR_NOT_IN_RANGE) {
            creep.moveTo(sources[i]);
        } else if (harvest < 0) {
            i = i == 0 ? 1 : 0;
            if (creep.harvest(sources[i]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[i]);
            }
        }
    }
};

module.exports = harvestSource;
