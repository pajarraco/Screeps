var towerActivity = {

  run: function() {

    var tower = Game.getObjectById('5837ad49f4ec434d64dc5214');
    if (tower) {
      var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
      if (closestHostile) {
        Game.spawns['Spawn1'].room.controller.activateSafeMode();
        tower.attack(closestHostile);
      } else {
        var closestDamagedStructure = tower.pos.findClosestByRange(
            FIND_STRUCTURES, {filter: (structure) => structure.hits < structure.hitsMax && structure.hits < 250000});
        if (closestDamagedStructure && tower.energy > 500) {
          tower.repair(closestDamagedStructure);
        }
      }
    }
  }
};

module.exports = towerActivity;
