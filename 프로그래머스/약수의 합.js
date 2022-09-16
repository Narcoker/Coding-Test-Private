// [프로그래머스] 약수의 합

function solution(n) {
    let answer = 0;
    let max = Math.sqrt(n);
    for (let i = 1; i <= max; i++) {
        if (n % i === 0)
            answer = answer + i + n / i;
    }
    return Number.isInteger(max) ? answer - max : answer;
}