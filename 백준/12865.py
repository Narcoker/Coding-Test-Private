import sys

sys.stdin = open("data.txt", 'r')

input = sys.stdin.readline

N, K = map(int, input().split(" "))
items = [(0, 0)]

for _ in range(N):
    w, v = map(int, input().split(" "))
    items.append((w, v))


def solution(N, K, items):
    dp = [[0] * (K + 1) for _ in range(N + 1)]

    for i in range(1, N + 1):
        weight, value = items[i]

        for j in range(1, K + 1):
            if j < weight:
                dp[i][j] = dp[i - 1][j]
            else:
                dp[i][j] = max(dp[i - 1][j], value + dp[i - 1][j - weight])

    print(dp[N][K])
    return


solution(N, K, items)
