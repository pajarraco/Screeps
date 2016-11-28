var creepsCreation = {
  run: function() {
    // clear memory
    for (var name in Memory.creeps) {
      if (!Game.creeps[name]) {
        delete Memory.creeps[name];
      }
    }
    // get creeps numbers
    var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
    var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
    var towerkeepers = _.filter(Game.creeps, (creep) => creep.memory.role == 'towerkeeper');
    var miners = _.filter(Game.creeps, (creep) => creep.memory.role == 'miner');
    var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
    var deliveries = _.filter(Game.creeps, (creep) => creep.memory.role == 'delivery');
    var mechanics = _.filter(Game.creeps, (creep) => creep.memory.role == 'mechanic');
    // creeps selection
    if (harvesters.length < 4) {
      createCreep(name, 'harvester');
    } else if (upgraders.length < 4) {
      createCreep(name, 'upgrader');
    } else if (towerkeepers.length < 4) {
      createCreep(name, 'towerkeeper');
    } else if (miners.length < 3) {
      var n = 1;
      if (miners.length > 0) {
        // if (miners[0].memory.source == 0) {
        miners.forEach(function(m) {
          if (m.memory.source == 1) {
            n = 0;
          }
        });
        //}
      }
      Game.spawns['Spawn1'].createCreep(
          [WORK, WORK, WORK, WORK, WORK, CARRY, MOVE], undefined, {role: 'miner', source: n});
    } else if (builders.length < 2) {
      createCreep(name, 'builder');
    } else if (deliveries.length < 2) {
      var newName = Game.spawns['Spawn1'].createCreep([CARRY, CARRY, MOVE, MOVE], undefined, {role: 'delivery'});
    } else if (mechanics.length < 2) {
      createCreep(name, 'mechanic');
    } else {
      var soldiers = _.filter(Game.creeps, (creep) => creep.memory.role == 'soldier');
      if (soldiers.length < 5) {
        Game.spawns['Spawn1'].createCreep([TOUGH, ATTACK, ATTACK, ATTACK, ATTACK, MOVE], undefined, {role: 'soldier'});
      }
    }
  }
};

var createCreep = function(name, role) {
  // calculate source
  var n = 0, creepsSize = _.map(Game.creeps);
  if (creepsSize.length > 0) {
    n = creepsSize[creepsSize.length - 1].memory.source == 0 ? 1 : 0;
  }
  Game.spawns['Spawn1'].createCreep([WORK, WORK, CARRY, MOVE], undefined, {role: role, source: n});
};

module.exports = creepsCreation;
