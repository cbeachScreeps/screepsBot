const C = require('constants');
const utils = require('utilities');

const collectionPoint = (room) => {
    let queue = Memory.jobQueue;
    let sources = room.find(FIND_SOURCES);
    sources.forEach((source) => {
        let cPs = utils.getEnergyCollectionPoints(source); 
    });
}

const spawns = (room) => {
    let spawns = room.find(FIND_STRUCTURES, {
        filter: (structure) => {
            return structure.structureType === STRUCTURE_SPAWN
        }
    }).forEach((spawn) => {
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
    });
}

module.exports = (room) => {
    spawns(room)
};
