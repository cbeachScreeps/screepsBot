const utils = require('utilities');
const PriorityQueue = require('PriorityQueue');
const roleWorker = require('role.worker');

module.exports.loop = function () {
    console.log(`time: ${Game.time}`);
    for (var r in Game.rooms) {
        let room = Game.rooms[r];
        utils.getEnergyCollectionPoints(room)
        if (Game.rooms[r].memory.queue) {
            Game.rooms[r].memory.queue = new PriorityQueue(priorityFunction);
        }
        //var workers = _.filter(Game.creeps, (creep) => creep.memory.role == 'worker');
        let cPs = utils.getEnergyCollectionPoints(room)
        console.log(`cPs.length: ${cPs.length}`);
        //if (workers.length < 7) { //Game.rooms[room].memory.collectionPoints.energy.length) {
        if (cPs.length > 0) {
            if (!room.memory.cPTurnsEmpty) {
                room.memory.cPTurnsEmpty = 0;
            } else if (room.memory.cPTurnsEmpty > 3) {
                room.memory.cPTurnsEmpty++;
                console.log('spawning worker');
                Game.spawns['Spawn1'].createCreep([MOVE, CARRY, WORK, WORK], undefined, {role: 'worker'});    
            }
        } else {
            room.memory.cPTurnsEmpty = 0;
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
