function solution(s) {
    let stack = [s[0]];
    for (let i = 1; i < s.length; i++) {
        if (s[i] === '(') stack.push(s[i]);
        else {
            if (stack.at(-1) === '(')
                stack.pop();
        }
    }
    return stack.length ? false : true;

}