import sys
from collections import deque

sys.stdin = open("data.txt", 'r')

N, M = map(int, input().split(" "))
board = [list(map(str, input())) for _ in range(N)]


def solution(N, M, board):
    answer = "KAKTUS"
    water_pos = []
    Dy, Dx = 0, 0  # 목적지
    Sy, Sx = 0, 0  # 출발지
    for row in range(N):
        for col in range(M):
            if board[row][col] == "D":
                Dy, Dx = row, col
            if board[row][col] == "S":
                Sy, Sx = row, col
            if board[row][col] == "*":
                water_pos.append((row, col))

    water_q = deque(water_pos)
    q = deque([(Sy, Sx)])
    board[Sy][Sx] = 0

    dy = [-1, 1, 0, 0]
    dx = [0, 0, -1, 1]
    while q:
        # 물 확산
        count = len(water_q)
        for _ in range(count):
            water_y, water_x = water_q.popleft()
            for i in range(4):
                water_ny, water_nx = water_y + dy[i], water_x + dx[i]
                if 0 <= water_ny < N and 0 <= water_nx < M \
                        and board[water_ny][water_nx] != "X" and board[water_ny][water_nx] != "D" \
                        and board[water_ny][water_nx] != "*" and type(board[water_ny][water_nx]) != int:
                    water_q.append((water_ny, water_nx))
                    board[water_ny][water_nx] = "*"
        # 이동
        for _ in range(len(q)):
            cur_y, cur_x = q.popleft()
            for i in range(4):
                next_y, next_x = cur_y + dy[i], cur_x + dx[i]

                if (next_y, next_x) == (Dy, Dx):
                    return board[cur_y][cur_x] + 1

                if 0 <= next_y < N and 0 <= next_x < M and board[next_y][next_x] == ".":
                    q.append((next_y, next_x))
                    board[next_y][next_x] = board[cur_y][cur_x] + 1
    return answer


print(solution(N, M, board))
