function solution(a, b) {
    return a.reduce((sum, v, i) => sum += a[i] * b[i], 0);
}