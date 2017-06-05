const roleUpgrader = require('role.upgrader');
const harvest = require('harvest');
const harvestDrop = require('harvest.drop');
const harvestContainer = require('harvest.container');
const harvestStorage = require('harvest.storage');
const harvestLink = require('harvest.link');
const harvestSource = require('harvest.source');

var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {

        var depositTargets = creep.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (s) => {
                return (
                    (s.structureType == STRUCTURE_EXTENSION || s.structureType == STRUCTURE_SPAWN) &&
                    s.energy < s.energyCapacity);
            }
        });

        if (creep.memory.transferring && creep.carry.energy == 0) {
            creep.memory.transferring = false;
            creep.say('harvesting');
        }
        if (!creep.memory.transferring && creep.carry.energy == creep.carryCapacity) {
            creep.memory.transferring = true;
            creep.say('transferring');
        }

        if (creep.memory.transferring) {
            creep.memory.htarget = '';
            if (depositTargets) {
                if (creep.transfer(depositTargets, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(depositTargets);
                }
            } else {
                if (creep.memory.role == 'harvester') {
                    var storages =
                        creep.pos.findClosestByRange(FIND_STRUCTURES, {
                            filter: (s) => s.structureType == STRUCTURE_STORAGE
                        });
                    if (creep.transfer(storages, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(storages);
                    } else {
                        creep.moveTo(creep.pos.findClosestByRange(FIND_STRUCTURES, {
                            filter: (s) => s.structureType == STRUCTURE_SPAWN
                        }));
                    }
                } else {
                    roleUpgrader.run(creep);
                }
            }
        } else {
            if (!creep.memory.htarget) {
                if (!harvestLink.run(creep, 600)) {
                    if (depositTargets) {
                        if (!harvestStorage.run(creep, 500)) {
                            if (!harvestDrop.run(creep)) {
                                if (!harvestContainer.run(creep, 100)) {
                                    harvestSource.run(creep);
                                }
                            }
                        }
                    } else {
                        if (!harvestDrop.run(creep)) {
                            if (!harvestContainer.run(creep, 100)) {
                                harvestSource.run(creep);
                            }
                        }
                    }
                }
            }
            harvest.run(creep);
        }
    }
};

module.exports = roleHarvester;
