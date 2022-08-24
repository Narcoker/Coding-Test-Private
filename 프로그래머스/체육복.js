function solution(n, lost, reserve) {
    lost.sort((a, b) => a - b);
    reserve.sort((a, b) => a - b);
    for (let i = 0; i < lost.length; i++) {
        let index = reserve.indexOf(lost[i]);
        if (index > -1) {
            reserve.splice(reserve.indexOf(lost[i]), 1);
            lost.splice(i, 1);
            i--;
        }
    }

    for (let i = 0; i < lost.length; i++) {
        let front = lost[i] - 1;
        let back = lost[i] + 1;
        if (reserve.indexOf(front) > -1) {
            reserve.splice(reserve.indexOf(front), 1);
            lost.splice(i--, 1);
        }
        else if (reserve.indexOf(back) > -1) {
            reserve.splice(reserve.indexOf(back), 1);
            lost.splice(i--, 1);
        }
    }

    return n - lost.length;
}

console.log(solution(5, [1, 2, 4, 5], [2, 3, 4]));