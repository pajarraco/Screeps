
/** @param {Creep} creep **/
/*var getContainers = function(creep) {
  return creep.room.find(
      FIND_STRUCTURES, {filter: (s) => s.structureType == STRUCTURE_CONTAINER || s.structureType == STRUCTURE_STORAGE});
};*/

/** @param {Creep} creep **/
/*var getPickupTarget = function(creep) {
  var containers = getContainers(creep);
  var pickupTarget = containers[0];
  var _index = 0;
  containers.forEach(function(container, index) {
    if (container.store[RESOURCE_ENERGY] > pickupTarget.store[RESOURCE_ENERGY] &&
        container.store[RESOURCE_ENERGY] > 1000) {
      _index = index;
    }
  });
  return _index;
};*/

/** @param {Creep} creep **/
/*var getDeliveryTarget = function(creep) {
  var containers = getContainers(creep);
  var deliveryTarget = containers[0];
  var _index = 1
  containers.forEach(function(container, index) {
    if (container.store[RESOURCE_ENERGY] < deliveryTarget.store[RESOURCE_ENERGY]) {
      _index = index;
    }
  });
  return _index;
};*/

var roleDelivery = {

  /** @param {Creep} creep **/
  run: function(creep) {

    if (creep.memory.source == 1) {
      var linkFrom = creep.room.lookForAt('structure', 29, 39)[1];
      if (creep.pos.x == 30 && creep.pos.y == 39) {
        var containers = creep.pos.findInRange(FIND_STRUCTURES, 1, {filter: {structureType: STRUCTURE_CONTAINER}});
        if (containers.length > 0) {
          if (creep.withdraw(containers[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            creep.moveTo(containers[0]);
          } else {
            if (creep.transfer(linkFrom, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
              creep.moveTo(linkFrom);
            }
          }
        }
      } else {
        creep.moveTo(30, 39);
      }
    } else {
      var linkTo = creep.room.lookForAt('structure', 32, 26)[1];
      // if (creep.pos.x == 31 && creep.pos.y == 26) {
      if (creep.carry.energy < creep.carryCapacity) {
        if (creep.withdraw(linkTo, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
          creep.moveTo(linkTo);
        }
      } else {
        var depositTargets = creep.pos.findClosestByRange(FIND_STRUCTURES, {
          filter: (s) => {
            return (
                (s.structureType == STRUCTURE_EXTENSION || s.structureType == STRUCTURE_SPAWN) &&
                s.energy < s.energyCapacity);
          }
        });
        if (depositTargets) {
          if (creep.transfer(depositTargets, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            creep.moveTo(depositTargets);
          }
        } else {
          var storageTargets = Game.room.find(
              FIND_STRUCTURES,
              {filter: (s) => s.structureType == STRUCTURE_STORAGE && s.store[RESOURCE_ENERGY] < s.storeCapacity});
          if (storageTargets.length > 0) {
            if (creep.transfer(storageTargets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
              creep.moveTo(storageTargets[0]);
            }
          }
        }
      }
      //} else {
      //  creep.moveTo(31, 26);
      //}
    }

    /*if (creep.memory.delivering && creep.carry.energy == 0) {
      creep.memory.delivering = false;
      creep.say('getting');
      creep.memory.pickupTarget = getPickupTarget(creep);
    }
    if (!creep.memory.delivering && creep.carry.energy == creep.carryCapacity) {
      creep.memory.delivering = true;
      creep.say('delivering');
      creep.memory.deliveryTarget = getDeliveryTarget(creep);
    }*/

    /*if (creep.memory.delivering) {
      var deliveryTarget = getContainers(creep)[creep.memory.deliveryTarget];
      if (creep.transfer(deliveryTarget, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
        creep.moveTo(deliveryTarget);
      }
    } else {
      if (!creep.memory.pickupTarget) {
        creep.memory.pickupTarget = 0;
      }
      var pickupTarget = getContainers(creep)[creep.memory.pickupTarget];
      var withdrawEnergy = creep.withdraw(pickupTarget, RESOURCE_ENERGY);
      if (withdrawEnergy == ERR_NOT_IN_RANGE) {
        creep.moveTo(pickupTarget);
      } else if (withdrawEnergy == ERR_NOT_ENOUGH_RESOURCES) {
        delete creep.memory.pickupTarget;
      }
    }*/
  }
};

module.exports = roleDelivery;
