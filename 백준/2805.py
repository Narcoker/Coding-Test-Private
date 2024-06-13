import sys

sys.stdin = open('data.txt', 'r')

N, M = map(int, input().split())
trees = list(map(int, input().split()))
left = 1
right = max(trees)
answer = 0

count_trees = {}

for tree in trees:
    if tree in count_trees.keys():
        count_trees[tree] += 1
    else:
        count_trees[tree] = 1

while left <= right:
    mid = (left + right) // 2
    result = 0

    for tree in count_trees.keys():
        cutting_tree = (tree - mid) * count_trees[tree] if tree - mid >= 0 else 0
        result += cutting_tree

    if result < M:
        right = mid - 1
    else:
        answer = max(answer, mid)
        left = mid + 1

print(answer)
