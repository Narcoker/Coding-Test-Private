import sys

sys.stdin = open('data.txt', 'r')

N = int(input())
cards = list(map(int, input().split(" ")))
M = int(input())
targets = list(map(int, input().split(" ")))


def binary_search_lower(target, arr):
    start, end = 0, len(arr) - 1
    while start < end:
        mid = (start + end) // 2

        if arr[mid] <= target:
            start = mid + 1
        else:
            end = mid - 1

    return start if arr[start] == target else -1


def binary_search_upper(target, arr):
    start, end = 0, len(arr) - 1
    while start < end:
        mid = (start + end) // 2

        if arr[mid] >= target:
            end = mid
        else:
            start = mid + 1

    return start if arr[start] == target else -1


def solution(N, cards, M, targets):
    answer = []
    cards.sort()

    for target in targets:
        lower = binary_search_lower(target, cards)
        lower = 0 if lower == -1 else lower

        upper = binary_search_upper(target, cards)
        upper = 0 if upper == -1 else upper

        count = lower - upper + 1 if upper != 0 else 0

        answer.append(count)

    return " ".join(answer)


solution(N, cards, M, targets)
