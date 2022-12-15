function solution(elements) {
    const sumSet = new Set();
    const cirElements = [...elements, ...elements];
    for (let start = 0; start < elements.length; start++) {
        let sum = 0;
        for (let end = 0; end < elements.length; end++) {
            sum += cirElements[start + end];
            sumSet.add(sum);
        }
    }
    return sumSet.size;
}