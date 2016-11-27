const utils = require('utilities');

const moveTo = (creep, dest) => {
    if (!creep.memory.pathToDest) {
        creep.memory.pathToDest = creep.pos.findPathTo(dest.pos.x, dest.pos.y)    
    }
    let pathLength = creep.memory.pathToDest.length;
    if (creep.memory.pathToDest[pathLength - 1].x !== dest.pos.x
        || creep.memory.pathToDest[pathLength - 1].y !== dest.pos.y) {
        
        creep.memory.pathToDest = creep.pos.findPathTo(dest.pos.x, dest.pos.y)    
    }
    let moveStatus = creep.moveByPath(creep.memory.pathToDest)
    switch(moveStatus) {
        case OK:
            console.log(`OK: creep ${creep}`);
            return true;
        case ERR_NOT_OWNER:
            return false;
        case ERR_BUSY:
            return false;
        case ERR_NOT_FOUND:
            console.log(`ERROR: ERR_NOT_FOUND encountered when moving creep ${creep}. Deleting path.`)
            delete creep.memory.pathToDest;
            return false;
        case ERR_INVALID_ARGS:
            console.log(`ERROR: ERR_INVALID_ARGS encountered when moving creep ${creep}. Deleting path.`)
            return false;
        case ERR_TIRED:
            return true;
        case ERR_NO_BODYPART:
            console.log(`ERROR: ERR_NO_BODYPART encountered when moving creep ${creep}. Deleting path.`)
            return false;
    }
    
};

module.exports = {
    moveTo
};