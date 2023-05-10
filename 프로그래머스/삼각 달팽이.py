from collections import deque
from functools import reduce


def solution(n):
    answer = []
    board = [[0 for col in range(1, row + 1)] for row in range(1, n + 1)]
    num = 1
    y, x = -1, 0
    vector = deque([(1, 0), (0, 1), (-1, -1)])

    for count in range(n, 0, -1):
        for _ in range(count):
            dy, dx = vector[0]
            y = y + dy
            x = x + dx
            board[y][x] = num
            num += 1
        vector.rotate(-1)

    answer = reduce(lambda res, row: res + row, board, [])

    return answer