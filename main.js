const utils = require('utilities');
const PriorityQueue = require('PriorityQueue');
const roleWorker = require('role.worker');
const workOrders = require('work_orders');
const fillOrders = require('fill_orders');


module.exports.loop = function () {
    // Clean up dead creeps
    for (var name in Memory.creeps) {
        if (!Game.creeps[name]) {
            delete Memory.creeps[name];
        }
    }
    let queue = new PriorityQueue();
    queue._elements = Memory.jobQueue;
    Memory.jobQueue = queue;

    if (!Memory.jobQueue) {
        Memory.jobQueue = queue._elements
    }

    for (var r in Game.rooms) {
        let room = Game.rooms[r];

        workOrders(room);
        fillOrders(room);

        // Spawn creeps
        var workers = _.filter(Game.creeps, (creep) => creep.memory.role == 'worker');
        if (workers.length < 20) { 
            Game.spawns['Spawn1'].createCreep([MOVE, CARRY, WORK], undefined, {role: 'worker'});    
        }         
    }
    // Put the Job Queue in a format that will save.
    queue = Memory.jobQueue;
    Memory.jobQueue = queue._elements;
    return; 
    // ==================================================================================================================
    
    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role === 'worker') {
            roleWorker.run(creep);
        }
    }
}
