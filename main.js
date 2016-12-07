const C = require('constants');
const utils = require('utilities');
const PriorityQueue = require('PriorityQueue');
const roleWorker = require('role.worker');
const workOrders = require('work_orders');
const fillOrders = require('fill_orders');


module.exports.loop = function () {
    console.log(`time: ${Game.time}`);
    for (var r in Game.rooms) {
        let room = Game.rooms[r];
        if (room.memory.queue) {
            room.memory.queue = new PriorityQueue(priorityFunction);
        }
        // Check
        workOrders(room);
        fillOrders(room);
        var workers = _.filter(Game.creeps, (creep) => creep.memory.role == 'worker');
        if (workers.length < 6) { //Game.rooms[room].memory.collectionPoints.energy.length) {
            console.log('spawning worker');
            Game.spawns['Spawn1'].createCreep([MOVE, CARRY, WORK], undefined, {role: 'worker'});
        }
    }
  
    for (var name in Memory.creeps) {
        if (!Game.creeps[name]) {
            delete Memory.creeps[name];
        }
    }
    
    
    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role === 'worker') {
            roleWorker.run(creep);
        }
    }
}
