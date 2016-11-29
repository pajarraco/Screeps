var roleExplorer = {

  /** @param {Creep} creep **/
  run: function(creep) {

    if (creep.carry.energy < creep.carryCapacity) {
      if (creep.pos.roomName == Game.flags['LeftRoom'].pos.roomName) {
        var source = creep.pos.findClosestByRange(FIND_SOURCES);
        if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
          creep.moveTo(source);
        }
      } else {
        creep.moveTo(Game.flags['LeftRoom']);
      }
    } else {
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
          roleTowerkeeper.run(creep);
        }
      }
    }
  }
};

module.exports = roleExplorer;
