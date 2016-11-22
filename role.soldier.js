var roleSoldier = {
    run: function(creep) {

        var closestHostile = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        console.log('soldier creep: ' + creep + " hostile " + closestHostile);
        if (closestHostile) {
            creep.moveTo(closestHostile);
            Game.spawns['Spawn1'].room.controller.activateSafeMode();
            creep.attack(closestHostile);
        } else {
            var move = creep.pos.lookFor(FIND_HOSTILE_CREEPS);
            console.log('move ' + move);
            //creep.moveTo(30,45);
        }
    }
}


module.exports = roleSoldier;