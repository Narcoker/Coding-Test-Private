function solution(s, skip, index) {
    let answer = '';
    let skipAlpha = "abcdefghijklmnopqrstuvwxyz";

    for (let s of skip)
        skipAlpha = skipAlpha.replace(s, "");

    let doubleSkipAlpha = skipAlpha + skipAlpha + skipAlpha;

    for (let targetChar of s) {
        let changeChar = doubleSkipAlpha.at(doubleSkipAlpha.indexOf(targetChar) + index);
        answer += changeChar;
    }

    return answer;
}