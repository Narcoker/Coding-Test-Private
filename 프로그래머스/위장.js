function solution(clothes) {
    var answer = 1;
    let closet = clothes.reduce((res, [name, type]) => {
        res.set(type, res.get(type) + 1 || 1);
        return res;
    }, new Map())

    closet.forEach((count) => answer *= 1 + count);

    return answer - 1;
}