// [프로그래머스] 두 정수 사이의 합

// 가우스 합 공식을 이용한 풀이
function adder(a, b) {
    return (a + b) * (Math.abs(b - a) + 1) / 2;
}

// 내 풀이
function solution(a, b) {
    let answer = 0;
    if (a > b) [a, b] = [b, a];
    for (let i = a; i <= b; i++)
        answer += i;
    return answer;
}