function solution(n) {
    for (let i = 0; i <= Math.sqrt(n); i++) {
        if (n % i === 1) return i;
    }
    return n - 1;
}