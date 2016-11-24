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
    if (mem.delivering && creep.carry.energy == 0) {
      mem.delivering = false;
      creep.say('getting');
      mem.pickupTarget = getPickupTarget(creep);
    }
    if (!mem.delivering && creep.carry.energy == creep.carryCapacity) {
      mem.delivering = true;
      creep.say('delivering');
      mem.deliveryTarget = getDeliveryTarget(creep);
    }

    if (mem.delivering) {
      if (!mem.deliveryTarget) {
        var mem.deliveryTarget = getDeliveryTarget(creep);
      }
      if (creep.transfer(mem.deliveryTarget, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
        creep.moveTo(mem.deliveryTarget);
      }
    } else {
      if (!mem.pickupTarget) {
        var mem.pickupTarget = getPickupTarget(creep);
      }
      if (creep.withdraw(mem.pickupTarget, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
        creep.moveTo(mem.pickupTarget);
      }
    }
  }
};
module.exports = roleDelivery;
