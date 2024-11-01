import sys

sys.stdin = open('data.txt', 'r')

txt = list(input())
bomb = list(input())

max_count = len(bomb)
count = 0

stack = []

for i in range(len(txt)):
    stack.append(txt[i])

    if stack[len(stack) - len(bomb) : len(stack)] == bomb:
        for _ in range(len(bomb)):
            stack.pop()


answer = "".join(stack) if len(stack) > 0 else "FRULA"
print(answer)