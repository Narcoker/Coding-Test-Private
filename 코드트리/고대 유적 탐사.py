"""
턴 당 진행 구조 3단계

[탐사 진행]
3x3 선택 후 90도 180도 270도 중에 하나 회전

회전 목표
1. 유물 1차 획득 가치 최대화
2. 각도가 가장 작은 방법
3. 회전 중심의 열이 가장 작은 구간
4. 회전 중심의 행이 가잗 작은 구간

가능 중심 좌표
[
    (1, 1), (1, 2), (1, 3),
    (2, 1), (2, 2), (2, 3),
    (3, 1), (3, 2), (3, 3),
]

[유물 획득]
유물 1차 획득: 상하좌우로 3개 이상 같은 타입 연결된 경우 유물 획득
빈자리 새 유물 생성 : 열 번호가 작은 순으로 조각 생성, 행 번호가 큰 순으로 조각 생성

[유물 연쇄 획득]
새 유물 생성 이후에도 "유물 1차 획득" 조건에 맞으면 유물 획득 가능
유물을 더이상 획득하지 못할때 까지 반복

[입력]

K, M = 2 20
arr
7 6 7 6 7
6 7 6 7 6
6 7 1 5 4
7 6 3 2 1
5 4 3 2 7
new 3 2 3 5 2 4 6 1 3 2 5 6 2 1 5 6 7 1 2 3


[출력]
K번 턴 진행, 각 턴 마다 획득한 유믈의 가치의 총합 출력
K번 턴을 진행하지 못하는 경우 탐사 종료, 종료된 턴에는 아무 값도 출력하지 않음
"""

from collections import deque

import sys

sys.stdin = open('input.txt', 'r')

K, M = map(int, input().split(" "))
board = [list(map(int, input().split(" "))) for _ in range(5)]
new_numbers = list(map(int, input().split(" ")))
number_index = 0

answer = []

rotate_ranges = [
    [(0, 0), (2, 2)],
    [(0, 1), (2, 3)],
    [(0, 2), (2, 4)],

    [(1, 0), (3, 2)],
    [(1, 1), (3, 3)],
    [(1, 2), (3, 4)],

    [(2, 0), (4, 2)],
    [(2, 1), (4, 3)],
    [(2, 2), (4, 4)],
]


def rotate(board, r, rotate_count):
    (start_y, start_x), (end_y, end_x) = r
    result_board = [[board[row][col] for col in range(5)] for row in range(5)]

    target_board = [[board[row][col] for col in range(start_x, end_x + 1)] for row in range(start_y, end_y + 1)]

    if rotate_count == 1:
        for y in range(0, 3):
            for x in range(0, 3):
                result_board[x + start_y][3 - y - 1 + start_x] = target_board[y][x]

    elif rotate_count == 2:
        for y in range(0, 3):
            for x in range(0, 3):
                result_board[3 - y - 1 + start_y][3 - x - 1 + start_x] = target_board[y][x]

    elif rotate_count == 3:
        for y in range(0, 3):
            for x in range(0, 3):
                result_board[3 - x - 1 + start_y][y + start_x] = target_board[y][x]

    # print((start_y, start_x), (end_y, end_x), rotate_count)
    # for row in result_board:
    #     print(row)

    return result_board


def get_treasure(board, r):
    pos = []
    (start_y, start_x), (end_y, end_x) = r

    dy = [-1, 1, 0, 0]
    dx = [0, 0, -1, 1]
    visited = set()

    for y in range(start_y, end_y + 1):
        for x in range(start_x, end_x + 1):
            treasure_type = board[y][x]
            treasure_count = 1;
            # visited = [[False for col in range(5)] for row in range(5)];

            queue = deque([(y, x)])
            # visited[y][x] = True
            visited.add((y, x))
            log = [(y, x)]
            while queue:
                cur_y, cur_x = queue.popleft()
                for i in range(4):
                    next_y = cur_y + dy[i]
                    next_x = cur_x + dx[i]
                    # if 0<=next_y<5 and 0<=next_x<5 and board[next_y][next_x] == treasure_type and not visited[next_y][next_x]:
                    if 0 <= next_y < 5 and 0 <= next_x < 5 and board[next_y][next_x] == treasure_type and (
                            next_y, next_x) not in visited:
                        queue.append((next_y, next_x))
                        # visited[next_y][next_x] = True
                        visited.add((next_y, next_x))
                        log.append((next_y, next_x))

            if len(log) >= 3:
                # print(f'보물 타입: {treasure_type}, {(y, x)}')
                pos.extend(log)

    return pos


for turn in range(K):
    # -탐사 진행-
    max_treasure_count = 0
    max_board = []
    min_rotate_count = 4
    rotate_pos = (5, 5)
    rotate_range = [(0, 0), (0, 0)]
    treasure_pos = []

    for rotate_count in range(1, 4):  # 90 회전 횟수 선택(1~3)
        for r in rotate_ranges:  # 회전 범위 선택
            (start_y, start_x), (end_y, end_x) = r
            center_y = (start_y + end_y) // 2
            center_x = (start_x + end_x) // 2

            rotated_board = rotate(board, r, rotate_count)  # 회전 - 함수 구현(return board)

            pos = get_treasure(rotated_board, r)  # 유물 획득 - 함수 구현(return 수집된 칸들의 배열)
            # print(f'{pos}')

            if len(pos) > max_treasure_count:  # 유물 가치가 최대치 수치보다 크다면
                max_treasure_count = len(pos)  # 최대치 초기화
                max_board = rotated_board
                min_rotate_count = rotate_count
                rotate_pos = (center_y, center_x)
                rotate_range = r
                treasure_pos = pos

            elif len(pos) == max_treasure_count:  # 유물 가치가 최대치 수치와 같다면
                if rotate_count < min_rotate_count:  # 각도가 최대지 각도보다 작다면
                    max_treasure_count = len(pos)  # 최대치 초기화
                    max_board = rotated_board
                    min_rotate_count = rotate_count
                    rotate_pos = (center_y, center_x)
                    rotate_range = r
                    treasure_pos = pos

                elif rotate_count == min_rotate_count:  # 각도가 최대기 각도와 같다면
                    if center_x < rotate_pos[1]:  # 회전 중심의 열이 작다면
                        max_treasure_count = len(pos)  # 최대치 초기화
                        max_board = rotated_board
                        min_rotate_count = rotate_count
                        rotate_pos = (center_y, center_x)
                        rotate_range = r
                        treasure_pos = pos

                    elif center_x == rotate_pos[1]:  # 회전 중심의 열이 같다면
                        if center_y < rotate_pos[0]:  # 회전 중심의 행이 작은 것으로 초기화
                            max_treasure_count = len(pos)  # 최대치 초기화
                            max_board = rotated_board
                            min_rotate_count = rotate_count
                            rotate_pos = (center_y, center_x)
                            rotate_range = r
                            treasure_pos = pos
            # print()
    #
    # for row in max_board:
    #     print(row)
    # print(f'max_treasure_count: {max_treasure_count}')
    # print(f'min_rotate_count: {min_rotate_count}')
    # print(f'rotate_pos: {rotate_pos}')
    # print(f'rotate_range: {rotate_range}')
    # print(f'treasure_pos: {treasure_pos}')
    # print()
    # print()
    if max_treasure_count == 0:
        break

    count = 0

    # print(treasure_pos)
    while max_treasure_count > 0:  # While(유물 획득 수가 0보다 큰 경우)
        treasure_pos.sort(key=lambda data: [data[1], 5 - data[0] - 1])

        # 유물 획득
        for y, x in treasure_pos:
            if number_index < M:
                max_board[y][x] = new_numbers[number_index]
            else:
                max_board[y][x] = 0
            number_index += 1
        # 획득 수 누적
        count += max_treasure_count
        treasure_pos = get_treasure(max_board, [(0, 0), (4, 4)])
        max_treasure_count = len(treasure_pos)

    answer.append(count)  # answer 배열에 누적 획득 수 append
    board = max_board

print(" ".join(map(str,answer)))
