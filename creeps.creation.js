var creepsCreation = {
  run: function() {
    // clear memory
    for (var name in Memory.creeps) {
      if (!Game.creeps[name]) {
        delete Memory.creeps[name];
        // console.log('Clearing non-existing creep memory:', name);
      }
    }
    // get creeps numbers
    var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
    var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
    var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
    var mechanics = _.filter(Game.creeps, (creep) => creep.memory.role == 'mechanic');
    var miners = _.filter(Game.creeps, (creep) => creep.memory.role == 'miner');
    // creeps selection
    if (harvesters.length < 5) {
      createCreep(name, 'harvester');
    } else if (upgraders.length < 2) {
      createCreep(name, 'upgrader');
    } else if (builders.length < 5) {
      createCreep(name, 'builder');
    } else if (mechanics.length < 2) {
      createCreep(name, 'mechanic');
    } else if (miners.length < 2) {
      var n = 0;
      if (miners.length > 0) {
        if (miners[0].memory.source == 0) {
          n = 1;
        }
      }
      var newName = Game.spawns['Spawn1'].createCreep(
          [WORK, WORK, WORK, WORK, CARRY, MOVE], undefined, {role: 'miner', source: n});
    } else {
      var soldiers = _.filter(Game.creeps, (creep) => creep.memory.role == 'soldier');
      if (soldiers.length < 5) {
        var newName =
            Game.spawns['Spawn1'].createCreep([TOUGH, ATTACK, ATTACK, ATTACK, MOVE], undefined, {role: 'soldier'});
        // console.log('Spawning new soldier: ' + newName);
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
  //    [ WORK, WORK, WORK, WORK, CARRY, MOVE, MOVE ]
  var newName = Game.spawns['Spawn1'].createCreep([WORK, CARRY, MOVE], undefined, {role: role, source: n});
  // console.log('Spawning new harvester: ' + newName);
};

module.exports = creepsCreation;
