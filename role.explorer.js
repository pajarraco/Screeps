var roleTowerkeeper = require('role.towerkeeper');

var harvestContainer = function(creep) {
  var target = creep.pos.findClosestByRange(FIND_DROPPED_ENERGY);
  if (target) {
    if (creep.pickup(target) == ERR_NOT_IN_RANGE) {
      creep.moveTo(target);
    }
  } else {
    var container =
        creep.pos.findClosestByRange(FIND_STRUCTURES, {filter: (s) => s.structureType == STRUCTURE_CONTAINER});
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
  var source = creep.pos.findClosestByRange(FIND_SOURCES);
  if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
    creep.moveTo(source);
  }
};

var roleExplorer = {

  /** @param {Creep} creep **/
  run: function(creep) {

    // attack hostile
    var closestHostile = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
    if (closestHostile) {
      if (creep.attack(closestHostile) == ERR_NOT_IN_RANGE) {
        creep.moveTo(closestHostile);
      }
    } else {
      // attack hostile structure
      var closestHostileStructures = creep.pos.findClosestByRange(FIND_HOSTILE_STRUCTURES);
      if (closestHostileStructures) {
        if (creep.attack(closestHostileStructures) == ERR_NOT_IN_RANGE) {
          creep.moveTo(closestHostileStructures);
        }
      } else {
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
            var closestDamagedStructure =
                creep.pos.findClosestByRange(FIND_STRUCTURES, {filter: (s) => s.hits < s.hitsMax && s.hits < 2000});
            if (closestDamagedStructure) {
              if (creep.repair(closestDamagedStructure) == ERR_NOT_IN_RANGE) {
                creep.moveTo(closestDamagedStructure);
              }
            } else {
              // deposit
              var depositTargets = Game.flags['Home2'].room.find(
                  FIND_STRUCTURES,
                  {filter: (s) => s.structureType == STRUCTURE_STORAGE && s.store[RESOURCE_ENERGY] < s.storeCapacity});
              if (depositTargets.length > 0) {
                if (creep.transfer(depositTargets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                  creep.moveTo(depositTargets[0]);
                }
              } else {
                var otherTargets = Game.flags['Home2'].room.find(FIND_STRUCTURES, {
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
                  roleTowerkeeper.run(creep);
                }
              }
            }
          }
        } else {
          if (creep.memory.source == 0) {
            if (creep.pos.roomName == Game.flags['LeftRoom'].pos.roomName) {
              harvestContainer(creep);
            } else {
              creep.moveTo(Game.flags['LeftRoom']);
            }
          } else if (creep.memory.source == 1) {
            if (creep.pos.roomName == Game.flags['TopRoom'].pos.roomName) {
              harvestContainer(creep);
            } else {
              creep.moveTo(Game.flags['TopRoom']);
            }
          }
        }
      }
    }
  }
};

module.exports = roleExplorer;
