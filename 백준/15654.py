import sys

sys.stdin = open('input.txt', 'r')

N, M = map(int, input().split())
arr = list(map(int, input().split()))

def back_tracking(arr, visited, answer):
    if len(answer) == M:
        print(*answer)
        return

    for i in range(len(arr)):
        if not visited[i]:
            visited[i] = True
            answer.append(arr[i])
            back_tracking(arr, visited, answer)
            visited[i] = False
            answer.pop()


def solution(N, M, arr):
    answer = []
    visited = [False] * N
    arr.sort()
    back_tracking(arr, visited,answer)
    return

solution(N,M, arr)