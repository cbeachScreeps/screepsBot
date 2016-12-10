const utils = require('utilities');
const creepUtils = require('utils.creep');

var roleBuilder = {
    /** @param {Creep} creep **/
    run: function(creep) {
        var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
        if(targets.length) {
            let target = creep.pos.findClosestByRange(targets)
            if(creep.build(target) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target);
            }
        }
	}
};

module.exports = roleBuilder;
