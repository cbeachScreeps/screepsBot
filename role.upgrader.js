const utils = require('utilities');
const creepUtils = require('utils.creep');

var roleUpgrader = {

    /** @param {Creep} creep **/
    run: function(creep) {
        delete creep.memory.upgrading;
        
	    if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller);
	    }
        
	}
};

module.exports = roleUpgrader;