const utils = require('utilities');
const PriorityQueue = require('PriorityQueue');
const roleWorker = require('role.worker');

module.exports.loop = function () {
    console.log(`time: ${Game.time}`);
    for (var r in Game.rooms) {
        if (Game.rooms[r].memory.queue) {
            Game.rooms[r].memory.queue = new PriorityQueue(priorityFunction);
        }
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
