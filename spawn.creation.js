var createNewCreep = function(spawn, name, role, creeps) {
  var n = calSource(creeps);
  if (spawn.name == 'Spawn1') {
    spawn.createCreep([WORK, WORK, CARRY, CARRY, MOVE, MOVE], undefined, {role: role, source: n});
  } else {
    spawn.createCreep([WORK, CARRY, MOVE], undefined, {role: role, source: n});
  }
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

  /** @param  {Spawn} spawn  **/
  run: function(spawn) {
    // clear memory
    for (var name in Memory.creeps) {
      if (!Game.creeps[name]) {
        delete Memory.creeps[name];
      }
    }

    // Harvester
    var harvesters =
        _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester' && creep.room.name == spawn.room.name);
    if (harvesters.length < 2) {
      createNewCreep(spawn, name, 'harvester', harvesters);
    } else {
      //
      // upgrader
      var upgraders =
          _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader' && creep.room.name == spawn.room.name);
      if (upgraders.length < 2) {
        createNewCreep(spawn, name, 'upgrader', upgraders);
      } else {
        //
        // Miner
        var miners =
            _.filter(Game.creeps, (creep) => creep.memory.role == 'miner' && creep.room.name == spawn.room.name);
        if (miners.length < 2) {
          var n = 1;
          if (miners.length > 0) {
            miners.forEach(function(m) {
              if (m.memory.source == 1) {
                n = 0;
              }
            });
          }
          spawn.createCreep([WORK, WORK, WORK, WORK, WORK, WORK, WORK, MOVE], undefined, {role: 'miner', source: n});
        } else {
          //
          // Tower keeper
          var towerkeepers = _.filter(
              Game.creeps, (creep) => creep.memory.role == 'towerkeeper' && creep.room.name == spawn.room.name);
          if (towerkeepers.length < 4) {
            createNewCreep(spawn, name, 'towerkeeper', towerkeepers);
          } else {
            //
            // Builder
            var builders =
                _.filter(Game.creeps, (creep) => creep.memory.role == 'builder' && creep.room.name == spawn.room.name);
            if (builders.length < 2) {
              createNewCreep(spawn, name, 'builder', builders);
            } else {
              //
              // Mechanic
              var mechanics = _.filter(
                  Game.creeps, (creep) => creep.memory.role == 'mechanic' && creep.room.name == spawn.room.name);
              if (mechanics.length < 2) {
                createNewCreep(spawn, name, 'mechanic', mechanics);
              } else {
                //
                // Delivery
                var deliveries = _.filter(
                    Game.creeps, (creep) => creep.memory.role == 'delivery' && creep.room.name == spawn.room.name);
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
                  var newName = spawn.createCreep([CARRY, MOVE], undefined, {role: 'delivery', source: n});
                } else {
                  //
                  // Soldier
                  var soldiers = _.filter(
                      Game.creeps, (creep) => creep.memory.role == 'soldier' && creep.room.name == spawn.room.name);
                  if (soldiers.length < 3) {
                    spawn.createCreep(
                        [TOUGH, TOUGH, RANGED_ATTACK, RANGED_ATTACK, RANGED_ATTACK, RANGED_ATTACK, MOVE, MOVE, MOVE],
                        undefined, {role: 'soldier'});
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
                      spawn.createCreep([CLAIM, MOVE], undefined, {role: 'conquest', source: n});
                    }
                    //
                    // Explorer
                    var explorers = _.filter(Game.creeps, (creep) => creep.memory.role == 'explorer');
                    if (explorers.length < 20) {
                      var n = calSource(explorers);
                      spawn.createCreep(
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