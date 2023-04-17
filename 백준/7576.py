import sys
from collections import deque

sys.stdin = open("data.txt", 'r')

answer = 0
M, N = map(int, sys.stdin.readline().split(" "))
remain = N * M
box = []
q = deque()
visited = [[False] * M for _ in range(N)]
for i in range(N):
    row = list(map(int, sys.stdin.readline().split(" ")))
    box.append(row)

    for k in range(M):
        if row[k] == 1:
            q.append((i, k, 0))
            visited[i][k] = True
            remain -= 1
        if row[k] == -1:
            remain -= 1

dy = [0, 0, -1, 1]
dx = [-1, 1, 0, 0]

while q:
    cur_y, cur_x, days = q.popleft()
    for i in range(4):
        next_y = cur_y + dy[i]
        next_x = cur_x + dx[i]
        if 0 <= next_y < N and 0 <= next_x < M and box[next_y][next_x] != -1 and not visited[next_y][next_x]:
            q.append((next_y, next_x, days + 1))
            remain -= 1
            visited[next_y][next_x] = True
            answer = max(answer, days + 1)

if remain:
    print(-1)
else:
    print(answer)
