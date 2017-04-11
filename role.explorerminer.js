var harvestSource = function(creep) {
  // var source = creep.pos.findClosestByRange(FIND_SOURCES);
  var sources = creep.room.find(FIND_SOURCES);
  var i = /*0; */ creep.memory.source;
  if (i == 2) {
    i = 0;
  }
  if (creep.harvest(sources[i]) == ERR_NOT_IN_RANGE) {
    creep.moveTo(sources[i]);
  }
  var containers = creep.pos.findInRange(FIND_STRUCTURES, 1, {filter: {structureType: STRUCTURE_CONTAINER}});
  if (containers.length > 0) {
    creep.moveTo(containers[0]);
  }
};

var roleExplorerminer = {

  /** @param {Creep} creep **/
  run: function(creep) {

    // attack hostile
    var closestHostile = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
    if (closestHostile) {
      if (creep.rangedAttack(closestHostile) == ERR_NOT_IN_RANGE) {
        creep.moveTo(closestHostile);
      }
    } else {
      // attack hostile structure
      var closestHostileStructures = creep.pos.findClosestByRange(FIND_HOSTILE_STRUCTURES);
      if (closestHostileStructures) {
        if (creep.rangedAttack(closestHostileStructures) == ERR_NOT_IN_RANGE) {
          creep.moveTo(closestHostileStructures);
        }
      } else {
        if (creep.memory.source == 0 || creep.memory.source == 1) {
          if (creep.pos.roomName == Game.flags['TopRoom'].pos.roomName) {
            harvestSource(creep);
          } else {
            creep.moveTo(Game.flags['TopRoom']);
          }
        } else if (creep.memory.source == 2) {
          if (creep.pos.roomName == Game.flags['TopRoom'].pos.roomName) {
            harvestSource(creep);
          } else {
            creep.moveTo(Game.flags['TopRoom']);
          }
        }
      }
    }
  }
};

module.exports = roleExplorerminer;
