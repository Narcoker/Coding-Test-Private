function solution(arr1, arr2) {
    let answer = [];
    let maxIndex = arr1[0].length;

    for (let i = 0; i < arr1.length; i++) {
        let result = [];
        for (let j = 0; j < arr2[0].length; j++) {
            let sum = 0;
            for (let k = 0; k < maxIndex; k++) {
                sum += arr1[i][k] * arr2[k][j];
            }
            result.push(sum);
        }
        answer.push(result);
    }
    return answer;
}

// 다른사람의 풀이
function productMatrix(A, B) {
    return A.map(function (row) {
        return row.map(function (_, i) {
            return row.reduce(function (sum, cell, j) {
                return sum + cell * B[j][i];
            }, 0);
        });
    });
}

console.log(solution([[1, 4], [3, 2], [4, 1]], [[3, 3], [3, 3]]));