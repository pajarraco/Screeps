var getContainers = function(creep) {
  return creep.room.find(FIND_STRUCTURES, {filter: (s) => s.structureType == STRUCTURE_CONTAINER});
};

var getPickupTarget = function(creep) {
  var containers = getContainers(creep);
  var pickupTarget = containers[0];
  containers.forEach(function(container) {
    if (container.store[RESOURCE_ENERGY] > pickupTarget.store[RESOURCE_ENERGY]) {
      pickupTarget = container;
    }
  });
  return pickupTarget;
};

var getDeliveryTarget = function(creep) {
  var containers = getContainers(creep);
  var deliveryTarget = containers[0];
  containers.forEach(function(container) {
    if (container.store[RESOURCE_ENERGY] < deliveryTarget.store[RESOURCE_ENERGY]) {
      deliveryTarget = container;
    }
  });
  return deliveryTarget;
};


var roleDelivery = {
  run: function(creep) {
    if (creep.memory.delivering && creep.carry.energy == 0) {
      creep.memory.delivering = false;
      creep.say('getting');
      var pickupTarget = getPickupTarget(creep);
    }
    if (!creep.memory.delivering && creep.carry.energy == creep.carryCapacity) {
      creep.memory.delivering = true;
      creep.say('delivering');
      var deliveryTarget = getDeliveryTarget(creep);
    }

    if (creep.memory.delivering) {
      if (!deliveryTarget) {
        var deliveryTarget = getDeliveryTarget(creep);
      }
      if (creep.transfer(deliveryTarget, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
        creep.moveTo(deliveryTarget);
      }
    } else {
      if (!pickupTarget) {
        var pickupTarget = getPickupTarget(creep);
      }
      if (creep.withdraw(pickupTarget, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
        creep.moveTo(pickupTarget);
      }
    }
  }
};
module.exports = roleDelivery;
