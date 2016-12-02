const C = require('constants');
const harvest = require('role.harvester');
const upgrade = require('role.upgrader');

function delegate(creep) {
    let storageStructures = creep.room.find(FIND_STRUCTURES, {
        filter: (structure) => {
            return (structure.structureType == STRUCTURE_EXTENSION 
                    || structure.structureType == STRUCTURE_SPAWN) 
                    && structure.energy < structure.energyCapacity;
        }
    });
    let totalEnergyCapacity = 0;
    let totalEnergy = 0
    storageStructures.forEach((storage) => {
        totalEnergyCapacity += storage.energyCapacity;
        totalEnergy += storage.energy;
    })
    
    if (totalEnergy === totalEnergyCapacity && creep.memory.task === C.TASK_HARVEST && _.sum(creep.carry) === creep.carryCapacity) {
        console.log('1');
        return C.TASK_UPGRADE;
    } else if (_.sum(creep.carry) === 0 && creep.memory.task === C.TASK_UPGRADE) {
        console.log('2');
        return C.TASK_HARVEST;
    } else if (!creep.memory.task) {
        console.log('3');
        return C.TASK_HARVEST;
    } else {
        console.log('4');
        //return C.TASK_HARVEST;
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
        } 
    }
};
