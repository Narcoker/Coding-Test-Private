import sys
from collections import deque

sys.stdin = open('data.txt', 'r')

N, M = map(int, sys.stdin.readline().rstrip().split(" "))
r, c, d = map(int, sys.stdin.readline().rstrip().split(" "))

room = []
for i in range(N):
    room.append(list(map(int, sys.stdin.readline().rstrip().split(" "))))

# 0 1 2 3 : 북 동 남 서
cur_direction = deque([(i + d) % 4 for i in range(4, 0, -1)])


def turn_on(r, c):
    global answer

    if room[r][c] == 0:
        room[r][c] = 2
        answer += 1

    count = 0
    if (0 <= r - 1 < N) and (room[r - 1][c]) == 0:
        count += 1
    if (0 <= r + 1 < N) and (room[r + 1][c]) == 0:
        count += 1
    if (0 <= c + 1 < M) and (room[r][c + 1]) == 0:
        count += 1
    if (0 <= c - 1 < M) and (room[r][c - 1]) == 0:
        count += 1

    if count == 0:  # 빈칸이 없는 경우
        if cur_direction[0] == 0:  # 아래로
            if 0 < r + 1 < N - 1:
                if room[r + 1][c] == 1:
                    return
                else:
                    turn_on(r + 1, c)
        elif cur_direction[0] == 1:  # 왼쪽으로
            if 0 < c - 1 < M - 1:
                if room[r][c - 1] == 1:
                    return
                else:
                    turn_on(r, c - 1)
        elif cur_direction[0] == 2:  # 위로
            if 0 < r - 1 < N - 1:
                if room[r - 1][c] == 1:
                    return
                else:
                    turn_on(r - 1, c)
        elif cur_direction[0] == 3:  # 오른쪽으로
            if 0 < c + 1 < M - 1:
                if room[r][c + 1] == 1:
                    return
                else:
                    turn_on(r, c + 1)
    else:  # 빈칸이 있는 경우
        for _ in range(4):
            cur_direction.rotate(-1)
            if cur_direction[0] == 0:  # 위
                if (0 <= r - 1 < N) and (room[r - 1][c] == 0):
                    turn_on(r - 1, c)
                    break
            elif cur_direction[0] == 1:  # 오른쪽
                if (0 <= c + 1 < M) and (room[r][c + 1] == 0):
                    turn_on(r, c + 1)
                    break
            elif cur_direction[0] == 2:  # 아래
                if (0 <= r + 1 < N) and (room[r + 1][c] == 0):
                    turn_on(r + 1, c)
                    break
            elif cur_direction[0] == 3:  # 왼쪽
                if (0 <= c - 1 < M) and (room[r][c - 1] == 0):
                    turn_on(r, c - 1)
                    break


answer = 0
turn_on(r, c)
print(answer)
