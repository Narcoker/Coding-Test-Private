function solution(n, t, m, p) {
    var answer = '';
    let log = '';

    for (let i = 0; i <= 26091; i++)
        log += i.toString(n).toUpperCase();

    for (let i = 0; i < t; i++)
        answer += log[m * i + p - 1];

    return answer;
}
