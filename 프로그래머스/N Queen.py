import time

def set_Queen(cur_y, cur_x, board, count, n):
    global answer

    if can_set_count(board) < n - count:
        return

    if count == n:
        answer += 1
        return

    for next_y in range(n):
        for next_x in range(n):
            if cur_y * 10 + cur_x > next_y * 10 + next_x:
                continue
            if 0 <= next_y < n and 0 <= next_x < n and board[next_y][next_x] == True:
                new_board = set_board(next_y, next_x, board, n)
                set_Queen(next_y, next_x, new_board, count + 1, n)


def set_board(y, x, board, n):
    result = [[board[row][col] for col in range(n)] for row in range(n)]
    vectors = [
        (-1, -1), (-1, 0), (-1, 1),
        (0, -1), (0, 1),
        (1, -1), (1, 0), (1, 1),
    ]

    for dy, dx in vectors:
        cur_y, cur_x = y, x
        while 0 <= cur_y < n and 0 <= cur_x < n:
            result[cur_y][cur_x] = False
            cur_y += dy
            cur_x += dx

    return result


def can_set_count(board):
    result = 0
    n = len(board)
    for row in range(n):
        for col in range(n):
            if board[row][col]:
                result += 1

    return result

def solution(n):
    global answer
    answer = 0
    board = [[True for _ in range(n)] for _ in range(n)]
    for y in range(n):
        for x in range(n):
            new_board = set_board(y, x, board, n)
            set_Queen(y, x, new_board, 1, n)

    return answer

start = time.time()
print(solution(9))
end = time.time()

print(end - start)