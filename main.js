const roleWorker = require('role.worker');
const utils = require('utilities');

module.exports.loop = function () {
    console.log(`time: ${Game.time}`);
    for (var r in Game.rooms) {
        if (!Game.rooms[r].memory.collectionsPoints) {
            Game.rooms[r].memory.collectionPoints = {};
        }
        Game.rooms[r].memory.collectionPoints.energy = utils.getEnergyCollectionPoints(Game.rooms[r]);
    }
  
    for (var name in Memory.creeps) {
        if (!Game.creeps[name]) {
            delete Memory.creeps[name];
        }
    }
    for (let room in Game.rooms) {
        var workers = _.filter(Game.creeps, (creep) => creep.memory.role == 'worker');
        if (workers.length < 10) { //Game.rooms[room].memory.collectionPoints.energy.length) {
            console.log('spawning worker');
            Game.spawns['Spawn1'].createCreep([MOVE, CARRY, WORK], undefined, {role: 'worker'});
        }
    }
    
    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role === 'worker') {
            roleWorker.run(creep);
        }
    }
}