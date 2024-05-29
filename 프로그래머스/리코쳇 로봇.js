function get_start_pos(board){
    for(let row = 0; row<board.length; row++){
        for(let col = 0; col < board[0].length; col++){
            if(board[row][col] === "R"){
                return [row, col]
            }
        }
    }
}

function move(cur_y, cur_x, dy, dx, board){
    while(true){
        let next_y = cur_y + dy;
        let next_x = cur_x + dx;

        if(0 <= next_y && next_y < board.length &&
           0 <= next_x && next_x < board[0].length &&
           board[next_y][next_x] !== "D"){
            [cur_y, cur_x] = [next_y, next_x]  ;
        }else{
            return [cur_y, cur_x];
        }
    }

}

function solution(board) {
    let [start_y, start_x] = get_start_pos(board);

    const visited = Array.from(new Array(board.length), ()=> new Array(board[0].length).fill(false));
    const queue = [[start_y, start_x, 0]];
    const dy = [-1,1,0,0];
    const dx = [0,0,-1,1];
    while(queue.length){
        let [cur_y, cur_x, count] = queue.shift();

        for(let i = 0; i<dy.length; i++){
            let [next_y, next_x] = move(cur_y, cur_x, dy[i], dx[i], board);

            if(board[next_y][next_x] === "G")
                return count+1;

            if(!visited[next_y][next_x]){
                queue.push([next_y, next_x, count+1])
                visited[next_y][next_x] = true;
            }
        }

    }


    return -1;
}