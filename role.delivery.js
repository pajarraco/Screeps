const roleDelivery = {

    /** @param {Creep} creep **/
    run: function(creep) {

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
            const resource = _.filter(creep.carry, (resource, key) => key !== 'energy');
            if (resource.length > 0) {
                const storage = Game.flags['Home'].room.find(
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
            } else {
                // deposit
                var links = creep.pos.findInRange(FIND_STRUCTURES, 3, {
                    filter: {
                        structureType: STRUCTURE_LINK
                    }
                });
                if (links.length > 0) {
                    if (creep.transfer(links[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(links[0]);
                    }
                } else {
                    var depositTargets = Game.flags['Home'].room.find(
                        FIND_STRUCTURES, {
                            filter: (s) => s.structureType == STRUCTURE_STORAGE && s.store[RESOURCE_ENERGY] < s.storeCapacity
                        });
                    if (depositTargets.length > 0) {
                        if (creep.transfer(depositTargets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(depositTargets[0]);
                        }
                    }


			          }
            }
        } else {
            if (creep.memory.room == 1) {
                if (creep.pos.roomName == Game.flags['Home2'].pos.roomName) {
                    harvestStorage(creep);
                } else {
                    creep.moveTo(Game.flags['Home2']);
                }
            } else if (creep.memory.room == 2) {
                if (creep.pos.roomName == Game.flags['Home2'].pos.roomName) {
                    harvestStorage(creep);
                } else {
                    creep.moveTo(Game.flags['Home2']);
                }
            } else if (creep.memory.room == 3) {
                if (creep.pos.roomName == Game.flags['Home2'].pos.roomName) {
                    harvestStorage(creep);
                } else {
                    creep.moveTo(Game.flags['Home2']);
                }
            }
        }
    }

};

const harvestStorage(creep){
	
			var container = creep.pos.findClosestByRange(
					FIND_STRUCTURES, {
							filter: (s) => s.structureType == STRUCTURE_STORAGE && s.store[RESOURCE_ENERGY] > 100
					});
			if (container) {
					if (creep.withdraw(container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
							creep.moveTo(container);
					}
			}
	}
}

module.exports = roleDelivery;
