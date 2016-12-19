var structureTower = {

  /** @param  {Room} room  **/
  run: function(room) {

    var towers = room.find(FIND_MY_STRUCTURES, {filter: {structureType: STRUCTURE_TOWER}});
    if (towers.length > 0) {
      towers.forEach(function(tower) {
        var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if (closestHostile) {
          // Game.spawns['Spawn1'].room.controller.activateSafeMode();
          tower.attack(closestHostile);
        } else {
          var closestDamagedStructures =
              tower.room.find(FIND_STRUCTURES, {filter: (structure) => structure.hits < structure.hitsMax});
          var minHits = 100000000;
          var minDamagedStructure;
          closestDamagedStructures.forEach(function(s) {
            if (s.hits < minHits) {
              minHits = s.hits;
              minDamagedStructure = s;
            }
          });

          if (minDamagedStructure && tower.energy > 600) {
            tower.repair(minDamagedStructure);
          }
        }
      });
    }
  }
};

module.exports = structureTower;
