import sys
from collections import deque

sys.stdin = open('data.txt', 'r')
input = sys.stdin.readline

N = int(input())
queries = input()


def solution(N, queries):
    arr = [["#"] * 101 for _ in range(101)]
    cur_y, cur_x = 50, 50
    min_y, max_y = 50, 50
    min_x, max_x = 50, 50

    arr[cur_y][cur_x] = "."
    dir = deque([(1, 0), (0, 1), (-1, 0), (0, -1)])  # 오른쪽 방향 회전 순서

    for query in queries:
        if query == "L":
            dir.rotate(-1)
        elif query == "R":
            dir.rotate(1)
        elif query == "F":
            dy, dx = dir[0]
            cur_y += dy
            cur_x += dx

            min_y, max_y = min(min_y, cur_y), max(max_y, cur_y)
            min_x, max_x = min(min_x, cur_x), max(max_x, cur_x)

            arr[cur_y][cur_x] = "."

    for row in range(min_y, max_y+1):
        print(''.join(arr[row][min_x:max_x+1]))

    return


solution(N, queries)
