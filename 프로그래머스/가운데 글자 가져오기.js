function solution(s) {
    let len = s.length;
    return len % 2 === 1 ? s[Math.floor(len / 2)] : s.slice(len / 2 - 1, len / 2 + 1);
}