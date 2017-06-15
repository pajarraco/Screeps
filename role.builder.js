const roleHarvester = require('role.harvester');
const harvest = require('harvest');
const harvestDrop = require('harvest.drop');
const harvestContainer = require('harvest.container');
const harvestStorage = require('harvest.storage');
const harvestLink = require('harvest.link');
const harvestSource = require('harvest.source');
const harvestTerminal = require('harvest.terminal');

var roleBuilder = {

    /** @param {Creep} creep **/
    run: function(creep) {

        if (creep.memory.building && creep.carry.energy == 0) {
            creep.memory.building = false;
            creep.say('harvesting');
        }
        if (!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
            creep.memory.building = true;
            creep.say('building');
        }

        if (creep.memory.building) {
            creep.memory.htarget = '';
            var targets = creep.pos.findClosestByRange(FIND_CONSTRUCTION_SITES);
            if (targets) {
                if (creep.build(targets) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets);
                }
            } else {
                var closestDamagedStructure =
                    creep.pos.findClosestByRange(FIND_STRUCTURES, {
                        filter: (s) => s.hits < s.hitsMax && s.hits < 3000
                    });
                if (closestDamagedStructure) {
                    if (creep.repair(closestDamagedStructure) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(closestDamagedStructure);
                    }
                } else {
                    roleHarvester.run(creep);
                }
            }
        } else {
            if (!creep.memory.htarget) {
                if (!harvestStorage.run(creep, 100)) {
                    if (!harvestDrop.run(creep)) {
                        if (!harvestContainer.run(creep, 300)) {
                            if (!harvestLink.run(creep, 100)) {
                                if (!harvestTerminal.run(creep)) {
                                    // harvestSource.run(creep);
                                }
                            }
                        }
                    }
                }
            }
            harvest.run(creep);
        }
    }
};

module.exports = roleBuilder;
