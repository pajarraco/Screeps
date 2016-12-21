var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleMiner = require('role.miner');
var roleTowerkeeper = require('role.towerkeeper');
// var roleDelivery = require('role.delivery');
// var roleSoldier = require('role.soldier');
// var roleConquest = require('role.conquest');
// var roleExplorer = require('role.explorer');
var spawnsCreation = require('spawn.creation');
var structureTower = require('structure.tower');
var structureLink = require('structure.link');

module.exports.loop = function() {

  for (var spawnName in Game.spawns) {
    var spawn = Game.spawns[spawnName];
    spawnsCreation.run(spawn);
  }

  for (var roomName in Game.rooms) {
    var room = Game.rooms[roomName];
    structureTower.run(room);
    structureLink.run(room);
  }

  for (var name in Game.creeps) {
    var creep = Game.creeps[name];
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
    } /*else if (creep.memory.role == 'delivery') {
       roleDelivery.run(creep);
    } else if (creep.memory.role == 'soldier') {
      roleSoldier.run(creep);
    } else if (creep.memory.role == 'conquest') {
      roleConquest.run(creep);
    } else if (creep.memory.role == 'explorer') {
      roleExplorer.run(creep);
    }*/
  }
}
