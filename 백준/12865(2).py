import sys

sys.stdin = open('input.txt', 'r')

N, K = map(int, input().split()) # 4, 7(최대 무게)
items = [(0,0)]
for _ in range(N):
    weight, value = map(int, input().split())
    items.append((weight, value))

dp = [[0 for _ in range(K+1)] for _ in range(N+1)]

for item_index in range(1, N+1):
    weight, value = items[item_index] # 현재 아이템

    for bag_weight in range(1, K+1):
        if weight > bag_weight:
            dp[item_index][bag_weight] = dp[item_index-1][bag_weight]
        else:
            dp[item_index][bag_weight] = max(dp[item_index-1][bag_weight], dp[item_index-1][bag_weight-weight] + value)

print(dp[N][K])

print(items)