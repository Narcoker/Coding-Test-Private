function solution(arr1, arr2) {
    let answer = [];
    for (let i = 0; i < arr1.length; i++) {
        let temp = [];
        for (let k = 0; k < arr1[0].length; k++) {
            temp.push(arr1[i][k] + arr2[i][k]);
        }
        answer.push(temp);
    }
    return answer;
}