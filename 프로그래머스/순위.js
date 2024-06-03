function solution(n, results) {
    var answer = 0;
    const board = Array.from(new Array(n+1), ()=> new Array(n+1).fill(0));

    for(let [winner, loser] of results){
        board[winner][loser] = 1;
        board[loser][winner] = -1;
    }

    for(let mid = 1; mid <= n; mid++){
        for(let start = 1; start <= n; start++){
            for(let end = 1; end <= n; end++){
                if(board[start][mid] === 1 && board[mid][end] === 1){
                    board[start][end] = 1;
                }
                if(board[start][mid] === -1 && board[mid][end] === -1){
                    board[start][end] = -1;
                }
            }
        }
    }

    for(let person = 1; person <= n; person++){
        let result_count = 1;
        for(let enemy = 1; enemy <= n; enemy++){
            if(person === enemy) continue

            if(board[person][enemy] != 0){
                result_count++;
            }
        }

        if(result_count === n){
            answer++;
        }
    }
    return answer;
}