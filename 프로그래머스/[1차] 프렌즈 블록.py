def solution(m, n, board):
    answer = 0
    for i in range(m):
        board[i] = list(board[i])
    dy = [0, 0, 1, 1]
    dx = [0, 1, 0, 1]

    while True:
        target = set()
        for row in range(0, m - 1):
            for col in range(0, n - 1):
                block = board[row][col] != "X" \
                        and board[row][col] == board[row][col + 1] \
                        and board[row][col] == board[row + 1][col] \
                        and board[row][col] == board[row + 1][col + 1]

                if block:
                    for i in range(4):
                        ny = row + dy[i]
                        nx = col + dx[i]
                        target.add((ny, nx))
        if len(target) == 0:
            break

        answer += len(target)

        for row, col in target:
            board[row][col] = "X"

        for row in range(0, m-1):
            for col in range(n):
                next_y = row
                while next_y + 1 < m and board[next_y + 1][col] == "X":
                    next_y += 1
                if next_y != row:
                    board[next_y][col] = board[row][col]
                    board[row][col] = "X"
        for row in board:
            print(row)
        print("")

    return answer