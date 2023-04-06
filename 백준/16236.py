import sys
from collections import deque

sys.stdin = open('data.txt', 'r')

N = int(sys.stdin.readline().rstrip())

room = []
shark_y = 0
shark_x = 0
shark_size = 2
eat = 0
answer = 0

for y in range(N):
    room.append(list(map(int, sys.stdin.readline().rstrip().split(" "))))
    for x in range(N):
        if room[y][x] == 9:
            room[y][x] = 0
            shark_y = y
            shark_x = x

dy = [0, 0, -1, 1]
dx = [-1, 1, 0, 0]


def search_fish(shark_y, shark_x):
    visited = [[False for _ in range(N)] for _ in range(N)]
    result = []
    queue = deque([(0, shark_y, shark_x)])
    while queue:
        move, cur_y, cur_x = queue.popleft()
        for i in range(4):
            next_y = cur_y + dy[i]
            next_x = cur_x + dx[i]
            if 0 <= next_y < N and 0 <= next_x < N and shark_size >= room[next_y][next_x] and not visited[next_y][
                next_x]:
                queue.append((move + 1, next_y, next_x))
                visited[next_y][next_x] = True
                if shark_size > room[next_y][next_x] and room[next_y][next_x] != 0:
                    result.append((move + 1, next_y, next_x))
    return result


while True:
    can_eat = search_fish(shark_y, shark_x)
    if not can_eat:
        break
    can_eat = sorted(can_eat)
    answer += can_eat[0][0]
    shark_y = can_eat[0][1]
    shark_x = can_eat[0][2]
    room[shark_y][shark_x] = 0
    eat += 1

    if eat == shark_size:
        shark_size += 1
        eat = 0

print(answer)
