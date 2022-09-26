function solution(answers) {
    let answer = [];
    function grading(marking) {
        let count = 0;
        for (let i = 0; i < answers.length; i++) {
            if (answers[i] === marking[i % marking.length]) count++;
        }
        return count;
    }
    let count1 = grading([1, 2, 3, 4, 5]);
    let count2 = grading([2, 1, 2, 3, 2, 4, 2, 5]);
    let count3 = grading([3, 3, 1, 1, 2, 2, 4, 4, 5, 5]);

    let max = Math.max(count1, count2, count3);
    if (count1 === max) answer.push(1);
    if (count2 === max) answer.push(2);
    if (count3 === max) answer.push(3);

    return answer;
}

