var roleDelivery = {
  run: function(creep) {
    if (creep.memory.delivering && creep.carry.energy == 0) {
      creep.memory.delivering = false;
      creep.say('getting');
    }
    if (!creep.memory.delivering && creep.carry.energy == creep.carryCapacity) {
      creep.memory.delivering = true;
      creep.say('delivering');
    }
    var containers =
        creep.pos.findClosestByRange(FIND_STRUCTURES, {filter: (s) => s.structureType == STRUCTURE_CONTAINER});
    var pickupTarget = containers[0];
    var deliveryTarget = containers[0];
    containers.forEach(function(container) {
      if (container.store[RESOURCE_ENERGY] > pickupTarget.store[RESOURCE_ENERGY]) {
        pickupTarget = container;
      } else if (container.store[RESOURCE_ENERGY] < deliveryTarget.store[RESOURCE_ENERGY]) {
        deliveryTarget = container;
      }
    });
    if (creep.memory.delivering) {
      if (creep.transfer(deliveryTarget, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
        creep.moveTo(deliveryTarget);
      }
    } else {
      if (creep.withdraw(pickupTarget, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
        creep.moveTo(pickupTarget);
      }
    }
  }
};
module.exports = roleDelivery;
