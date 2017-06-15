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

        } else {
            const storage = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                filter: (s) => s.structureType == STRUCTURE_STORAGE
            });
            if (storage) {
                _.each(storage.store, (resource, key) => {
                    console.log(resource, key);
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
