import sys
from itertools import combinations

sys.stdin = open("data.txt", "r")

def get_favor(food_parts):
    result = 0
    for i, j in list(combinations(food_parts, 2)):
        result += arr[i][j] + arr[j][i]
    return result


def make_foods(parts):
    result = []
    for i in range(len(parts)//2):
        food1 = get_favor(parts[i])
        food2 = get_favor(parts[-i - 1])
        result.append(abs(food1 - food2))
    return min(result)



N = int(input())
arr = []
answer = []
for i in range(N):
    arr.append(list(map(int, input().rstrip().split(" "))))
parts = list(combinations([i for i in range(N)], N // 2))
answer = make_foods(parts)
print(answer)