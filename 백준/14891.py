import sys

sys.stdin = open("data.txt", "r")

from collections import deque

wheel = []
answer = 0
for i in range(4):
    wheel.append(deque(map(int, list(input()))))


def rotate(cur, direction):
    directions[cur] += direction
    visited[cur] = True
    if cur != 3 and not visited[cur + 1] and wheel[cur][2] != wheel[cur + 1][-2]:  # 오른쪽
        rotate(cur + 1, -direction)

    if cur != 0 and not visited[cur - 1] and wheel[cur][-2] != wheel[cur - 1][2]:  # 왼쪽
        rotate(cur - 1, -direction)
    return

K = int(input())

for count in range(K):
    start, direction = map(int, input().split(" "))
    start -= 1
    visited = [False] * 4
    visited[start] = True
    directions = [0, 0, 0, 0]
    directions[start] = direction

    if start != 3 and wheel[start][2] != wheel[start + 1][-2]:  # 오른쪽
        rotate(start + 1, -direction)
    if start != 0 and wheel[start][-2] != wheel[start - 1][2]:  # 왼쪽
        rotate(start - 1, -direction)

    for index, i in enumerate(directions):
        wheel[index].rotate(i)

for i in range(4):
    answer += wheel[i][0] * (2 ** i)
print(answer)
