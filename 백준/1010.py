import sys

sys.stdin = open("data.txt", 'r')

input = sys.stdin.readline


def solution():
    arr = [[0] * 30 for _ in range(30)]

    for row in range(30):
        for col in range(30):
            if row == 1:
                arr[row][col] = col
            if row == col:
                arr[row][col] = 1
            if row < col:
                arr[row][col] = arr[row - 1][col - 1] + arr[row][col - 1]

    T = int(input())
    for t in range(T):
        N, M = map(int, input().split(" "))
        print(arr[N][M])
    return

solution()
