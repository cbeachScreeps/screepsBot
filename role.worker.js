const harvest = require('role.harvester');


const TASK_IDLE = 0
const TASK_HARVEST = 1
const TASK_UPGRADE = 2

module.exports = {
    run: function(creep) {
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
        
        if (totalEnergy === totalEnergyCapacity && creep.memory.task === TASK_HARVEST) {
            creep.memory.task == TASK_IDLE;
        }
        
        if (totalEnergy / totalEnergyCapacity < 0.80 && Math.random() > 0.50) {
            creep.memory.task = TASK_HARVEST;
            harvest.run(creep);    
        } else if (totalEnergy / totalEnergyCapacity >= 0.80 && Math.random() > 0.50) {
            creep.memory.task = TASK_UPGRADE;
            harvest.run(creep);
        }
    }
};