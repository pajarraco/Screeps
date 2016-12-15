var roleTowerkeeper = require('role.towerkeeper');

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
          var target = creep.pos.findClosestByRange(FIND_CONSTRUCTION_SITES);
          if (target) {
            if (creep.build(target) == ERR_NOT_IN_RANGE) {
              creep.moveTo(target);
            }
          } else {
            var depositTargets = Game.rooms['E37S69'].find(
                FIND_STRUCTURES,
                {filter: (s) => s.structureType == STRUCTURE_STORAGE && s.store[RESOURCE_ENERGY] < s.storeCapacity});
            if (depositTargets.length > 0) {
              if (creep.transfer(depositTargets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(depositTargets[0]);
              }
            } else {
              var otherTargets = Game.rooms['E37S69'].find(FIND_STRUCTURES, {
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
        } else {
          if (creep.memory.source == 0) {
            if (creep.pos.roomName == Game.flags['LeftRoom'].pos.roomName) {
              var source = creep.pos.findClosestByRange(FIND_SOURCES);
              if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                creep.moveTo(source);
              }
            } else {
              creep.moveTo(Game.flags['LeftRoom']);
            }
          } else if (creep.memory.source == 1) {
            if (creep.pos.roomName == Game.flags['LeftRoom2'].pos.roomName) {
              var source = creep.pos.findClosestByRange(FIND_SOURCES);
              if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                creep.moveTo(source);
              }
            } else {
              creep.moveTo(Game.flags['LeftRoom2']);
            }
          } else {
            if (creep.pos.roomName == Game.flags['TopRoom'].pos.roomName) {
              var source = creep.pos.findClosestByRange(FIND_SOURCES);
              if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                creep.moveTo(source);
              }
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
