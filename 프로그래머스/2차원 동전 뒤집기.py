def reverse(board, start, vector):
    dy, dx = vector
    cur_y, cur_x = start
    max_row = len(board)
    max_col = len(board[0])
    print(f'start:{start} vector: {vector}')
    while 0 <= cur_y < max_row and 0 <= cur_x < max_col:
        if board[cur_y][cur_x] == 1:
            board[cur_y][cur_x] = 0

        elif board[cur_y][cur_x] == 0:
            board[cur_y][cur_x] = 1

        cur_y += dy
        cur_x += dx

    for row in board:
        print(row)
    print()


def solution(beginning, target):
    result1 = 0

    max_row = len(beginning)
    max_col = len(beginning[0])
    temp = [[beginning[row][col] for col in range(max_col)] for row in range(max_row)]

    for row in range(max_row):
        if temp[row][0] != target[row][0]:
            reverse(temp, (row, 0), (0, 1))
            result1 += 1

    for col in range(max_col):
        if temp[0][col] != target[0][col]:
            reverse(temp, (0, col), (1, 0))
            result1 += 1

    for row in range(max_row):
        for col in range(max_col):
            if temp[row][col] != target[row][col]:
                return -1
    print()

    print()
    print()
    print()
    print()
    result2 = 0
    temp = [[beginning[row][col] for col in range(max_col)] for row in range(max_row)]
    for col in range(max_col):
        if temp[0][col] != target[0][col]:
            reverse(temp, (0, col), (1, 0))
            result2 += 1

    for row in range(max_row):
        if temp[row][0] != target[row][0]:
            reverse(temp, (row, 0), (0, 1))
            result2 += 1

    for row in range(max_row):
        for col in range(max_col):
            if temp[row][col] != target[row][col]:
                return -1

    return min(result1, result2)


print(solution([[0, 0, 1, 0, 0], [1, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0]],
               [[0, 1, 0, 1, 1], [0, 0, 0, 0, 0], [1, 0, 0, 0, 0], [1, 0, 0, 0, 0], [1, 0, 0, 0, 0]]))
