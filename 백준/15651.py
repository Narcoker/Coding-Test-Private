import sys

sys.stdin = open('input.txt', 'r')

N, M = map(int, input().split())

def back_tracking(answer):
    if len(answer) == M:
        print(*answer)
        return

    for i in range(1, N+1):
        answer.append(i)
        back_tracking(answer)
        answer.pop()

def solution(N, M):
    answer = []
    back_tracking(answer)
    return


solution(N, M)
