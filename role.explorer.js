const roleTowerkeeper = require('role.towerkeeper');
const attack = require('attack');
const harvestSource = require('harvest.source');

var harvestContainer = function(creep) {
    var target = creep.pos.findClosestByRange(FIND_DROPPED_ENERGY);
    if (target) {
        if (creep.pickup(target) == ERR_NOT_IN_RANGE) {
            creep.moveTo(target);
        }
    } else {
        var container = creep.pos.findClosestByRange(
            FIND_STRUCTURES, {
                filter: (s) => s.structureType == STRUCTURE_CONTAINER && s.store[RESOURCE_ENERGY] > 100
            });
        if (container) {
            if (creep.withdraw(container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(container);
            }
        } else {
            harvestSource.run(creep);
        }
    }
};

var roleExplorer = {

    /** @param {Creep} creep **/
    run: function(creep) {

        if (!attack.run(creep)) {
            // find resources
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
                var contructionSite = creep.pos.findClosestByRange(FIND_CONSTRUCTION_SITES);
                if (contructionSite) {
                    if (creep.build(contructionSite) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(contructionSite);
                    }
                } else {
                    if (creep.memory.role2 === 'mechanic') {
                        var closestDamagedStructure =
                            creep.pos.findClosestByRange(FIND_STRUCTURES, {
                                filter: (s) => s.hits < s.hitsMax && s.hits < 1000
                            });
                    }
                    if (closestDamagedStructure) {
                        if (creep.repair(closestDamagedStructure) == ERR_NOT_IN_RANGE) {
                            // creep.moveTo(closestDamagedStructure);
                        }
                    }
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
                            } else {
                                var otherTargets = Game.flags['Home'].room.find(FIND_STRUCTURES, {
                                    filter: (s) => {
                                        return (
                                            (s.structureType == STRUCTURE_EXTENSION || s.structureType == STRUCTURE_SPAWN) &&
                                            s.energy < s.energyCapacity);
                                    }
                                });
                                if (otherTargets.length > 0) {
                                    if (creep.transfer(otherTargets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                                        creep.moveTo(otherTargets[0]);
                                    }
                                } else {
                                    var containers = Game.flags['Home'].room.find(FIND_STRUCTURES, {
                                        filter: (s) => s.structureType == STRUCTURE_CONTAINER

                                    });
                                    if (containers.length > 0) {
                                        if (creep.transfer(containers[4], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                                            creep.moveTo(containers[4]);
                                        }
                                    } else {
                                        roleTowerkeeper.run(creep);
                                    }
                                }
                            }
                        }
                    }
                }
            } else {
                if (creep.memory.room == 1) {
                    if (creep.pos.roomName == Game.flags['Room1'].pos.roomName) {
                        harvestContainer(creep);
                    } else {
                        creep.moveTo(Game.flags['Room1']);
                    }
                } else if (creep.memory.room == 2) {
                    if (creep.pos.roomName == Game.flags['Room2'].pos.roomName) {
                        harvestContainer(creep);
                    } else {
                        creep.moveTo(Game.flags['Room2']);
                    }
                } else if (creep.memory.room == 3) {
                    if (creep.pos.roomName == Game.flags['Home3'].pos.roomName) {
                        harvestContainer(creep);
                    } else {
                        creep.moveTo(Game.flags['Home4']);
                    }
                }
            }
        }
    }
};

module.exports = roleExplorer;
