import sys
from collections import deque

sys.stdin = open('data.txt', 'r')

N, K = map(int, sys.stdin.readline().split(" "))


def solution(N, K):
    visited = [-1] * 100001
    q = deque([(N, 0)])

    while q:
        cur, time = q.popleft()
        if cur == K:
            print(time)

            path = []
            for _ in range(time + 1):
                path.append(cur)
                cur = visited[cur]
            print(*path[::-1])
            return

        for next_pos in [cur - 1, cur + 1, cur * 2]:
            if 0 <= next_pos < 100001 and visited[next_pos] == -1:
                q.append((next_pos, time + 1))
                visited[next_pos] = cur
    return


solution(N, K)
