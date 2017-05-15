const harvest = require('harvest');
const harvestContainer = require('harvest.container');
const harvestStorage = require('harvest.storage');
const harvestLink = require('harvest.link');
const harvestSource = require('harvest.source');
const harvestDrop = require('harvest.drop');

const roleUpgrader = {

    /** @param {Creep} creep **/
    run: (creep) => {

        if (creep.memory.upgrading && creep.carry.energy == 0) {
            creep.memory.upgrading = false;
            creep.say('harvesting');
        }
        if (!creep.memory.upgrading && creep.carry.energy == creep.carryCapacity) {
            creep.memory.upgrading = true;
            creep.say('upgrading');
        }

        if (creep.memory.upgrading) {
            creep.memory.htarget = '';
            if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                if (creep.room.name === 'E19N94') {
                    creep.moveTo(28, 23);
                } else {
                    creep.moveTo(creep.room.controller);
                }
            }
        } else {
            if (!creep.memory.htarget) {
                if (!harvestStorage.run(creep, 10)) {
                    if (!harvestContainer.run(creep, 10)) {
                        harvestLink.run(creep, 500);
                        // if (!harvestDrop.run(creep)) {
                        // harvestSource.run(creep);
                        // }
                    }
                }
            }
            harvest.run(creep);
        }
    }
};

module.exports = roleUpgrader;
