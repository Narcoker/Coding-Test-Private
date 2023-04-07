import sys
from collections import Counter
from itertools import chain

sys.stdin = open("data.txt", 'r')

r, c, k = map(int, sys.stdin.readline().rstrip().split(" "))
A = []
row = 3
col = 3
answer = -1
for i in range(3):
    A.append(list(map(int, sys.stdin.readline().rstrip().split(" "))))


def func_R(row):  # 모든 열에 대해서 정렬
    max_row = row
    for i in range(len(A)):
        no_zero = list(filter(lambda x: x != 0, A[i]))
        count = list(Counter(no_zero).items())
        sorted_count = sorted(count, key=lambda x: (x[1], x[0]))
        result = list(chain(*sorted_count))
        A[i] = result[:100]
        max_row = max(max_row, len(A[i]))

    for i in range(len(A)):
        A[i] += [0] * (max_row - len(A[i]))

    return


def func_C():  # 모든 행에 대해서 정렬
    global A
    result = None
    max_col = 0
    new_A = []

    for col in range(len(A[0])):
        target_list = [row[col] for row in A]
        no_zero = list(filter(lambda x: x != 0, target_list))
        count = list(Counter(no_zero).items())
        sorted_count = sorted(count, key=lambda x: (x[1], x[0]))
        result = list(chain(*sorted_count))[:100]
        new_A.append(result)
        max_col = max(max_col, len(result))

    for i in range(len(new_A)):
        new_A[i] += [0] * (max_col - len(new_A[i]))

    result_A = [[0 for _ in range(len(new_A))] for _ in range(len(new_A[0]))]

    for y in range(len(result_A)):
        for x in range(len(result_A[0])):
            result_A[y][x] = new_A[x][y]

    A = result_A

    return

if 0 <= r - 1 < len(A) and 0 <= c - 1 < len(A[0]) and A[r - 1][c - 1] == k:
    answer = 0
else:
    for time in range(1, 101):
        if len(A) >= len(A[0]):  # 행 >= 열
            func_R(row)
        else:
            func_C()

        if 0 <= r - 1 < len(A) and 0 <= c - 1 < len(A[0]) and A[r - 1][c - 1] == k:
            answer = time
            break

for row in A:
    print(row)
print(len(A), len(A[0]))

print(answer)
