var creepsCreation = {
  run : function() {

    for (var name in Memory.creeps) {
      if (!Game.creeps[name]) {
        delete Memory.creeps[name];
        // console.log('Clearing non-existing creep memory:', name);
      }
    }

    var harvesters =
        _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
    // console.log('Harvesters: ' + harvesters.length);

    if (harvesters.length < 3) {
      var n = 0;
      if (harvesters.length % 2 == 0) {
        n = 1;
      }
      var newName = Game.spawns['House1'].createCreep(
          [ WORK, WORK, WORK, WORK, CARRY, MOVE, MOVE ], undefined,
          {role : 'harvester', source : n});
      // console.log('Spawning new harvester: ' + newName);
    }

    var upgraders =
        _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
    // console.log('Upgraders: ' + upgraders.length);

    if (upgraders.length < 2) {
      var n = 0;
      if (upgraders.length % 2 == 0) {
        n = 1;
      }
      var newName = Game.spawns['House1'].createCreep(
          [ WORK, CARRY, MOVE ], undefined, {role : 'upgrader', source : n});
      // console.log('Spawning new upgrader: ' + newName);
    }

    var builders =
        _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
    // console.log('Upgraders: ' + upgraders.length);

    if (builders.length < 2) {
      var n = 0;
      if (builders.length % 2 == 0) {
        n = 1;
      }
      var newName = Game.spawns['House1'].createCreep(
          [ WORK, CARRY, MOVE ], undefined, {role : 'builder', source : n});
      // console.log('Spawning new builders: ' + newName);
    }

    /*var soldiers = _.filter(Game.creeps, (creep) => creep.memory.role ==
    'soldier');
    //console.log('soldiers: ' + soldiers.length);

    if (soldiers.length < 2) {
        var newName = Game.spawns['House1'].createCreep([TOUGH, ATTACK, ATTACK,
    MOVE, MOVE], undefined, { role: 'soldier' });
        //console.log('Spawning new soldier: ' + newName);
    }*/
  }
};

module.exports = creepsCreation;
