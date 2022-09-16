function solution(arr, divisor) {
    arr = arr.filter(v => v % divisor === 0).sort((a, b) => a - b);
    return arr.length === 0 ? [-1] : arr;
}