/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.builder');
 * mod.thing == 'a thing'; // true
 */

module.exports = {
    run: function(creep) {
        var game = Game;
        var targets = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_EXTENSION 
                        || structure.structureType == STRUCTURE_SPAWN) 
                    && structure.energy === structure.energyCapacity;
            }
        });
        console.log(targets.length)
        if (targets.length > 0) {
            console.log('storage full');
            if (!creep.memory.target) {
                console.log('no target');
                let target = {};
                while (!(target.type === 'terrain' && target.terrain === 'plains')) {
                    let x = Math.floor(Math.random() * 50);
                    let y = Math.floor(Math.random() * 50);
                    let target = creep.room.lookAt(x, y);
                    
                }
                creep.memory.target = {x, y};
            } else {
                console.log(`${creep}: building extension at (${creep.memory.target.x}, ${creep.memory.target.y})`);
                if (creep.room.createConstructionSite(creep.memory.target.x, creep.memory.target.y, STRUCTURE_EXTENSION) === ERR_NOT_IN_RANGE) {
                    console.log('moving');
                    creep.moveTo(creep.memory.target.x, creep.memory.target.y);
                }
            }
        }
    }
};