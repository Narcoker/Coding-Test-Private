from collections import deque

import sys

sys.stdin = open('data.txt')

N, M, R = map(int, input().split(" "))
board = [list(map(int, input().split(" "))) for i in range(N)]

make_visited = [[False for _ in range(M)] for _ in range(N)]
set_visited = [[False for _ in range(M)] for _ in range(N)]
result = [[0 for _ in range(M)] for _ in range(N)]
vectors = [(0, 1), (1, 0), (0, -1), (-1, 0)]


def make_arr(y, x, board, d, start):
    global arr, count

    arr.append(board[y][x])
    make_visited[y][x] = True

    dy, dx = vectors[d]
    next_y = y + dy
    next_x = x + dx

    if (next_y, next_x) == start:
        return

    if (0 <= next_y < len(board) and 0 <= next_x < len(board[0])) and not make_visited[next_y][next_x]:
        make_arr(next_y, next_x, board, d, start)
    else:
        next_d = (d + 1) % 4
        dy, dx = vectors[next_d]
        next_y = y + dy
        next_x = x + dx

        if (next_y, next_x) == start or make_visited[next_y][next_x]:
            return

        make_arr(next_y, next_x, board, next_d, start)


def set_arr(y, x, board, d, start):
    global arr, count

    result[y][x] = arr.popleft()
    set_visited[y][x] = True
    count += 1
    dy, dx = vectors[d]
    next_y = y + dy
    next_x = x + dx

    if (next_y, next_x) == start:
        return

    if (0 <= next_y < len(board) and 0 <= next_x < len(board[0])) and not set_visited[next_y][next_x]:
        set_arr(next_y, next_x, board, d, start)
    else:
        next_d = (d + 1) % 4
        dy, dx = vectors[next_d]
        next_y = y + dy
        next_x = x + dx

        if (next_y, next_x) == start or set_visited[next_y][next_x]:
            return

        set_arr(next_y, next_x, board, next_d, start)


y, x = 0, 0
count = 0
while True:
    if count == N * M:
        break

    if make_visited[y][x] and set_visited[y][x]:
        continue

    target_count = (N-y) * (M-x)
    arr = deque([])
    make_arr(y, x, board, 0, (y, x))
    print(arr)

    arr.rotate(-R)
    # print(arr)

    set_arr(y, x, board, 0, (y, x))
    y += 1
    x += 1

for row in result:
    print(*row)
