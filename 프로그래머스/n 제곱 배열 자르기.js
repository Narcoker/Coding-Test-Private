function solution(n, left, right) {  
    let answer = [];
    for(let i = left; i <= right; i++){
        let x = Math.floor(i / n);
        let y = i % n;
        let result = Math.max(x,y) + 1;
        answer.push(result);
    }
    
    return answer;
}