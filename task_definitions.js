const C = require('constants');
const utils = require('utilities');


module.exports = {
    harvestEnergy: (source) => {
        return utils.getEnergyCollectionPoints(source).map((cP) => {
            return {
                task: C.TASK_HARVEST,
                loc: cP,
                sourceID: source.id,
                complete: (creep) => {
                    let source = Game.getObjectById(source.id);
                    return (source.energy === 0 
                            || _.sum(creep.carry) === creep.carryCapacity); 
                },
                requires: {
                    body: [MOVE, CARRY]
                }
            };
        });
    },
    energyForSpawn: (structure) => {
        if (spawn && spawn.energy < spawn.energyCapacity) {
            return {
                id: spawn.id,
                task: C.TASK_PROVIDE_ENERGY,
                requires: {
                    resource: C.ENERGY,
                    body: [MOVE, CARRY]
                }
            }
        }
    }
}
