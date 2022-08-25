function solution(numbers) {
    let arr = new Array(10).fill(false);
    numbers.forEach(value => {
        if (arr[value] === false) arr[value] = true;
    })

    return arr.reduce((acc, isContain, index) => isContain ? acc : acc + index, 0);
}