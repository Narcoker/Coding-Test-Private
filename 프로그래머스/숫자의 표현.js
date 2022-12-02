function solution(n) {
    var answer = 1;
    for (let i = 1; i <= Math.floor(n / 2); i++) {
        let sum = i;
        for (let k = i + 1; k <= Math.floor(n / 2) + 1; k++) {
            sum += k;
            if (sum >= n) {
                if (sum === n) answer++;
                break;
            }
        }
    }
    return answer;
}

// n의 약수 중 홀수의 개수가 답임을 이용한 풀이
function expressions(num) {
    var answer = 0;

    for (var i = 1; i <= num; i++) {
        if (num % i == 0 && i % 2 == 1)
            answer++
    }
    return answer;
}