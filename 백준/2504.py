import sys

sys.stdin = open('data.txt', 'r')
input = sys.stdin.readline

data = input()


def solution(data):
    stack = []
    answer = 0
    temp = 1
    for i, ch in enumerate(data):
        if ch == '(':
            temp *= 2
            stack.append(ch)

        elif ch == '[':
            temp *= 3
            stack.append(ch)

        elif ch == ')':
            if not stack or stack[-1] != '(':
                return 0
            if data[i - 1] == '(':
                answer += temp
            temp //= 2
            stack.pop()

        elif ch == ']':
            if not stack or stack[-1] != '[':
                return 0
            if data[i - 1] == '[':
                answer += temp
            temp //= 3
            stack.pop()
    return answer if not stack else 0


print(solution(data))
