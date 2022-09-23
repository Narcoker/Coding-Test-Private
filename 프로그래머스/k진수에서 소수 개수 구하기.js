function solution(n, k) {
    var answer = [];
    let a = (n).toString(k);
    let index = 0;
    for (let i = 0; i < a.length; i++) {
        if (a[i] === '0' || i === a.length - 1) {
            let num = a[i] === '0' ? Number(a.slice(index, i)) : Number(a.slice(index, a.length));
            if (num === 2 || num === 3) answer.push(num);
            else {
                for (let k = 2; k <= Math.floor(Math.sqrt(num)); k++) {
                    if (num % k === 0) break;
                    if (k === Math.floor(Math.sqrt(num))) answer.push(num);
                }
            }
            index = i + 1;
        }
    }
    return answer.length;
}