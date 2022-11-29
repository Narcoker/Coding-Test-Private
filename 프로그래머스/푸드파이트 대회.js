function solution(food) {
    let answer = '';
    food.forEach((count, i) => {
        answer += i.toString().repeat(Math.floor(count / 2));
    })
    answer += `0${answer.split('').reverse().join('')}`
    return answer;
}

console.log(solution([1, 7, 1, 2]))