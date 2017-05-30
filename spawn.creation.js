const harvesterBody = [WORK, WORK, //WORK, WORK, // WORK, WORK, WORK, WORK,
    CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY,
    MOVE, MOVE, MOVE, MOVE, MOVE, //MOVE, //MOVE, MOVE
];
const harvesterBodyLow = [
    WORK, WORK,
    CARRY, CARRY,
    MOVE, MOVE
];
const minerBody = [
    WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK,
    CARRY,
    MOVE, MOVE, MOVE, //MOVE
];
const minerBodyLow = [
    WORK, WORK, WORK, WORK, WORK, //WORK, //WORK,
    // CARRY,
    MOVE, //MOVE, // MOVE, MOVE
];
const upgraderBody = [
    WORK, WORK, WORK, //WORK, WORK,
    CARRY, CARRY, CARRY, //CARRY, CARRY,
    MOVE, MOVE, MOVE, //MOVE, MOVE
];
const upgraderBodyLow = [
    WORK, WORK, WORK, //WORK,
    CARRY, CARRY, CARRY, //CARRY,
    MOVE, MOVE, MOVE, //MOVE
];
const towerkeeperBody = [WORK, WORK, //WORK, WORK, // WORK, WORK, WORK, WORK,
    CARRY, CARRY, //CARRY, //CARRY, //CARRY, //CARRY, CARRY, CARRY,
    MOVE, MOVE, //MOVE, //MOVE, //MOVE, //MOVE, //MOVE, MOVE
];
const towerkeeperBodyLow = [
    WORK, WORK,
    CARRY, CARRY,
    MOVE, MOVE
];
const builderBody = [
    WORK, WORK, WORK, //WORK, WORK, WORK, // WORK, WORK,
    CARRY, CARRY, CARRY, //CARRY, CARRY, CARRY, //CARRY, CARRY,
    MOVE, MOVE, MOVE, //MOVE, MOVE, MOVE, //MOVE, MOVE
];
const builderBodyLow = [
    WORK, WORK, WORK, //WORK, //WORK, WORK, // WORK, WORK,
    CARRY, CARRY, CARRY, //CARRY, CARRY, CARRY, //CARRY, CARRY,
    MOVE, MOVE, MOVE, //MOVE, MOVE, MOVE, //MOVE, MOVE
];
const soldierBody = [
    TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH,
    RANGED_ATTACK, RANGED_ATTACK, RANGED_ATTACK, RANGED_ATTACK,
    RANGED_ATTACK, //RANGED_ATTACK, //RANGED_ATTACK, RANGED_ATTACK,
    HEAL, HEAL, //HEAL, //HEAL, //HEAL, HEAL, HEAL, HEAL,
    MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE
];
const conquesterBody = [
    CLAIM, //RANGED_ATTACK, RANGED_ATTACK, RANGED_ATTACK,
    MOVE, MOVE, MOVE, MOVE, MOVE, MOVE
];
const explorerminerBody = [
    WORK, WORK, WORK, WORK, WORK, WORK,
    MOVE, MOVE, MOVE, MOVE, //MOVE, MOVE,
    // RANGED_ATTACK
];
const explorerBody = [
    WORK,
    CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, //CARRY, CARRY,
    MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE,
    //RANGED_ATTACK
];
const deliveryBody = [
    CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY,
    MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE,
];

const home1 = 'E17N93';
const home2 = 'E19N94';
const home3 = 'E18N95';
const home4 = 'E18N93';

const creepsCreation = {

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
        const harvesters =
            _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester' && creep.room.name == spawn.room.name);
        if (harvesters.length < 2) {
            createNewCreep(spawn, name, harvesterBody, 'harvester', harvesters);
        } else {
            //
            // Miner
            const miners = _.filter(Game.creeps, (creep) => creep.memory.role == 'miner' && creep.room.name == spawn.room.name);
            if (miners.length < 2) {
                // if (spawn.room.name !== home4) {
                    createNewCreep(spawn, name, minerBody, 'miner', miners);
                // } else {
                //     createNewCreep(spawn, name, minerBodyLow, 'miner', miners);
                // }
            } else {
                //
                // upgrader
                const upgraders =
                    _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader' && creep.room.name == spawn.room.name);
                if (upgraders.length < 1) {
                    // if (spawn.room.name !== home4) {
                        createNewCreep(spawn, name, upgraderBody, 'upgrader', upgraders);
                    // } else {
                    //     createNewCreep(spawn, name, upgraderBodyLow, 'upgrader', upgraders);
                    // }
                } else {
                    //
                    // Tower keeper
                    const towerkeepers = _.filter(
                        Game.creeps, (creep) => creep.memory.role == 'towerkeeper' && creep.room.name == spawn.room.name);
                    if (towerkeepers.length < 1) {
                        // if (spawn.room.name !== home4) {
                            createNewCreep(spawn, name, towerkeeperBody, 'towerkeeper', towerkeepers);
                        // } else {
                        //     createNewCreep(spawn, name, towerkeeperBodyLow, 'towerkeeper', towerkeepers);
                        // }
                    } else {
                        //
                        // Builder
                        const builders =
                            _.filter(Game.creeps, (creep) => creep.memory.role == 'builder' && creep.room.name == spawn.room.name);
                        if (builders.length < 1 && (spawn.room.name === home4)) {
                            // if (spawn.room.name !== home4) {
                                createNewCreep(spawn, name, builderBody, 'builder', builders);
                            // } else {
                            //     createNewCreep(spawn, name, builderBodyLow, 'builder', builders);
                            // }
                        } else {
                            //
                            // Soldier
                            const soldiers = _.filter(Game.creeps, (creep) => creep.memory.role == 'soldier');
                            if (soldiers.length < 0) {
                                createNewCreep(spawn, name, soldierBody, 'soldier', soldiers);
                            }
                            //
                            // Conquest
                            const conquesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'conquest');
                            if (conquesters.length < 0) {
                                createNewCreep(spawn, name, conquesterBody, 'conquest', conquesters);
                            }
                            //
                            // Explorerminer
                            const explorerminers = _.filter(Game.creeps, (creep) => creep.memory.role == 'explorerminer');
                            if (explorerminers.length < 0 && spawn.room.name === home1) {
                                createNewCreep(spawn, name, explorerminerBody, 'explorerminer', explorerminers);
                            }
                            //
                            // Explorer
                            const explorers = _.filter(Game.creeps, (creep) => creep.memory.role == 'explorer');
                            if (explorers.length < 0 && spawn.room.name === home1) {
                                createNewCreep(spawn, name, explorerBody, 'explorer', explorers);
                            }
                            //
                            // Delivery
                            const deliverys = _.filter(Game.creeps, (creep) => creep.memory.role == 'delivery');
                            if (deliverys.length < 0 && spawn.room.name === home2) {
                                createNewCreep(spawn, name, deliveryBody, 'delivery', deliverys);
                            }
                        }
                    }
                }
            }
        }
    }
};

const createNewCreep = function(spawn, name, body, role, creeps) {
    const s = calSource(creeps);
    const r = calRoom(creeps);
    let memory = {
        role: role,
        source: s,
        room: r
    };
    (role === 'explorer') ? memory.role2 = 'mechanic': null;
    const newCreep = spawn.createCreep(body, undefined, memory);
    console.log(newCreep, role, spawn);
    (
        newCreep == ERR_NOT_ENOUGH_ENERGY &&
        role === 'harvester' &&
        (spawn.room.name === home4 || spawn.room.name === home3)
    ) ? spawn.createCreep(harvesterBodyLow, undefined, memory): null;
};

const calSource = function(creeps) {
    var n = 0;
    if (creeps.length > 0) {
        if (creeps[creeps.length - 1].memory.source == 0) {
            n = 1;
        }
    }
    return n;
};

const calRoom = function(creeps) {
    var n = 1;
    if (creeps.length > 1) {
        if (creeps[creeps.length - 2].memory.room == 1) {
            n = 2;
        }
        /*else if (creeps[creeps.length - 2].memory.source == 2) {
                   n = 3;
               }*/
    }
    return n;
};

const calSourceExtra = function(creeps) {
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

module.exports = creepsCreation;
