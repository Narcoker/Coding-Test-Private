import sys
from collections import deque

N, L, R = map(int, sys.stdin.readline().rstrip().split(" "))

country = []
answer = 0
moved_tag = False
dy = [-1, 1, 0, 0]
dx = [0, 0, -1, 1]

for i in range(N):
    country.append(list(map(int, sys.stdin.readline().rstrip().split(" "))))


def bfs(y, x):
    q = deque([(y, x)])
    visited[y][x] = True
    log = [(y,x)]
    count = country[y][x]
    while q:
        cur_y, cur_x = q.popleft()

        for i in range(4):
            next_y = cur_y + dy[i]
            next_x = cur_x + dx[i]

            if 0 <= next_y < N and 0 <= next_x < N and not visited[next_y][next_x] and L <= abs(
                    country[cur_y][cur_x] - country[next_y][next_x]) <= R:
                log.append((next_y, next_x))
                visited[next_y][next_x] = True
                q.append((next_y, next_x))
                count += country[next_y][next_x]

    for y,x in log:
        country[y][x] = count // len(log)

    return len(log)


while True:
    move = False
    visited = [[False] * N for _ in range(N)]
    for y in range(N):
        for x in range(N):
            day_log = []
            if not visited[y][x]:
                if bfs(y, x) > 1:
                    move = True

    if not move:
        break
    answer += 1

print(answer)