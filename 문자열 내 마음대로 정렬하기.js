function solution(strings, n) {
    return strings.sort((a, b) => {
        if (a[n] > b[n]) return 1;
        else if (a[n] < b[n]) return -1;
        else {
            if (a > b) return 1;
            else if (a < b) return -1;
            else return 0;
        }
    });
}

// 메소드를 이용한 한줄 코드
function solution(strings, n) {
    return strings.sort((a, b) => (a[n] === b[n] ? a.localeCompare(b) : a[n].localeCompare(b[n])));
}