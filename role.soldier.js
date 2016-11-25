var roleSoldier = {

  /** @param {Creep} creep **/
  run: function(creep) {

    var closestHostile = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
    console.log('soldier creep: ' + creep + ' hostile ' + closestHostile);
    if (closestHostile) {
      Game.spawns['Spawn1'].room.controller.activateSafeMode();
      if (creep.attack(closestHostile) == ERR_NOT_IN_RANGE) {
        creep.moveTo(closestHostile);
      }
    } else {
      var move = creep.pos.lookFor(FIND_HOSTILE_CREEPS);
      console.log('move ' + move);
      // creep.moveTo(30,45);
    }
  }
};

module.exports = roleSoldier;
