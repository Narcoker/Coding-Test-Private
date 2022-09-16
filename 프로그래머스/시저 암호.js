function solution(s, n) {
    let answer = ""
    let alpha = [[], []]
    for (let i = 0; i < 26; i++)
        alpha[0].push(String.fromCharCode(i + 65));
    for (let i = 0; i < 26; i++)
        alpha[1].push(String.fromCharCode(i + 97));

    s = [...s];

    for (let i = 0; i < s.length; i++) {
        if (s[i] === " ")
            answer += " ";
        else {
            let index;

            if (alpha[0].indexOf(s[i]) != -1) {
                index = alpha[0].indexOf(s[i]) + n;
                index > 25 ? answer += alpha[0].at(index - 26) : answer += alpha[0].at(index);
            }
            else {
                index = alpha[1].indexOf(s[i]) + n;
                index > 25 ? answer += alpha[1].at(index - 26) : answer += alpha[1].at(index);
            }
        }
    }
    return answer;
}

// 1회 순회가능 한 배열을 만든 풀이

function solution(s, n) {
    let answer = ""
    let alpha = [];
    for (let i = 0; i < 26; i++)
        alpha.push(String.fromCharCode(i + 65));
    for (let i = 0; i < 26; i++)
        alpha.push(String.fromCharCode(i + 65));

    for (let i = 0; i < 26; i++)
        alpha.push(String.fromCharCode(i + 97));
    for (let i = 0; i < 26; i++)
        alpha.push(String.fromCharCode(i + 97));

    for (let i = 0; i < s.length; i++) {
        if (s[i] === " ") answer += " ";
        else answer += alpha[alpha.indexOf(s[i]) + n];
    }

    return answer;
}