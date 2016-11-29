var repairing = function(creep) {
  var closestDamagedStructure =
      creep.pos.findClosestByRange(FIND_STRUCTURES, {filter: (s) => s.hits < s.hitsMax && s.hits < 5000});
  if (closestDamagedStructure) {
    if (creep.repair(closestDamagedStructure) == ERR_NOT_IN_RANGE) {
      creep.moveTo(closestDamagedStructure);
    }
    return true;
  } else {
    return false;
  }
};

var roleMechanic = {

  /** @param {Creep} creep **/
  run: function(creep) {

    if (creep.memory.repairing && creep.carry.energy == 0) {
      creep.memory.repairing = false;
      creep.say('harvesting');
    }
    if (!creep.memory.repairing && creep.carry.energy == creep.carryCapacity) {
      creep.memory.repairing = true;
      creep.say('repairing');
    }

    if (creep.memory.repairing) {
      if (!repairing(creep)) {
        if (creep.pos.roomName == Game.flags['LeftRoom'].pos.roomName) {
          repairing(creep)
        } else {
          creep.moveTo(Game.flags['LeftRoom']);
        }
      }
    } else {
      var containers = creep.pos.findClosestByRange(
          FIND_STRUCTURES, {filter: (s) => s.structureType == STRUCTURE_CONTAINER && s.store[RESOURCE_ENERGY] > 0});
      if (containers) {
        if (creep.withdraw(containers, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
          creep.moveTo(containers);
        }
      } else {
        var sources = creep.room.find(FIND_SOURCES);
        var i = creep.memory.source;
        if (creep.harvest(sources[i]) == ERR_NOT_IN_RANGE) {
          creep.moveTo(sources[i]);
        }
      }
    }
  }
};

module.exports = roleMechanic;
