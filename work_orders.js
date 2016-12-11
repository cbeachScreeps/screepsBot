const C = require('constants');
const utils = require('utilities');
const tasks = require('task_definitions');

const collectionPoints = (room) => {
    let queue = Memory['jobQueue'];
    let sources = room.find(FIND_SOURCES);
    let cPHs = {};
    let cPTasks = [];
    sources.forEach((source) => {
        let ts = tasks.harvestEnergy(source)
        ts.forEach((cP) => {
            cPHs[`${cP.loc.x}${cP.loc.y}`] = true;
            cPTasks.push(cP);
        });
    });
    queue['_elements'].forEach((t) => {
        if (t.task === C.TASK_HARVEST && cPHs[`${t.loc.x}${t.loc.y}`] === true) {
            delete cPHs[`${t.loc.x}${t.loc.y}`];
        }
    });
    cPTasks.forEach((t) => {
        if (cPHs[`${t.loc.x}${t.loc.y}`]) {
            queue.enq(t);
        }
    });
}

const spawns = (room) => {
    let spawns = room.find(FIND_STRUCTURES, {
        filter: (structure) => {
            return (structure.structureType === STRUCTURE_SPAWN
                    || structure.structureType === STRUCTURE_EXTENSION) 
                && (structure.energy < structure.energyCapacity)
        }
    }).forEach((spawn) => {
        tasks.energyForSpawns(spawn); 
    });
}
module.exports = (room) => {
    collectionPoints(room);
    //spawns(room)
};
