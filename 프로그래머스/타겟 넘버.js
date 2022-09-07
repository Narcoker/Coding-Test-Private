//[프로그래머스] 타켓 넘버

let answer = 0;

function dfs(numbers, target, sum, depth) {
    if (depth < numbers.length) {
        dfs(numbers, target, sum + numbers[depth], depth + 1);
        dfs(numbers, target, sum - numbers[depth], depth + 1);
    }
    else if (sum === target) answer++;
}

function solution(numbers, target) {
    dfs(numbers, target, 0, 0);
    return answer;
}