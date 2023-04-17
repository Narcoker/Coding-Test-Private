import sys
from collections import deque

sys.stdin = open('data.txt', 'r')

M, N, H = map(int, sys.stdin.readline().split(" "))

answer = 0
box = [[] for _ in range(H)]
q = deque()
visited = [[[False] * M for _ in range(N)] for _ in range(H)]
remain = 0
for h in range(H):
    for i in range(N):
        row = list(map(int, sys.stdin.readline().split(" ")))
        box[h].append(row)

        for k in range(M):
            if box[h][i][k] == 1:
                q.append((h, i, k, 0))
            if box[h][i][k] == 0:
                remain += 1

pos = [(0, 0, -1), (0, 0, 1), (0, -1, 0), (0, 1, 0), (-1, 0, 0), (1, 0, 0)]

while q:
    cur_h, cur_y, cur_x, days = q.popleft()
    for next_pos in pos:
        dh, dy, dx = next_pos
        next_h = cur_h + dh
        next_y = cur_y + dy
        next_x = cur_x + dx

        if 0 <= next_h < H and 0 <= next_y < N and 0 <= next_x < M \
                and not visited[next_h][next_y][next_x] and box[next_h][next_y][next_x] == 0:
            q.append((next_h, next_y, next_x, days + 1))
            visited[next_h][next_y][next_x] = True
            answer = max(answer, days + 1)
            remain -= 1

if remain:
    print(-1)
else:
    print(answer)
