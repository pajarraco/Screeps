var structureLink = {

  /** @param  {Room} room  **/
  run: function(room) {

    var links = room.find(FIND_MY_STRUCTURES, {filter: {structureType: STRUCTURE_LINK}});
    if (links.length > 0) {
      links.forEach(function(link) {
        console.log(link);
      });
    }
  }
};
module.exports = structureLink;
