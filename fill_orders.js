const C = require('constants');
const utils = require('utilities');
const creepActions = require('creep.actions');
const creepUtils = require('utils.creep');

const creeps = (room) => {
    let queue = Memory.jobQueue;
    room.find(FIND_MY_CREEPS)
        .forEach((creep) => {
            let storage = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_EXTENSION 
                            || structure.structureType == STRUCTURE_SPAWN 
                            || structure.structureType == STRUCTURE_CONTAINER
                            || structure.structureType == STRUCTURE_TOWER) 
                        && (structure.energy < structure.energyCapacity 
                            || _.sum(structure.store) < structure.storeCapacity);
                }
            });
            if (queue.isEmpty) {
                if (_.sum(creep.carry) < creep.carryCapacity) {
                    //creepActions.fillEnergy(creep);
                } else {
                    // move to holding area
                    //let holdingPosition = new RoomPosition(15, 15, room.name);
                    //creepUtils.moveTo(creep, holdingPosition)
                }
            }
        });
}

const towers = (room) => {
    room.find(FIND_STRUCTURES, {
        filter: (structure) => {
            return structure.structureType === STRUCTURE_TOWER;
        }
    }).forEach((tower) => {
        let structures = room.find(FIND_STRUCTURES).filter((s) => {
            return s.hits < s.hitsMax;
        });
        let closestHostileHealer = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS, {
            filter: function(object) {
                return object.getActiveBodyparts(HEAL) == 0;
            }
        })
        let closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS, {
            filter: function(object) {
                return object.getActiveBodyparts(HEAL) == 0;
            }
        })
        if (closestHostileHealer) {
            tower.attack(closestHostileHealer)
        } else if(closestHostile) {
            tower.attack(closestHostile)
        } else if (structures.length > 0) {
            tower.repair(structures[0]);
        }
    });
}

module.exports = (room) => {
    creeps(room);    
    towers(room);
}
