var towerActivity = {

  run: function() {

    var tower = Game.getObjectById('5837ad49f4ec434d64dc5214');
    if (tower) {
      var closestDamagedStructure =
          tower.pos.findClosestByRange(FIND_STRUCTURES, {filter: (structure) => structure.hits < structure.hitsMax});
      if (closestDamagedStructure) {
        tower.repair(closestDamagedStructure);
      }
      var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
      if (closestHostile) {
        Game.spawns['Spawn1'].room.controller.activateSafeMode();
        tower.attack(closestHostile);
      }
    }
  }
};

module.exports = towerActivity;
