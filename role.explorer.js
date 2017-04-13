const roleTowerkeeper = require('role.towerkeeper');
const attack = require('attack');

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
            harvestSource(creep);
        }
    }
};

var harvestSource = function(creep) {
    // var source = creep.pos.findClosestByRange(FIND_SOURCES);
    var sources = creep.room.find(FIND_SOURCES);
    var i = /*0; */ creep.memory.source;
    if (creep.harvest(sources[i]) == ERR_NOT_IN_RANGE) {
        creep.moveTo(sources[i]);
    }
};

var roleExplorer = {

    /** @param {Creep} creep **/
    run: function(creep) {

        // if (!attack.run(creep)) {
        // find resources
        if (creep.memory.transferring && creep.carry.energy == 0) {
            creep.memory.transferring = false;
            creep.say('harvesting');
        }
        if (!creep.memory.transferring && creep.carry.energy == creep.carryCapacity) {
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
                // deposit
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
                            filter: {
                                (s) => s.structureType == STRUCTURE_CONTAINER
                            }
                        });
                        if (containers.length > 0) {
                            if (creep.transfer(containers[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                                creep.moveTo(containers[0]);
                            }
                        } else {
                            roleTowerkeeper.run(creep);
                        }
                    }
                }
            }
        } else {
            if (creep.memory.source == 0) {
                if (creep.pos.roomName == Game.flags['Room1'].pos.roomName) {
                    harvestContainer(creep);
                } else {
                    creep.moveTo(Game.flags['Room1']);
                }
            } else if (creep.memory.source == 1) {
                if (creep.pos.roomName == Game.flags['Room1'].pos.roomName) {
                    harvestContainer(creep);
                } else {
                    creep.moveTo(Game.flags['Room1']);
                }
            }
        }
        // }
    }
};

module.exports = roleExplorer;
