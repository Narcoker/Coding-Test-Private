function solution(s) {
    const len = s.length;
    if (len === 4 || len === 6) {
        if (parseInt(s) === Number(s))
            return true;
    }
    return false;
}