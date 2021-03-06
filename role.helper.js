const roleHelper = {

  /** @param {Creep} creep **/
  run: (creep) => {

    let sum = _.sum(creep.carry);
    if (creep.memory.transfering && sum == 0) {
      creep.memory.transfering = false;
      creep.say('harvesting');

    }
    if (!creep.memory.transfering && sum == creep.carryCapacity) {
      creep.memory.transfering = true;
      creep.memory.target = '';
      creep.say('transfering');
    }

    if (creep.memory.transfering) {
      //   const labs = creep.room.find(
      //     FIND_STRUCTURES, {
      //       filter: (s) => s.structureType == STRUCTURE_LAB
      //     });
      const storage = creep.pos.findClosestByRange(FIND_STRUCTURES, {
        filter: (s) => s.structureType == STRUCTURE_STORAGE
      });
      const terminal = creep.room.find(FIND_STRUCTURES, {
        filter: (s) => s.structureType == STRUCTURE_TERMINAL
      });
      //   if (labs.length > 0) {
      _.each(creep.carry, (resource, key) => {
        if (key === 'O' || key === 'H' || key === 'GO') {
          for (const resourceType in creep.carry) {
            creep.drop(resourceType);
          }
          // if (terminal.length > 0) {
          //     if (creep.transfer(terminal[0], key) == ERR_NOT_IN_RANGE) {
          //         creep.moveTo(terminal[0]);
          //     }
          // }
        } else {
          // if (creep.memory.target === 'terminal') {
          // if (storage) {
          //   if (creep.transfer(storage, key)) {
          //     creep.moveTo(storage);
          //   }
          // }
          if (terminal.length > 0) {
            if (creep.transfer(terminal[0], key) == ERR_NOT_IN_RANGE) {
              creep.moveTo(terminal[0]);
            }
          }
          // } else {
          //   const myLab = _.min(labs, (lab) => lab.energy);
          //   let transfer = creep.transfer(myLab, key);
          //   if (transfer == ERR_NOT_IN_RANGE) {
          //     creep.moveTo(myLab);
          //   } else if (transfer == ERR_FULL) {
          //     creep.memory.target = 'terminal';
          //   }
          // }
        }
      });
      //   }
    } else {
      const storage = creep.pos.findClosestByRange(FIND_STRUCTURES, {
        filter: (s) => s.structureType == STRUCTURE_STORAGE
      });
      const terminal = creep.room.find(FIND_STRUCTURES, {
        filter: (s) => s.structureType == STRUCTURE_TERMINAL
      });
      if (storage) {
        // _.each(storage.store, (resource, key) => {
        // console.log(resource, key);
        // if (key === 'O' || key === 'H') {
        if (creep.withdraw(storage, 'energy')) {
          creep.moveTo(storage);
        }
        // }
        // });
      }
      // if (terminal[0]) {
      //   _.each(terminal[0].store, (resource, key) => {
      //     // console.log(resource, key);
      //     //   if (key !== 'energy') {
      //     if (creep.withdraw(terminal[0], key)) {
      //       creep.moveTo(terminal[0]);
      //     }
      //     //   }
      //   });
      // }
    }
  }
};

module.exports = roleHelper;
