var createCreep = function(name, role, creeps) {
  var n = calSource(creeps);
  Game.spawns['Spawn2'].createCreep([WORK, WORK, CARRY, CARRY, MOVE, MOVE], undefined, {role: role, source: n});
};

var calSource = function(creeps) {
  var n = 1;
  if (creeps.length > 0) {
    if (creeps[creeps.length - 1].memory.source == 1) {
      n = 0;
    }
  }
  return n;
};

var creepsCreation = {
  run: function() {
    // clear memory
    for (var name in Memory.creeps) {
      if (!Game.creeps[name]) {
        delete Memory.creeps[name];
      }
    }

    // Harvester
    var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester' && creep.room.name == 'E37S67');
    if (harvesters.length < 2) {
      createCreep(name, 'harvester', harvesters);
    } else {
      //
      // upgrader
      var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader' && creep.room.name == 'E37S67');
      if (upgraders.length < 2) {
        createCreep(name, 'upgrader', upgraders);
      } else {
        //
        // Tower keeper
        var towerkeepers =
            _.filter(Game.creeps, (creep) => creep.memory.role == 'towerkeeper' && creep.room.name == 'E37S67');
        if (towerkeepers.length < 4) {
          createCreep(name, 'towerkeeper', towerkeepers);
        } else {
          //
          // Miner
          var miners = _.filter(Game.creeps, (creep) => creep.memory.role == 'miner' && creep.room.name == 'E37S67');
          if (miners.length < 2) {
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
            Game.spawns['Spawn2'].createCreep(
                [WORK, WORK, WORK, WORK, WORK, WORK, WORK, MOVE], undefined, {role: 'miner', source: n});
          } else {
            //
            // Builder
            var builders =
                _.filter(Game.creeps, (creep) => creep.memory.role == 'builder' && creep.room.name == 'E37S67');
            if (builders.length < 2) {
              createCreep(name, 'builder', builders);
            } else {
              //
              // Delivery
              var deliveries =
                  _.filter(Game.creeps, (creep) => creep.memory.role == 'delivery' && creep.room.name == 'E37S67');
              if (deliveries.length < 2) {
                var n = 1;
                if (deliveries.length > 0) {
                  // if (miners[0].memory.source == 0) {
                  deliveries.forEach(function(m) {
                    if (m.memory.source == 1) {
                      n = 0;
                    }
                  });
                  //}
                }
                var newName =
                    Game.spawns['Spawn2'].createCreep([CARRY, MOVE], undefined, {role: 'delivery', source: n});
              } else {
                //
                // Mechanic
                var mechanics =
                    _.filter(Game.creeps, (creep) => creep.memory.role == 'mechanic' && creep.room.name == 'E37S67');
                if (mechanics.length < 2) {
                  createCreep(name, 'mechanic', mechanics);
                } else {
                  //
                  // Soldier
                  var soldiers =
                      _.filter(Game.creeps, (creep) => creep.memory.role == 'soldier' && creep.room.name == 'E37S67');
                  if (soldiers.length < 3) {
                    Game.spawns['Spawn2'].createCreep(
                        [TOUGH, TOUGH, RANGED_ATTACK, RANGED_ATTACK, RANGED_ATTACK, RANGED_ATTACK, MOVE, MOVE, MOVE],
                        undefined, {role: 'soldier'});
                  } else {
                    //
                    // Conquest
                    var conquesters = _.filter(
                        Game.creeps, (creep) => creep.memory.role == 'conquest' && creep.room.name == 'E37S67');
                    if (conquesters.length < 2) {
                      var n = 1;
                      if (conquesters.length > 0) {
                        // if (miners[0].memory.source == 0) {
                        conquesters.forEach(function(m) {
                          if (m.memory.source == 1) {
                            n = 0;
                          }
                        });
                        //}
                      }
                      Game.spawns['Spawn2'].createCreep([CLAIM, MOVE], undefined, {role: 'conquest', source: n});
                    }
                    //
                    // Explorer
                    var explorers = _.filter(
                        Game.creeps, (creep) => creep.memory.role == 'explorer' && creep.room.name == 'E37S67');
                    if (explorers.length < 20) {
                      var n = calSource(explorers);
                      Game.spawns['Spawn2'].createCreep(
                          [WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE, ATTACK], undefined,
                          {role: 'explorer', source: n});
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
};



module.exports = creepsCreation;
