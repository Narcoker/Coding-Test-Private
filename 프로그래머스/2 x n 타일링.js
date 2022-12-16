function solution(n) {
    let arr = [1, 1];
    for (let i = 2; i <= n; i++) {
        arr.push((arr[i - 2] + arr[i - 1]) % 1_000_000_007);
    }
    return arr[n];
}