module.exports = {
    spawn: function(spawn) {
        if (spawn.energy < spawn.energyCapacity) {
            spawn.room.memory.queue.enq({
                body_parts: [
                    WORK,
                    CARRY
                ],
                id: spawn.id
            }) 
        }
    }
}
