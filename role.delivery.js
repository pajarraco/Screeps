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
    var mem = creep.memory;
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
      if (!creep.memory.deliveryTarget) {
        var creep.memory.deliveryTarget = getDeliveryTarget(creep);
      }
      if (creep.transfer(creep.memory.deliveryTarget, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
        creep.moveTo(creep.memory.deliveryTarget);
      }
    } else {
      if (!creep.memory.pickupTarget) {
        var creep.memory.pickupTarget = getPickupTarget(creep);
      }
      if (creep.withdraw(creep.memory.pickupTarget, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
        creep.moveTo(creep.memory.pickupTarget);
      }
    }
  }
};
module.exports = roleDelivery;
