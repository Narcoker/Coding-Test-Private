import sys

sys.stdin = open('input.txt', 'r')

N, M = map(int, input().split())
arr = list(map(int, input().split()))


def back_tracking(answer, visited, prev):
    if len(answer) == M:
        print(*answer)
        return
    used = set()
    for i in range(N):
        if not visited[i] and arr[i] not in used and prev <= arr[i]:
            visited[i] = True
            answer.append(arr[i])
            back_tracking(answer, visited, arr[i])
            visited[i] = False
            answer.pop()
            used.add(arr[i])
    return


def solution(N, M, arr):
    answer = []
    visited = [False] * N

    arr.sort()

    back_tracking(answer, visited, 0)

    return


solution(N, M, arr)
