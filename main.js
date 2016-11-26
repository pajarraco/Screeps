var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleMechanic = require('role.mechanic');
var roleMiner = require('role.miner');
var roleDelivery = require('role.delivery');
var roleSoldier = require('role.soldier');
var roleTowerkeeper = require('role.towerkeeper');
var creepsCreation = require('creeps.creation');
var towerActivity = require('tower.activity');

module.exports.loop = function() {

  creepsCreation.run();

  towerActivity.run();

  for (var name in Game.creeps) {
    var creep = Game.creeps[name];
    if (creep.memory.role == 'harvester') {
      roleHarvester.run(creep);
    }
    if (creep.memory.role == 'upgrader') {
      roleUpgrader.run(creep);
    }
    if (creep.memory.role == 'builder') {
      roleBuilder.run(creep);
    }
    if (creep.memory.role == 'mechanic') {
      roleMechanic.run(creep);
    }
    if (creep.memory.role == 'miner') {
      roleMiner.run(creep);
    }
    if (creep.memory.role == 'delivery') {
      roleDelivery.run(creep);
    }
    if (creep.memory.role == 'soldier') {
      roleSoldier.run(creep);
    }
    if (creep.memory.role == 'towerkeeper') {
      roelTowerkeeper.run(creep);
    }
  }
}
