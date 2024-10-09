"""
[1초 마다 이동]
1. 상하좌우로 빈칸으로 이동
2. 다음 칸은 현재 칸보다 출구 까지의 거리가 가까워야
3. 움직일 수 있는 칸이 2개 이상이면 상하로 움직이는 것을 우선시
4. 움직일 수 없으면 움직이지 않음
5. 한칸에 2명 이상 존재 가능

[이동 후 회전]
1. 한명 이상의 참가자와 출구를 포함한 가장 작은 정사각형 찾기
2. 조건에 해당하는 사각형이 여러개일 경우 좌상단에 있는거 사용
3. 시계방향 90도 회전 후 회전 된 벽 내구도 1 깎기

[입력]
N: 미로의 크기 (4≤N≤10)
M: 참가자 수 (1≤M≤10)
K: 게임 시간 (1≤K≤100)

5 3 8 # N, M, K
0 0 0 0 1 # 미로 정보
9 2 2 0 0
0 1 0 1 0
0 0 0 1 0
0 0 0 0 0
1 3 # 참가자 최초 위치
3 1
3 5
3 3

[출력]
모든 참가자들의 이동거리 합과 출구 좌표
"""

from collections import deque

import sys

sys.stdin = open('input.txt', 'r')

N, M, K = map(int, input().split())
maze = [list(map(int, input().split())) for _ in range(N)]
persons = deque()
for _ in range(M):
    y, x = map(int, input().split())
    persons.append((y - 1, x - 1))
exit_pos_y, exit_pos_x = map(int, input().split())
exit_pos = (exit_pos_y - 1, exit_pos_x - 1)

vectors = [(-1, 0), (1, 0), (0, -1), (0, 1)]
answer = 0


def get_min_distance(pos1, pos2):
    y1, x1 = pos1
    y2, x2 = pos2
    return abs(x1 - x2) + abs(y1 - y2)


def get_min_square_range(persons, exit_pos, N):
    for amount in range(1, N):  # 정사각형 범위 순회(1~N-1)
        for start_y in range(0, N):  # y축 정방향 전체 순회
            for start_x in range(0, N):  # x축 정방향 전체 순회 - 좌상단 모서리 찾기
                # 우하단 계산 - 우하단 모서리 찾기
                end_y = start_y + amount
                end_x = start_x + amount

                if not (0 <= end_y < N and 0 <= end_x < N):  # 우하단이 범위 밖인 경우:
                    continue  # continue

                has_person = False  # 사람 유무 = False
                has_exit = False  # 출구 츄무 = False

                for y_in_square in range(start_y, end_y + 1):  # y축 정사각형 범위 순회
                    for x_in_square in range(start_x, end_x + 1):  # x축 정사각형 범위 순회
                        if (y_in_square, x_in_square) in persons:  # 사람 칸이면:
                            has_person = True  # 사람 유무 True
                        if (y_in_square, x_in_square) == exit_pos:  # 출구 칸이면:
                            has_exit = True  # 출구 유무 True

                        if has_person and has_exit:  # 사람있고 출구 있으면:
                            return (start_y, start_x), (end_y, end_x)  # 범위 반환


for sec in range(1, K + 1):  # 턴 순회
    if len(persons) == 0:  # 참가자 빈 deque일 경우:
        break  # break

    # 이동
    cur_persons_len = len(persons)  # 현재 참가자 수 변수 할당
    for _ in range(cur_persons_len):  # 참가자 수 만큼 for문
        cur_y, cur_x = persons.popleft()  # cur_y, cur_X 참가자 현재 위치 - 참가자 popleft()
        min_distance = get_min_distance((cur_y, cur_x), exit_pos)  # 최단 이동 거리 - 초기 값 현재 위치 부터 출구 까지 거리
        result_y, result_x = (cur_y, cur_x)  # 갈 위치 - 초기값 현재 위치

        for i in range(len(vectors)):  # 다음 칸("상하좌우 순서" 로 순회 - 우선 순위 충족)
            # 다음 칸 만들기
            dy, dx = vectors[i]
            next_y = cur_y + dy
            next_x = cur_x + dx

            if not (0 <= next_y < N and 0 <= next_x < N):  # 만약 다음 칸이 미로 밖인 경우
                continue  # continue

            if type(maze[next_y][next_x]) == int and maze[next_y][next_x] > 0:  # 만약 다음 칸이 벽인 경우
                continue  # continue

            next_distance = get_min_distance((next_y, next_x), exit_pos)
            if next_distance < min_distance:  # 다음 칸과 출구의 이동거리 < 최단 이동 거리:
                min_distance = next_distance  # 최단 이동 거리 초기화
                result_y, result_x = next_y, next_x  # 갈 위치 초기화

        answer += get_min_distance((result_y, result_x), (cur_y, cur_x))  # 이동 거리 계산 후 answer에 누적

        if (result_y, result_x) != exit_pos:  # 현재 참가자 위치가 출구가 아니면
            persons.append((result_y, result_x))  # 참가자.append((갈 위치))

    if len(persons) == 0:
        break

    """
    [이동 후 회전]
    1. 한명 이상의 참가자와 출구를 포함한 가장 작은 정사각형 찾기
    2. 조건에 해당하는 사각형이 여러개일 경우 좌상단에 있는거 사용
    3. 시계방향 90도 회전 후 회전 된 벽 내구도 1 깎기
    """
    # 회전
    (start_y, start_x), (end_y, end_x) = get_min_square_range(persons, exit_pos, N)  # 정사각형 범위 할당
    N_square = end_x - start_x + 1  # 정사각형 N 할당

    print(f'회전 범위: {(start_y, start_x), (end_y, end_x)}')

    for row in maze:
        print(" ".join(map(str, row)))

    print()

    # 미로 회전
    square = [[maze[row][col] for col in range(start_x, end_x + 1)] for row in range(start_y, end_y + 1)]  # 회전 범위 복사
    for y in range(0, N_square):  # 회전 범위 y축 순회
        for x in range(0, N_square):  # 회전 범위 x축 순회
            maze[x + start_y][N_square - y - 1 + start_x] = square[y][
                x]  # 미로 회전 next_maze[x+좌상단y][N-y-1+좌상단x] = maze[y][x]

            if maze[x + start_y][N_square - y - 1 + start_x] > 0:  # next_maze[x+좌상단y][N-y-1+좌상단x]가 숫자고 0보다 크면:
                maze[x + start_y][N_square - y - 1 + start_x] -= 1  # 내구도 감소, next_maze[x+좌상단y][N-y-1+좌상단x] -= 1

    # 사람 회전
    persons_count = len(persons)
    for _ in range(persons_count):
        cur_y, cur_x = persons.popleft()

        if start_y <= cur_y <= end_y and start_x <= cur_x <= end_x:
            temp_y = cur_y - start_y  # 원점 좌표로 y 이동
            temp_x = cur_x - start_x  # 원점 좌표로 x 이동

            rotated_y, rotated_x = temp_x + start_y, N_square - temp_y - 1 + start_x
            persons.append((rotated_y, rotated_x))  # 회전된 경우 변경값 투입
            continue

        persons.append((cur_y, cur_x))  # 회전 안된 경우 그대로 재투입

    for row in maze:
        print(" ".join(map(str, row)))

    print()

    # 출구 회전
    temp_y = exit_pos[0] - start_y  # 원점 좌표로 y 이동
    temp_x = exit_pos[1] - start_x  # 원점 좌표로 x 이동

    exit_pos = (temp_x + start_y, N_square - temp_y - 1 + start_x)

    print(f"회전된 출구 위치: {exit_pos}")
    print(f"회전후 사람 위치: {persons}")
    print(f'{sec}초 종료')
    print()

print(answer)
print(f'{exit_pos[0] + 1} {exit_pos[1]+1}')
