const utils = require('utilities');
const PriorityQueue = require('PriorityQueue');
const roleWorker = require('role.worker');

module.exports.loop = function () {
    for (var r in Game.rooms) {
        let room = Game.rooms[r];
        let sortedArray = room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return structure.structureType === STRUCTURE_EXTENSION;
            }
        })
        //console.log('==============================>');
        sortedArray.forEach((poi) => {
            //console.log(utils.distance(Game.spawns['Spawn1'].pos, poi.pos));
        });
        //console.log('==============================');
        sortedArray = utils.sortByDistance(Game.spawns['Spawn1'].pos, room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return structure.structureType === STRUCTURE_EXTENSION;
            }
        }));
        sortedArray.forEach((poi) => {
            //console.log(`poi: ${JSON.stringify(poi.pos)}`);
            //console.log(utils.distance(Game.spawns['Spawn1'].pos, poi.pos));
        });
        //console.log('<==============================');
        utils.getEnergyCollectionPoints(room)
        if (Game.rooms[r].memory.queue) {
            Game.rooms[r].memory.queue = new PriorityQueue(priorityFunction);
        }
        var workers = _.filter(Game.creeps, (creep) => creep.memory.role == 'worker');
        let cPs = utils.getEnergyCollectionPoints(room)
        if (workers.length < 10) { //Game.rooms[room].memory.collectionPoints.energy.length) {
        //if (cPs.length > 0) {
            //if (room.memory.cPTurnsEmpty === undefined) {
            //    room.memory.cPTurnsEmpty = 0;
            //} else if (room.memory.cPTurnsEmpty > 20) {
            //    room.memory.cPTurnsEmpty = 0;
            //    Game.spawns['Spawn1'].createCreep([MOVE, CARRY, CARRY, CARRY, CARRY, WORK, WORK, WORK], undefined, {role: 'worker'});    
            //} else {
            //    room.memory.cPTurnsEmpty++;
            //}
            Game.spawns['Spawn1'].createCreep([MOVE, MOVE, MOVE, CARRY, MOVE, CARRY, MOVE, WORK, WORK, WORK], undefined, {role: 'worker'});    
        } else {
            room.memory.cPTurnsEmpty = 0;
        }
        
        room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return structure.structureType === STRUCTURE_TOWER;
            }
        }).forEach((tower) => {
            let structures = room.find(FIND_STRUCTURES).filter((s) => {
                return s.hits < s.hitsMax;
            });
            let closestHostileHealer = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS, {
                filter: function(object) {
                    return object.getActiveBodyparts(HEAL) == 0;
                }
            })
            let closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS, {
                filter: function(object) {
                    return object.getActiveBodyparts(HEAL) == 0;
                }
            })
            if (closestHostileHealer) {
                tower.attack(closestHostileHealer)
            } else if(closestHostile) {
                tower.attack(closestHostile)
            } else if (structures.length > 0) {
                tower.repair(structures[0]);
            }
        })
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
