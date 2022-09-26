function solution(s) {
    let zeroCount = 0;
    let changeCount = 0;
    let nextS;

    while (s !== '1') {
        nextS = s.split("0").join('')
        zeroCount += s.length - nextS.length;
        s = nextS.length.toString(2);
        changeCount++;
    }
    return [changeCount, zeroCount];
}