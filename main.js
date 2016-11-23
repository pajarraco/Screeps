var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleSoldier = require('role.soldier');
var roleMechanic = require('role.mechanic');
var creepsCreation = require('creeps.creation');

module.exports.loop = function() {

  // var tower = Game.getObjectById('a7aeb58f7595cf9dc437f700');

  /*if (tower) {
      var closestDamagedStructure =
  tower.pos.findClosestByRange(FIND_STRUCTURES, {
          filter: (structure) => structure.hits < structure.hitsMax
      });
      if (closestDamagedStructure) {
          tower.repair(closestDamagedStructure);
      }

      var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
      if (closestHostile) {
          tower.attack(closestHostile);
      }
  }*/

  creepsCreation.run();

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
    /* if (creep.memory.role == 'soldier') {
         roleSoldier.run(creep);
     }*/
    if (creep.memory.role == 'mechanic') {
      roleMechanic.run(creep);
    }
  }
}
