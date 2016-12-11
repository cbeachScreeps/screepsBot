/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('utilities');
 * mod.thing == 'a thing'; // true
 */

const distance = (pos1, pos2) => {
    //console.log(`x1: ${pos1.x}, x2: ${pos2.x}`);
    //console.log(`y1: ${pos1.y}, y2: ${pos2.y}`);
    //console.log(`x diff: ${Math.pow(pos1.x - pos2.x, 2)}`);
    //console.log(`y diff: ${Math.pow(pos1.y - pos2.y, 2)}`);
    //console.log(`pow: ${Math.pow(pos1.x - pos2.x, 2) + Math.pow(pos1.y - pos2.y, 2)}`);
    //console.log(`dist: ${Math.sqrt(Math.pow(pos1.x - pos2.x, 2) + Math.pow(pos1.y - pos2.y, 2))}`);
    return Math.sqrt(Math.pow(pos1.x - pos2.x, 2) + Math.pow(pos1.y - pos2.y, 2));
};

const getEnergyCollectionPoints = (source) => {
    let room = source.room; 
    let collectionPoints = [];
    let x = source.pos.x;
    let y = source.pos.y;
    
    collectionPoints[0] = room.lookAt(x - 1, y - 1)[0];
    collectionPoints[0].pos = new RoomPosition(x - 1, y - 1, room.name);

    collectionPoints[1] = room.lookAt(x, y - 1)[0];
    collectionPoints[1].pos = new RoomPosition(x, y - 1, room.name);

    collectionPoints[2] = room.lookAt(x + 1, y - 1)[0];
    collectionPoints[2].pos = new RoomPosition(x + 1, y - 1, room.name);

    collectionPoints[3] = room.lookAt(x - 1, y)[0];
    collectionPoints[3].pos = new RoomPosition(x - 1, y, room.name);

    collectionPoints[4] = room.lookAt(x, y)[0];
    collectionPoints[4].pos = new RoomPosition(x, y, room.name);

    collectionPoints[5] = room.lookAt(x + 1, y)[0];
    collectionPoints[5].pos = new RoomPosition(x + 1, y, room.name);

    collectionPoints[6] = room.lookAt(x - 1, y + 1)[0];
    collectionPoints[6].pos = new RoomPosition(x - 1, y + 1, room.name);

    collectionPoints[7] = room.lookAt(x, y + 1)[0];
    collectionPoints[7].pos = new RoomPosition(x, y + 1, room.name);

    collectionPoints[8] = room.lookAt(x + 1, y + 1)[0];
    collectionPoints[8].pos = new RoomPosition(x + 1, y + 1, room.name);

    return _.filter(collectionPoints, (point) => {
        return point.type === 'terrain' && (point.terrain === 'plain' || point.terrain === 'swamp');
    }).map((point) => {
        point.pos.sourceID = source.id;
        return point.pos;
    });
}

const notInRangeOfEnemy = (room, things) => {
    return _.filter(things, (thing) => {
        let hostiles = room.find(FIND_HOSTILE_CREEPS);
        for (var h in hostiles) {
            if (distance(thing, hostiles[h].pos) < 15) {
                return false;
            }
        }
        return true;
    });
};

const filterUnclaimedCollectionPoints = (cPs) => {
    return _.filter(cPs, (cP) => {
        return !cP.harvester;
    });
}

const randomElement = (array) => {
    return array[Math.floor(Math.random() * array.length)];
}

const arePathsEqual = (path1, path2) => {
    if (path1.length !== path2.lenth) {
        return false;
    }
}

module.exports = {
    arePathsEqual,
    distance,
    randomElement,
    filterUnclaimedCollectionPoints,
    notInRangeOfEnemy,
    getEnergyCollectionPoints
};
