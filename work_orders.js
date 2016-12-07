const C = require('constants');

const processSpawns = (spawn) => {
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

module.exports = (room) => {
    let spawns = room.find(FIND_STRUCTURES, {
        filter: (structure) => {
            return structure.structureType === STRUCTURE_SPAWN
        }
    });
    for (let s in spawns) {
        let workOrder = processSpawns(spawns[s]);
        console.log("workOrder: " + JSON.stringify(workOrder));
    }
};
