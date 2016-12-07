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
                let cP = utils.filterUnclaimedCollectionPoints(cPs)[0];
                if (!creep.room.memory.cPs) {
                    creep.room.memory.cPs = {}
                }
                if (!creep.room.memory.cPs[cP]) {
                    creep.room.memory.cPs[cP] = {}
                }
                
                creep.room.memory.cPs[cP].harvester = creep;
                creep.memory.cP = cP
                
            } else {
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
                        return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN) &&
                            structure.energy < structure.energyCapacity;
                    }
            });
            if(targets.length > 0) {
                if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creepUtils.moveTo(creep, targets[0]);
                }
            }
        }
    },
    dontrun: function(creep) {
        if (creep.carry.energy < creep.carryCapacity) {
            let hostiles = creep.room.find(FIND_HOSTILE_CREEPS);
            let sources = creep.room.memory.collectionPoints.energy;
            sources = _.filter(sources, (source) => {
                const dist = (pos1, pos2) => {
                    return Math.sqrt(Math.pow(pos1.x - pos2.x, 2) + Math.pow(pos1.y - pos2.y, 2));
                }
                for (var h in hostiles) {
                    if (dist(source, hostiles[h].pos) < 15) {
                        return false;
                    }
                }
                return true;
            });
            
            if (!creep.memory.source) {
                creep.memory.source = Math.floor(Math.random() * sources.length);
            }
            let status = creep.harvest(sources[creep.memory.source].source);
            if(status !== OK) {
                let mTRV = creep.moveByPath(creep.memory.pathToSource);
                if (!creep.memory.pathToSource || mTRV !== 0) {
                    creep.memory.pathToSource = creep.pos.findPathTo(sources[creep.memory.source].x, sources[creep.memory.source].y)
                }
            }
	    } else {
	        delete creep.memory.source;
            var targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN) &&
                            structure.energy < structure.energyCapacity;
                    }
            });
            if(targets.length > 0) {
                if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0]);
                }
            }
        }
	}
};

module.exports = roleHarvester;
