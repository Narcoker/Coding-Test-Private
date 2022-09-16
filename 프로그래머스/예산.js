function solution(d, budget) {
    let answer = 0;
    d = d.sort((a, b) => a - b);
    for (let i = 0; i < d.length; i++) {
        if (d[i] > budget)
            break;
        budget -= d[i];
        answer++;
    }
    return answer;
}