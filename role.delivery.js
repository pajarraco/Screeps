
/** @param {Creep} creep **/
var getContainers = function(creep) {
  return creep.room.find(FIND_STRUCTURES, {filter: (s) => s.structureType == STRUCTURE_CONTAINER});
};

var getPickupTarget = function(creep) {
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
};

/** @param {Creep} creep **/
var getDeliveryTarget = function(creep) {
  var containers = getContainers(creep);
  var deliveryTarget = containers[0];
  var _index = 1
  containers.forEach(function(container, index) {
    if (container.store[RESOURCE_ENERGY] < deliveryTarget.store[RESOURCE_ENERGY]) {
      _index = index;
    }
  });
  return _index;
};

var roleDelivery = {

  /** @param {Creep} creep **/
  run: function(creep) {

    if (creep.memory.delivering && creep.carry.energy == 0) {
      creep.memory.delivering = false;
      creep.say('getting');
      creep.memory.pickupTarget = getPickupTarget(creep);
    }
    if (!creep.memory.delivering && creep.carry.energy == creep.carryCapacity) {
      creep.memory.delivering = true;
      creep.say('delivering');
      creep.memory.deliveryTarget = getDeliveryTarget(creep);
    }

    if (creep.memory.delivering) {
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
    }
  }
};

module.exports = roleDelivery;
