function solution(n) {
    let answer = 0;
    for (let i = 2; i <= n; i++) {
        if (i === 2 || i === 3) {
            answer++;
            continue;
        }
        let max = Math.sqrt(i);
        for (let k = 2; k < max; k++) {
            if (i % k === 0) break;
            if (k === Math.floor(max)) answer++;
        }
    }
    return answer;
}