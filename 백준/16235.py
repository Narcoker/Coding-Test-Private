import sys
from collections import deque

N, M, K = map(int, sys.stdin.readline().rstrip().split(" "))
dy = [0, 0, -1, 1, -1, -1, 1, 1]
dx = [-1, 1, 0, 0, -1, 1, -1, 1]
A = []
rand = []
tree = set()
for i in range(N):
    A.append(list(map(int, sys.stdin.readline().rstrip().split(" "))))
    rand.append([[5, deque()] for _ in range(N)])

for i in range(M):
    y, x, age = map(int, sys.stdin.readline().rstrip().split(" "))
    tree.add((y - 1, x - 1))
    rand[y - 1][x - 1][1].append(age)

def spring_summer():
    global tree
    new_tree = set(tree)

    for y, x in tree:
        die_tag = False
        for index, age in enumerate(rand[y][x][1]):
            if die_tag:
                break
            if 0 < age <= rand[y][x][0]:
                rand[y][x][0] -= age
                rand[y][x][1][index] += 1
            else:
                die_tag = True
                die = list(rand[y][x][1])[index:]
                rand[y][x][1] = deque(list(rand[y][x][1])[:index])
                for die_age in die:
                    rand[y][x][0] += die_age // 2
                if len(rand[y][x][1]) == 0:
                    new_tree.remove((y, x))
                    break
    tree= new_tree

def fall():
    global tree
    new_tree = set(list(tree))
    for y, x in tree:
        for index, age in enumerate(rand[y][x][1]):
            if age % 5 == 0:
                for i in range(8):
                    gen_y = y + dy[i]
                    gen_x = x + dx[i]
                    if 0 <= gen_y < N and 0 <= gen_x < N:
                        rand[gen_y][gen_x][1].appendleft(1)
                        new_tree.add((gen_y, gen_x))
    tree = new_tree


def winter():
    for y in range(N):
        for x in range(N):
            rand[y][x][0] += A[y][x]
    return

for year in range(K):
    spring_summer()
    fall()
    winter()

answer = 0

for y in range(N):
    for x in range(N):
        answer += len(rand[y][x][1])
print(answer)