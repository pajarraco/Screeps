const roleHarvester = require('role.harvester');
const roleUpgrader = require('role.upgrader');
const roleBuilder = require('role.builder');
const roleMiner = require('role.miner');
const roleTowerkeeper = require('role.towerkeeper');
const roleSoldier = require('role.soldier');
const roleConquest = require('role.conquest');
const roleExplorerminer = require('role.explorerminer');
const roleExplorer = require('role.explorer');
const roleDelivery = require('role.delivery');
const roleHarvesterMine = require('role.harvestermine');
const roleHelper = require('role.helper');
const spawnsCreation = require('spawn.creation');
const structureTower = require('structure.tower');
const structureLink = require('structure.link');
const structureTerminal = require('structure.terminal');

module.exports.loop = function() {

    for (const spawnName in Game.spawns) {
        const spawn = Game.spawns[spawnName];
        spawnsCreation.run(spawn);
    }

    for (let roomName in Game.rooms) {
        const room = Game.rooms[roomName];
        structureTower.run(room);
        structureLink.run(room);
    }

    structureTerminal.run();

    for (let name in Game.creeps) {
        const creep = Game.creeps[name];
        if (creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        } else if (creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        } else if (creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        } else if (creep.memory.role == 'miner') {
            roleMiner.run(creep);
        } else if (creep.memory.role == 'towerkeeper') {
            roleTowerkeeper.run(creep);
        } else if (creep.memory.role == 'soldier') {
            roleSoldier.run(creep);
        } else if (creep.memory.role == 'conquest') {
            roleConquest.run(creep);
        } else if (creep.memory.role == 'explorerminer') {
            roleExplorerminer.run(creep);
        } else if (creep.memory.role == 'explorer') {
            roleExplorer.run(creep);
        } else if (creep.memory.role == 'delivery') {
            roleDelivery.run(creep);
        } else if (creep.memory.role == 'harvestermine') {
            roleHarvesterMine.run(creep);
        }else if (creep.memory.role == 'helper') {
            roleHelper.run(creep);
        }

    }
}
