import sys
from collections import deque

# sys.stdin = open('input.txt', 'r')

# X = int(input())


def solution(X):
    queue = deque([(X, 0)])
    is_visited = set([X])
    while queue:
        cur, count = queue.popleft()
        if cur == 1:
            print(count)
            break

        if cur % 3 == 0 and int(cur / 3) not in is_visited:
            queue.append((int(cur / 3), count + 1))
            is_visited.add(int(cur / 3))
        if cur % 2 == 0 and int(cur / 2) not in is_visited:
            queue.append((int(cur / 2), count + 1))
            is_visited.add((int(cur / 2)))
        if cur - 1 > 0 and int(cur - 1) not in is_visited:
            queue.append((int(cur - 1), count + 1))
            is_visited.add(int(cur - 1))

        print(queue, is_visited)
    return


solution(X)
