var structureTower = {

  /** @param  {Room} room  **/
  run: function(room) {

    var towers = room.find(FIND_MY_STRUCTURES, {filter: {structureType: STRUCTURE_TOWER}});
    if (towers.length > 0) {
      towers.forEach(function(tower) {
        var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if (closestHostile) {
          Game.spawns['Spawn1'].room.controller.activateSafeMode();
          tower.attack(closestHostile);
        } else {
          var closestDamagedStructure = tower.pos.findClosestByRange(
              FIND_STRUCTURES, {filter: (structure) => structure.hits < structure.hitsMax && structure.hits < 500000});
          if (closestDamagedStructure && tower.energy > 600) {
            tower.repair(closestDamagedStructure);
          }
        }
      });
    }
  }
};

module.exports = structureTower;
