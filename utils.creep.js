const utils = require('utilities');

const moveTo = (creep, dest) => {
    if (dest.hasOwnProperty('pos')) {
        dest = dest.pos
    }
    if (!creep.memory.pathToDest) {
        creep.memory.pathToDest = creep.pos.findPathTo(dest.x, dest.y)    
    } 

    let pathLength = creep.memory.pathToDest.length;
    if (pathLength > 0 
        && (creep.memory.pathToDest[pathLength - 1].x !== dest.x
            || creep.memory.pathToDest[pathLength - 1].y !== dest.y)) {
        creep.memory.pathToDest = creep.pos.findPathTo(dest.x, dest.y)    
    }
    let moveStatus = creep.moveByPath(creep.memory.pathToDest)
    switch(moveStatus) {
        case OK:
            return true;
        case ERR_NOT_OWNER:
            return false;
        case ERR_BUSY:
            return false;
        case ERR_NOT_FOUND:
            delete creep.memory.pathToDest;
            return false;
        case ERR_INVALID_ARGS:
            return false;
        case ERR_TIRED:
            return true;
        case ERR_NO_BODYPART:
            return false;
    }
    
};

module.exports = {
    moveTo
};
