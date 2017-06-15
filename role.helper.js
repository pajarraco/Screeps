var roleHelper = {

    /** @param {Creep} creep **/
    run: function(creep) {

        const storage = creep.pos.findClosestByRange(
            FIND_STRUCTURES, {
                filter: (s) => s.structureType == STRUCTURE_STORAGE
            });
        if (storage) {
            console.log('storages', JSON.stringify(storage.store));
        }

    }
};

module.exports = roleHelper;
