import sys

sys.stdin = open('data.txt', 'r')

N, M = map(int, sys.stdin.readline().rstrip().split(" "))

board = []

for i in range(N):
    board.append(list(map(int, sys.stdin.readline().rstrip().split(" "))))

answer = 0

for y in range(N):
    for x in range(M):
        # 가로 일자
        if x + 3 < M:
            result = sum(board[y][x:x + 3 + 1])
            answer = max(answer, result)
        # 세로 일자
        if y + 3 < N:
            result = sum([row[x] for row in board[y:y + 3 + 1]])
            answer = max(answer, result)
        # 정사각형
        if y + 1 < N and x + 1 < M:
            box = [row[x:x + 1 + 1] for row in board[y:y + 1 + 1]]
            result = sum(box[0]) + sum(box[1])
            answer = max(answer, result)
        # 가로 직사각형
        if y + 1 < N and x + 2 < M:
            box = [row[x:x + 2 + 1] for row in board[y:y + 1 + 1]]
            result = sum(box[0]) + sum(box[1])
            box_L = max(result - box[0][0] - box[0][1], result - box[0][1] - box[0][2], result - box[1][0] - box[1][1],
                        result - box[1][1] - box[1][2])
            box_fuck = max(result - box[0][0] - box[0][2], result - box[1][0] - box[1][2])
            box_Z = max(result - box[0][0] - box[1][2], result - box[0][2] - box[1][0])
            answer = max(answer, box_L, box_fuck, box_Z)
        # 세로 직사각형
        if y + 2 < N and x + 1 < M:
            box = [row[x:x + 1 + 1] for row in board[y:y + 2 + 1]]
            result = sum(box[0]) + sum(box[1]) + sum(box[2])
            box_L = max(result - box[0][0] - box[1][0], result - box[1][0] - box[2][0], result - box[0][1] - box[1][1],
                        result - box[1][1] - box[2][1])
            box_fuck = max(result - box[0][0] - box[2][0], result - box[0][1] - box[2][1])
            box_Z = max(result - box[0][0] - box[2][1], result - box[0][1] - box[2][0])
            answer = max(answer, box_L, box_fuck, box_Z)

print(answer)