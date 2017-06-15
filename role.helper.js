const roleHelper = {

    /** @param {Creep} creep **/
    run: (creep) => {

        let sum = _.sum(creep.carry);
        if (creep.memory.transferring && sum == 0) {
            creep.memory.transferring = false;
            creep.say('harvesting');
        }
        if (!creep.memory.transferring && sum == creep.carryCapacity) {
            creep.memory.transferring = true;
            creep.say('transferring');
        }

        if (creep.memory.transferring) {
            const labs = creep.room.find(
                FIND_STRUCTURES, {
                    filter: (s) => s.structureType == STRUCTURE_LAB
                });
            if (labs.length > 0) {
                _.each(creep.carry, (resource, key) => {
                    if (key === 'O') {
                        const storage = creep.room.find(
                            FIND_STRUCTURES, {
                                filter: (s) => s.structureType == STRUCTURE_TERMINAL
                            });
                        if (storage.length > 0) {
                            if (creep.transfer(storage[0], key) == ERR_NOT_IN_RANGE) {
                                creep.moveTo(storage[0]);
                            }
                        }
                    } else {
                        let tansfer = creep.transfer(labs[2], key);
                        if (tansfer == ERR_NOT_IN_RANGE) {
                            creep.moveTo(labs[2]);
                        }
                    }
                });
            }
        } else {
            const storage = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                filter: (s) => s.structureType == STRUCTURE_STORAGE
            });
            if (storage) {
                _.each(storage.store, (resource, key) => {
                    // console.log(resource, key);
                    if (key !== 'energy') {
                        if (creep.withdraw(storage, key)) {
                            creep.moveTo(storage);
                        }
                    }
                });
            }
        }
    }
};

module.exports = roleHelper;
