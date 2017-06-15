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
            const terminal = creep.room.find(
                FIND_STRUCTURES, {
                    filter: (s) => s.structureType == STRUCTURE_TERMINAL
                });
            if (labs.length > 0) {
                _.each(creep.carry, (resource, key) => {
                    if (key === 'O') {
                        if (terminal.length > 0) {
                            if (creep.transfer(terminal[0], key) == ERR_NOT_IN_RANGE) {
                                creep.moveTo(terminal[0]);
                            }
                        }
                    } else {
                        const myLab = _.min(labs, (lab) => {

                            console.log(lab);
                        })
                        console.log('labs', labs);
                        console.log('mylabs', myLab);
                        let transfer = creep.transfer(myLab, key);
                        if (transfer == ERR_NOT_IN_RANGE) {
                            creep.moveTo(myLab);
                        } else if (transfer == ERR_FULL) {
                            if (terminal.length > 0) {
                                if (creep.transfer(terminal[0], key)) {
                                    creep.moveTo(terminal[0]);
                                }
                            }

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
                    if (key === 'energy') {
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
