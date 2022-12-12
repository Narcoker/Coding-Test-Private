function solution(dirs) {
    function move(y, x, type) {
        // x,y
        const moveTypes = {
            U: [0, 1],
            D: [0, -1],
            L: [-1, 0],
            R: [1, 0]
        };
        let nextX = x + moveTypes[type][0];
        let nextY = y + moveTypes[type][1];;

        if (nextY >= -5 && nextY <= 5 && nextX >= -5 && nextX <= 5) {
            if (!log.has(`${x},${y}->${nextX},${nextY}`) && !log.has(`${nextX},${nextY}->${x},${y}`)) {
                log.add(`${x},${y}->${nextX},${nextY}`)
            }
            return [nextX, nextY];
        }
        return [x, y];
    }

    let log = new Set();
    let curX = 0, curY = 0;
    for (let type of dirs) {
        [curY, curX] = move(curX, curY, type);
    }

    return log.size;
}