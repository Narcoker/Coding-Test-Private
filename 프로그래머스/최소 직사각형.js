function solution(sizes) {
    let wh = sizes.reduce((result, value) => {
        if (value[0] < value[1]) {
            result[0].push(value[0]);
            result[1].push(value[1]);
        } else {
            result[0].push(value[1]);
            result[1].push(value[0]);
        }
        return result;
    }, [[], []])

    return Math.max(...wh[0]) * Math.max(...wh[1]);
}