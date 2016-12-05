var structureLink = {
  run: function() {
    var links = Game.room.find(FIND_MY_STRUCTURES, {filter: {structureType: STRUCTURE_LINK}});
    if (links.length > 0) {
      links.forEach(function(link) {
        console.log(link);
      });
    }
  }
};
module.exports = structureLink;
