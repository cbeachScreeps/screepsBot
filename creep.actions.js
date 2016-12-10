const utils = require('utilities');
const creepUtils = require('utils.creep');

module.exports = {
    fillEnergy: function(creep) {
        let cPs = utils.getEnergyCollectionPoints(creep.room);
        if (cPs.length > 0 && !creep.memory.cP) {
            // retain the selected source
            cPs = utils.notInRangeOfEnemy(creep.room, cPs);
            let cP = cPs[0];
            if (!creep.room.memory.cPs) {
                creep.room.memory.cPs = {}
            }
            if (!creep.room.memory.cPs[cP]) {
                creep.room.memory.cPs[cP] = {}
            }
            
            creep.room.memory.cPs[cP].harvester = creep;
            creep.memory.cP = cP
            
        } else if (cPs.length > 0) {
            let cP = creep.memory.cP;
            if (creep.pos.x !== cP.pos.x && creep.pos.y !== cP.pos.y) {
                let pos = creep.memory.cP.pos;
                let cPStatus = new RoomPosition(pos.x, pos.y, creep.room.name).look().some((p) => {
                    return p.type === 'creep';
                })
                
                if (cPStatus) {
                    delete creep.memory.cP;
                    return;
                }
            }
            let harvestStatus = creep.harvest(Game.getObjectById(creep.memory.cP.sourceID));
            switch(harvestStatus) {
                case OK: 
                    break;
                case ERR_NOT_OWNER: 
                    break;
                case ERR_BUSY: 
                    break;
                case ERR_NOT_FOUND: 
                    break;
                case ERR_NOT_ENOUGH_RESOURCES: 
                    break;
                case ERR_INVALID_TARGET: 
                    break;
                case ERR_NOT_IN_RANGE:
                    creepUtils.moveTo(creep, creep.memory.cP);
                    break;
                case ERR_NO_BODYPART: 
                    break;
            }
        } else {
            let storage = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_CONTAINER
                            || structure.structureType == STRUCTURE_STORAGE) 
                        && _.sum(structure.store) < structure.storeCapacity;
                }
            });
            let target = creep.pos.findClosestByRange(storage);
            if (target.transfer(creep, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creepUtils.moveTo(creep, creep.pos.findClosestByRange(storage))
            }
        }
    },
    storeEnergy: (creep) => {

    }
};


