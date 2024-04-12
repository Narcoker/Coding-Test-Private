import sys

sys.stdin = open("input.txt", "r")

vectors = [(1, 1), (1, -1), (-1, -1), (-1, 1)]


def search(board, y, x, result, v_i, root, count, start):
    global answer

    if count == 5:
        return

    # 같은 방향
    dy, dx = vectors[v_i]
    next_y = y + dy
    next_x = x + dx

    if (next_y, next_x) == start:
        answer = max(answer, len(result))
        # print(f'result: {result} root: {root}], answer: {answer}')
        return

    if (0 <= next_y < len(board) and 0 <= next_x < len(board)) and not board[next_y][next_x] in result:
        next_result_1 = [r for r in result]
        next_result_1.append(board[next_y][next_x])
        next_root_1 = [r for r in root]
        next_root_1.append((next_y, next_x))

        search(board, next_y, next_x, next_result_1, v_i, next_root_1, count, start)

    # 회전
    dy, dx = vectors[v_i]
    next_y = y + dy
    next_x = x + dx

    if (0 <= next_y < len(board) and 0 <= next_x < len(board)) and not board[next_y][next_x] in result:
        next_result_2 = [r for r in result]
        next_result_2.append(board[next_y][next_x])
        next_root_2 = [r for r in root]
        next_root_2.append((next_y, next_x))
        next_v_i = (v_i + 1) % 4
        search(board, next_y, next_x, next_result_2, next_v_i, next_root_2, count + 1, start)


answer = 0
T = int(input())
for test_case in range(1, T + 1):
    answer = 0
    N = int(input())
    board = [list(map(int, input().split(" "))) for _ in range(N)]

    for row in range(N):
        for col in range(N):
            search(board, row, col, [board[row][col]], 0, [(row, col)], 1, (row, col))

    # search(board, 0, 1, [board[0][1]], 0, [(0, 1)], 1)

    print(f'#{test_case} {answer if answer > 0 else -1}')
