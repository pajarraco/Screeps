var createNewCreep = function(spawn, name, role, creeps) {
    var n = calSource(creeps);
    var newCreep = spawn.createCreep(
        [
            WORK, WORK, WORK, WORK, // WORK, WORK, WORK, WORK,
            CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY,
            MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE
        ],
        undefined, {
            role: role,
            source: n
        });
    if (newCreep == ERR_NOT_ENOUGH_ENERGY) {
        spawn.createCreep([
            WORK, //WORK,
            CARRY, //CARRY,
            MOVE, //MOVE
        ], undefined, {
            role: role,
            source: n
        });
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

var calSourceExtra = function(creeps) {
    var n = 0;
    if (creeps.length > 0) {
        if (creeps[creeps.length - 1].memory.source == 0) {
            n = 1;
        } else if (creeps[creeps.length - 1].memory.source == 1) {
            n = 2;
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
        //
        // Harvester
        var harvesters =
            _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester' && creep.room.name == spawn.room.name);
        if (harvesters.length < 2) {
            createNewCreep(spawn, name, 'harvester', harvesters);
        } else {
            //
            // Miner
            var miners = _.filter(Game.creeps, (creep) => creep.memory.role == 'miner' && creep.room.name == spawn.room.name);
            if (miners.length < 2) {
                var n = calSource(miners);
                spawn.createCreep(
                    [
                        WORK, WORK,// WORK, // WORK, WORK, WORK, WORK,
                        //CARRY,
                        MOVE, // MOVE, MOVE, MOVE
                    ], undefined, {
                        role: 'miner',
                        source: n
                    });
            } else {
                //
                // upgrader
                var upgraders =
                    _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader' && creep.room.name == spawn.room.name);
                if (upgraders.length < 2) {
                    createNewCreep(spawn, name, 'upgrader', upgraders);
                } else {
                    //
                    // Tower keeper
                    var towerkeepers = _.filter(
                        Game.creeps, (creep) => creep.memory.role == 'towerkeeper' && creep.room.name == spawn.room.name);
                    if (towerkeepers.length < 2) {
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
                            // Soldier
                            var soldiers = _.filter(Game.creeps, (creep) => creep.memory.role == 'soldier');
                            if (soldiers.length < 0) {
                                var n = calSource(soldiers);
                                spawn.createCreep(
                                    [
                                        TOUGH, TOUGH, TOUGH, //TOUGH, TOUGH, TOUGH,
                                        RANGED_ATTACK, RANGED_ATTACK, RANGED_ATTACK, RANGED_ATTACK,
                                        //RANGED_ATTACK, RANGED_ATTACK, RANGED_ATTACK, RANGED_ATTACK,
                                        HEAL, HEAL, HEAL, //HEAL, HEAL, HEAL, HEAL, HEAL,
                                        MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, //MOVE, MOVE
                                    ],
                                    undefined, {
                                        role: 'soldier',
                                        source: n
                                    });
                            }
                            //
                            // Conquest
                            var conquesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'conquest');
                            if (conquesters.length < 0) {
                                var n = calSource(conquesters);
                                spawn.createCreep(
                                    [CLAIM, RANGED_ATTACK, RANGED_ATTACK, RANGED_ATTACK, MOVE, MOVE, MOVE], undefined, {
                                        role: 'conquest',
                                        source: n
                                    });
                            }
                            //
                            // Explorerminer
                            var explorerminers = _.filter(Game.creeps, (creep) => creep.memory.role == 'explorerminer');
                            if (explorerminers.length < 0) {
                                var n = calSourceExtra(explorerminers);
                                spawn.createCreep(
                                    [
                                        WORK, WORK, WORK, WORK, WORK, WORK,
                                        MOVE, MOVE, MOVE, MOVE, MOVE, MOVE,
                                        RANGED_ATTACK
                                    ], undefined, {
                                        role: 'explorerminer',
                                        source: n
                                    });
                            }
                            //
                            // Explorer
                            var explorers = _.filter(Game.creeps, (creep) => creep.memory.role == 'explorer');
                            if (explorers.length < 0) {
                                var n = calSource(explorers);
                                var memory = {
                                    role: 'explorer',
                                    source: n
                                };
                                // if (n === 1) {
                                memory.role2 = 'mechanic';
                                //}
                                spawn.createCreep(
                                    [
                                        WORK,
                                        CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY,
                                        CARRY, CARRY,
                                        MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE,
                                        RANGED_ATTACK
                                    ],
                                    undefined, memory);
                            }
                        }
                    }
                }
            }
        }
    }
};

module.exports = creepsCreation;
