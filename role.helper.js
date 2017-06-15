var roleHelper = {

    /** @param {Creep} creep **/
    run: function(creep) {

        const storage = creep.pos.findClosestByRange(
            FIND_STRUCTURES, {
                filter: (s) => s.structureType == STRUCTURE_STORAGE
            });
        if (storage) {
          _.each(storage.store, (resource, key)=>{

              console.log(resource, key);
          });

        }

    }
};

module.exports = roleHelper;
