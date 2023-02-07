function solution(s, skip, index) {
    let answer = '';
    let skipAlpha = "abcdefghijklmnopqrstuvwxyz";

    for (let s of skip)
        skipAlpha = skipAlpha.replace(s, "");

    let tripleSkipAlpha = skipAlpha + skipAlpha + skipAlpha;

    for (let targetChar of s) {
        let changeChar = tripleSkipAlpha.at(tripleSkipAlpha.indexOf(targetChar) + index);
        answer += changeChar;
    }
    return answer;
}
