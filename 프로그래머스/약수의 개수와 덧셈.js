function solution(left, right) {
    let answer = 0;
    for (let i = left; i <= right; i++) {
        let count = 0;
        let max = Math.sqrt(i);

        for (let div = 1; div <= max; div++)
            if (i % div === 0) count += 2;

        if (Number.isInteger(max)) count--;

        count % 2 === 0 ? answer += i : answer -= i;
    }
    return answer;
}

// 정수의 제곱근이 정수이면 약수의 개수는 홀수임을 활용한 풀이
function solution(left, right) {
    let answer = 0;
    for (let i = left; i <= right; i++)
        Number.isInteger(Math.sqrt(i)) ? answer -= i : answer += i;
    return answer;
}