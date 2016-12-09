const utils = require('utilities');
const creepUtils = require('utils.creep');

var roleHarvester = {
    /** @param {Creep} creep **/
    run: function(creep) {
        if (creep.carry.energy < creep.carryCapacity) {
            if (!creep.memory.cP) {
                // retain the selected source
                let cPs = utils.sortByDistance(creep.pos, utils.getEnergyCollectionPoints(creep.room));
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
                
            } else {
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
            }
        } else {
            delete creep.memory.cP;
            delete creep.memory.pathToSource;
            var targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN || structure.structureType == STRUCTURE_CONTAINER
                        || structure.structureType == STRUCTURE_TOWER) 
                        && (structure.energy < structure.energyCapacity || _.sum(structure.store) < structure.storeCapacity);
                    }
            });
            if(targets.length > 0) {
                if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creepUtils.moveTo(creep, targets[0]);
                }
            }
        }
    }
};

module.exports = roleHarvester;
