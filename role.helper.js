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
                        const terminal = creep.room.find(
                            FIND_STRUCTURES, {
                                filter: (s) => s.structureType == STRUCTURE_TERMINAL
                            });
                        if (terminal.length > 0) {
                            if (creep.transfer(terminal[0], key) == ERR_NOT_IN_RANGE) {
                                creep.moveTo(terminal[0]);
                            }
                        }
                    } else {
                        let transfer = creep.transfer(labs[1], key);
                        if (transfer == ERR_NOT_IN_RANGE) {
                            creep.moveTo(labs[1]);
                        } else if (transfer == ERR_FULL) {
                            transfer = creep.transfer(labs[0], key);
                            if (transfer == ERR_NOT_IN_RANGE) {
                                creep.moveTo(labs[0]);
                            } else if (transfer == ERR_FULL) {
                                transfer = creep.transfer(labs[2], key);
                                if (transfer == ERR_NOT_IN_RANGE) {
                                    creep.moveTo(labs[2]);
                                } else {

                                }
                            }
                        }
                    }
                });
            }
        } else {

            const labs = creep.room.find(
                FIND_STRUCTURES, {
                    filter: (s) => s.structureType == STRUCTURE_LAB
                });
            if (creep.withdraw(labs[2], 'GO') == ERR_NOT_IN_RANGE) {
                creep.moveTo(labs[2]);
            }
            console.log('get go', creep.withdraw(labs[2], 'GO'));
            creep.drop('GO');

            // const storage = creep.pos.findClosestByRange(FIND_STRUCTURES, {
            //     filter: (s) => s.structureType == STRUCTURE_STORAGE
            // });
            // if (storage) {
            //     _.each(storage.store, (resource, key) => {
            //         // console.log(resource, key);
            //         if (key === 'energy') {
            //             if (creep.withdraw(storage, key)) {
            //                 creep.moveTo(storage);
            //             }
            //         }
            //     });
            // }
        }
    }
};

module.exports = roleHelper;
