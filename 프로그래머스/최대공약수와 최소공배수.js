function solution(n, m) {
    let div;
    let a = n, b = m;
    if (a < b) [a, b] = [b, a];
    while (b !== 0) {
        div = a % b;
        [a, b] = [b, div];
    }
    return [a, n * m / a];

}

// 재귀함수를 이용한 풀이
function greatestCommonDivisor(a, b) { return b ? greatestCommonDivisor(b, a % b) : Math.abs(a); }
function leastCommonMultipleOfTwo(a, b) { return (a * b) / greatestCommonDivisor(a, b); }
function gcdlcm(a, b) {
    return [greatestCommonDivisor(a, b), leastCommonMultipleOfTwo(a, b)];
}