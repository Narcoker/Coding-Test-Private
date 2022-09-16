function solution(n) {
    let answer = "";
    for (let i = 1; i <= n; i++)
        i % 2 === 1 ? answer += "수" : answer += "박";
    return answer;
}

// repeat()를 활용한 풀이
function solution(n) {
    return "수박".repeat(n / 2) + (n % 2 === 1 ? "수" : "");
}