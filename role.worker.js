const C = require('constants');
const utils = require('utilities');
const harvest = require('role.harvester');
const upgrade = require('role.upgrader');
const build = require('role.builder');

function delegate(creep) {
    let storageStructures = creep.room.find(FIND_STRUCTURES, {
        filter: (structure) => {
            return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN || structure.structureType == STRUCTURE_CONTAINER
                        || structure.structureType == STRUCTURE_TOWER) 
                        && (structure.energy < structure.energyCapacity || _.sum(structure.store) < structure.storeCapacity);
        }
    });
    let totalEnergyCapacity = 0;
    let totalEnergy = 0
    storageStructures.forEach((storage) => {
        totalEnergyCapacity += storage.energyCapacity;
        totalEnergy += storage.energy;
    })
    let cPs = utils.sortByDistance(creep.pos, utils.getEnergyCollectionPoints(creep.room));
    var sites = creep.room.find(FIND_CONSTRUCTION_SITES);
    
    if (sites.length === 0 && creep.memory.task === C.TASK_BUILD) {
        // clean up the builders after they're done building
        creep.memory.task = C.TASK_HARVEST;
    }

    if (totalEnergy === totalEnergyCapacity && creep.memory.task === C.TASK_HARVEST && _.sum(creep.carry) === creep.carryCapacity) {
        console.log(sites);
        if (sites.length > 0) {
            //creep.say('building');
            return Math.random() < .1 ? C.TASK_UPGRADE : C.TASK_BUILD;
        } else {
            //creep.say('upgrading');
            return C.TASK_UPGRADE;
        }
    } else if (_.sum(creep.carry) === 0 && creep.memory.task !== C.TASK_HARVEST) {
        //creep.say('harvesting');
        return C.TASK_HARVEST;
    } else if (!creep.memory.task) {
        //creep.say('harvesting');
        return C.TASK_HARVEST;
    } else {
        //creep.say('memory');
        return creep.memory.task;
    }
}

module.exports = {
    run: function(creep) {
        creep.memory.task = delegate(creep);
        switch(creep.memory.task) {
            case C.TASK_HARVEST:
                harvest.run(creep);    
                break;
            case C.TASK_UPGRADE:
                upgrade.run(creep);    
                break;
            case C.TASK_BUILD:
                build.run(creep);    
                break;
        } 
    }
};
