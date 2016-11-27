/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('utilities');
 * mod.thing == 'a thing'; // true
 */

const distance = (pos1, pos2) => {
    return Math.sqrt(Math.pow(pos1.x - pos2.x, 2) + Math.pow(pos1.y - pos2.y, 2));
};

const sortByDistance = (pos, posArray) => {
    return posArray.sort((a, b) => {
        let distA = distance(pos, a);
        let distB = distance(pos, b);
        if (distA > distB) {
            return 1;
        } else if (distA < distB) {
            return -1;
        } else {
            return 0;
        }
    });
};

const getEnergyCollectionPoints = (room) => {
   
    let collectionPoints = [];
    let sources = room.find(FIND_SOURCES);
   
    for (var s in sources) {
        let somePoints = [];
        let x = sources[s].pos.x;
        let y = sources[s].pos.y;
        
        somePoints[0] = room.lookAt(x - 1, y - 1)[0];
        somePoints[0].x = x - 1;
        somePoints[0].y = y - 1;
        somePoints[1] = room.lookAt(x, y - 1)[0];
        somePoints[1].x = x;
        somePoints[1].y = y - 1;
        somePoints[2] = room.lookAt(x + 1, y - 1)[0];
        somePoints[2].x = x + 1;
        somePoints[2].y = y - 1;
        somePoints[3] = room.lookAt(x - 1, y)[0];
        somePoints[3].x = x - 1;
        somePoints[3].y = y;
        somePoints[4] = room.lookAt(x, y)[0];
        somePoints[4].x = x;
        somePoints[4].y = y;
        somePoints[5] = room.lookAt(x + 1, y)[0];
        somePoints[5].x = x + 1;
        somePoints[5].y = y;
        somePoints[6] = room.lookAt(x - 1, y + 1)[0];
        somePoints[6].x = x - 1;
        somePoints[6].y = y + 1;
        somePoints[7] = room.lookAt(x, y + 1)[0];
        somePoints[7].x = x;
        somePoints[7].y = y + 1;
        somePoints[8] = room.lookAt(x + 1, y + 1)[0];
        somePoints[8].x = x + 1;
        somePoints[8].y = y + 1;
        somePoints = _.filter(somePoints, (point) => {
           return point.type === 'terrain' && (point.terrain === 'plain' || point.terrain === 'swamp');
        });
        for (var p in somePoints) {
            somePoints[p].sourceID = sources[s].id;
            somePoints[p].pos = {};
            somePoints[p].pos.x = somePoints[p].x
            somePoints[p].pos.y = somePoints[p].y
            collectionPoints.push(somePoints[p]);
        }
        // console.log('somePoints');
        // console.log(JSON.stringify(somePoints, null, 2));
        // console.log(somePoints.length);
    }
    
    return collectionPoints;
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
        console.log(cP.hargester);
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
    console.log(typeof(path1));
}

module.exports = {
    arePathsEqual,
    distance,
    randomElement,
    sortByDistance,
    filterUnclaimedCollectionPoints,
    notInRangeOfEnemy,
    getEnergyCollectionPoints
};