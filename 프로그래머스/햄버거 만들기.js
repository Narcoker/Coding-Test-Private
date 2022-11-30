function solution(ingredient) {
    function isBread() {
        if (stack.at(-1) === 1 && stack.at(-2) === 3 && stack.at(-3) === 2 && stack.at(-4) === 1) {
            return true;
        }
        return false;
    }

    function makeBread() {
        for (let i = 0; i < 4; i++)
            stack.pop();
        answer++;
    };

    let answer = 0;
    let stack = [];
    for (let num of ingredient) {
        stack.push(num);
        if (stack.length < 4) continue;
        if (isBread()) makeBread();
    }

    return answer;
}


console.log(solution([2, 1, 1, 2, 3, 1, 2, 3, 1]));