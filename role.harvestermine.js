const roleHarvesterMine = {

    /** @param {Creep} creep **/
    run: function(creep) {

        let sum = _.sum(creep.carry);
        if (creep.memory.transferring && sum == 0) {
            creep.memory.transferring = false;
            creep.memory.storage = false;
            creep.say('harvesting');
        }
        if (!creep.memory.transferring && sum == creep.carryCapacity) {
            creep.memory.transferring = true;
            creep.memory.storage = false;
            creep.say('transferring');
        }

        if (creep.memory.transferring) {
            const resource = _.filter(creep.carry, (resource, key) => key !== 'energy');
            if (resource.length > 0) {
                if (!creep.memory.storage) {
                    const labs = creep.room.find(
                        FIND_STRUCTURES, {
                            filter: (s) => s.structureType == STRUCTURE_LAB
                        });
                    if (labs.length > 0) {
                        _.each(creep.carry, (resource, key) => {
                            let tansfer = creep.transfer(labs[0], key);
                            console.log(tansfer);
                            if (tansfer == ERR_NOT_IN_RANGE) {
                                creep.moveTo(labs[0]);
                            } else if (tansfer == ERR_FULL) {
                                console.log('full');
                                creep.memory.storage = true;
                            }
                        });
                    }
                } else {
                    const storage = creep.room.find(
                        FIND_STRUCTURES, {
                            filter: (s) => s.structureType == STRUCTURE_STORAGE
                        });
                    if (storage.length > 0) {
                        _.each(creep.carry, (resource, key) => {
                            if (creep.transfer(storage[0], key) == ERR_NOT_IN_RANGE) {
                                creep.moveTo(storage[0]);
                            }
                        });
                    }
                }
            }
        } else {
            const sources = creep.room.find(FIND_MINERALS);
            let i = 0; // creep.memory.source;
            if (creep.harvest(sources[i]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[i]);
            }
        }
    }
};

module.exports = roleHarvesterMine;
