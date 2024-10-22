import sys

sys.stdin = open('input.txt', 'r')

N, M = map(int, input().split())


def back_tracking(answer, prev):
    if len(answer) == M:
        print(*answer)
        return

    for i in range(1, N + 1):
        if prev <= i:
            answer.append(i)
            back_tracking(answer, i)
            answer.pop()


def solution(N, M):
    answer = []
    back_tracking(answer, 0)
    return


solution(N, M)
