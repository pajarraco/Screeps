var createCreep = function(name, role, creeps) {
  var n = calSource(creeps);
  Game.spawns['Spawn1'].createCreep([WORK, WORK, CARRY, CARRY, CARRY, MOVE, MOVE], undefined, {role: role, source: n});
};

var calSource = function(creeps) {
  var n = 1;
  if (creeps.length > 0) {
    if (creeps[creeps.length - 1] == 1) {
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
    var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
    console.log(harvesters[harvesters.length - 1].memory.source);
    if (harvesters.length < 2) {
      createCreep(name, 'harvester', harvesters);
    } else {
      //
      // upgrader
      var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
      if (upgraders.length < 2) {
        createCreep(name, 'upgrader', upgraders);
      } else {
        //
        // Tower keeper
        var towerkeepers = _.filter(Game.creeps, (creep) => creep.memory.role == 'towerkeeper');
        if (towerkeepers.length < 4) {
          createCreep(name, 'towerkeeper', towerkeepers);
        } else {
          //
          // Miner
          var miners = _.filter(Game.creeps, (creep) => creep.memory.role == 'miner');
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
            Game.spawns['Spawn1'].createCreep(
                [WORK, WORK, WORK, WORK, WORK, WORK, WORK, MOVE], undefined, {role: 'miner', source: n});
          } else {
            //
            // Builder
            var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
            if (builders.length < 2) {
              createCreep(name, 'builder', builders);
            } else {
              //
              // Delivery
              var deliveries = _.filter(Game.creeps, (creep) => creep.memory.role == 'delivery');
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
                    Game.spawns['Spawn1'].createCreep([CARRY, MOVE], undefined, {role: 'delivery', source: n});
              } else {
                //
                // Mechanic
                var mechanics = _.filter(Game.creeps, (creep) => creep.memory.role == 'mechanic');
                if (mechanics.length < 2) {
                  createCreep(name, 'mechanic', mechanics);
                } else {
                  //
                  // Soldier
                  var soldiers = _.filter(Game.creeps, (creep) => creep.memory.role == 'soldier');
                  if (soldiers.length < 3) {
                    Game.spawns['Spawn1'].createCreep(
                        [TOUGH, ATTACK, ATTACK, ATTACK, ATTACK, MOVE, MOVE, MOVE], undefined, {role: 'soldier'});
                  } else {
                    //
                    // Conquest
                    var conquesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'conquest');
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
                      Game.spawns['Spawn1'].createCreep([CLAIM, MOVE], undefined, {role: 'conquest', source: n});
                    }
                    //
                    // Explorer
                    var explorers = _.filter(Game.creeps, (creep) => creep.memory.role == 'explorer');
                    if (explorers.length < 10) {
                      var n = calSource(explorers);
                      Game.spawns['Spawn1'].createCreep(
                          [WORK, WORK, WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE, ATTACK], undefined,
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
