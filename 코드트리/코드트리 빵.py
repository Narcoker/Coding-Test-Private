import sys

sys.stdin = open("input.txt", 'r')
#
# n, m = map(int, input().split())
# maze = [list(map(int, input().split())) for _ in range(n)]
# persons = [(-1, -1) for _ in range(m)]
# target_stores = []
# for _ in range(m):
#     y, x = map(int, input().split())
#     target_stores.append((y - 1, x - 1))
#
# used_stores = set()
# basecamps = []
# used_basecamps = set([(1,1)])
#
# for row in range(n):
#     for col in range(n):
#         if maze[row][col] == 1:
#             basecamps.append((row, col))
#
# """
# 1은 베이스 캠프
#
# 5 3
# 0 0 0 0 0
# 1 0 0 0 1
# 0 0 0 0 0
# 0 1 0 0 0
# 0 0 0 0 1
# 2 3 # 사람 별로 가고자 하는 편의점
# 4 4
# 5 1
#
# """
#
# """
# 본인이 가고 싶은 편의점 방향으로 1칸
# |x1-x2| + |y1-y2| 최단 거리로 이동해야 하며  ↑, ←, →, ↓ 의 우선 순위
# 편의점에 도착하면 해당 편의점에서 멈추고 다음 턴 부터 사람이 있는 편의점은 지날 수 없음
#
# 현재 시간이 t분이고 전체 사람 수보다 작으면 t번 사람은 자신이 가고싶은 편의점과 가장 가까이 있는 베이스 캠프로 들어감
# 가장 가까운 베이스 캠프가 여러가지 인 경우 행, 열 작은 순으로 들어감
# 들거나 순간 부터 베이스캠프가 있는 곳 못 들어감
# """
#
#
# def get_min_distance(pos1, pos2):
#     y1, x1 = pos1
#     y2, x2 = pos2
#     return abs(y1 - y2) + abs(x1 - x2)
#
#
# time = 1
# vectors = [(-1, 0), (0, -1), (0, 1), (1, 0)]
#
# while True:  # 무한 반복
#     cur_time_used_stores = set()  # cur_time_used_stores = set()
#     max_person = time
#     if max_person > m:
#         max_person = m
#
#     for i in range(0, max_person):  # 사람 순회 range(0 ~ time)
#         if persons[i] == target_stores[i]:
#             continue
#
#         if persons[i] == (-1, -1):  # 만약 아직 격자에 없다면: (-1,-1)
#             # 자신이 가고 싶은 편의점과 가장 가까이 있는 베이스 캠프로 이동
#             basecamps.sort(
#                 key=lambda pos: [-get_min_distance(target_stores[i], pos), -pos[0],
#                                  -pos[1]])  # basecamp.sort() 거리 순, 행, 열
#             target_y, target_x = basecamps.pop()  # target_y, target_x = basecamps.pop() # 들어갈 베이스 캠프 위치 가져오기
#             persons[i] = (target_y, target_x)  # 사람 이동
#             used_basecamps.add((target_y, target_x))  # 베이스 캠프 사용
#
#         else:  # 만약 격자에 있다면
#             min_distance = 99999999  # min_distance = 현재위치와 가고자하는 편의점 위치의 최단 거리 구하기
#
#             cur_y, cur_x = persons[i]
#             for dy, dx in vectors:  # 4방향 순회:
#                 next_y = cur_y + dy  # 다음 위치 구하기
#                 next_x = cur_x + dx
#
#                 if not (0 <= next_y < n and 0 <= next_x < n):  # 벽이면
#                     continue  # continue
#
#                 if (next_y, next_x) in used_basecamps:  # 만약 다음 위치가 "사용된 베이스 캠프" 이거나 이전 턴에 사용된 편의점이면:
#                     continue  # continue
#
#                 if (next_y, next_x) in used_stores:
#                     continue  # continue
#
#                 next_distance = get_min_distance((next_y, next_x),
#                                                  target_stores[i])  # 다음 위치와 가고자하는 편의점 위치의 최단 거리 구하기 next_distance
#                 if next_distance < min_distance:  # 만약 min_distance 보다 next_distace 가 더 작으면:
#                     persons[i] = (next_y, next_x)  # next_y, next_x 재할당
#                     min_distance = next_distance  # min_distance 재할당
#
#             if persons[i] == target_stores[i]:  # 이동된 사람의 위치가 편의점인 경우:
#                 cur_time_used_stores.add((persons[i][0], persons[i][1]))  # cur_time_used_stores.add(현재위치)
#
#     used_stores = used_stores.union(cur_time_used_stores)
#
#     print(f'{time}초')
#     for i, value in enumerate(persons):
#         print(f'{i+1}번째 사람: {value}')
#     print(f"사용된 베이스 캠프: {used_basecamps}")
#     print(f'사용된 편의점: {used_stores}')
#     print()
#
#     if len(used_stores) == m:  # 만약 len(use_stores) == m:
#         break  # break
#     time += 1  # time 1 증가
#
# print(time)

N, M = map(int, input().split())
arr = [[1] * (N + 2)] + [[1] + list(map(int, input().split())) + [1] for _ in range(N)] + [[1] * (N + 2)]

basecamp = set()  # basecamp
for i in range(1, N + 1):
    for j in range(1, N + 1):
        if arr[i][j] == 1:
            basecamp.add((i, j))
            arr[i][j] = 0

store = {}  # 편의점
for m in range(1, M + 1):
    i, j = map(int, input().split())
    store[m] = (i, j)

from collections import deque


def find(si, sj, dests):  # 시작좌표에서 목적지좌표들(set)중 최단거리 동일반경 리스트를 모두 찾기!
    q = deque()
    v = [[0] * (N + 2) for _ in range(N + 2)]
    tlst = []

    q.append((si, sj))
    v[si][sj] = 1

    while q:
        # 동일 범위(반경)까지 처리
        nq = deque()
        for ci, cj in q:
            if (ci, cj) in dests:  # 목적지 찾음! => 더 뻗어나갈 필요없음
                tlst.append((ci, cj))
            else:
                # 네방향, 미방문, 조건: 벽이 아니면 arr[][]==0
                for di, dj in ((-1, 0), (1, 0), (0, -1), (0, 1)):
                    ni, nj = ci + di, cj + dj
                    if v[ni][nj] == 0 and arr[ni][nj] == 0:
                        nq.append((ni, nj))
                        v[ni][nj] = v[ci][cj] + 1
        # 목적지 찾았다면(여러개 일수도..) 리턴
        if len(tlst) > 0:
            tlst.sort()  # 행/열 오름차순
            return tlst[0]
        q = nq
    # 이곳에 올리는 없지만....
    return -1


def solve():
    q = deque()
    time = 1
    arrived = [0] * (M + 1)  # 0이면 미도착, >0 이면 도착시간

    while q or time == 1:  # 처음 또는 q에 데이터 있는동안(이동할 사람이 있는 동안) 실행
        nq = deque()
        alst = []
        # [1] 모두 편의점방향 최단거리 이동 (이번 time만, 같은 반경)
        for ci, cj, m in q:
            if arrived[m] == 0:  # 도착하지 않은 사람만 처리
                # 편의점방향 최단거리(우선순위) 한 칸 이동
                # 편의점에서 시작, 현재위치(상/하/좌/우 => dests (set) )
                ni, nj = find(store[m][0], store[m][1], set(((ci - 1, cj), (ci + 1, cj), (ci, cj - 1), (ci, cj + 1))))
                if (ni, nj) == store[m]:  # 최종 편의점에 도착
                    arrived[m] = time
                    alst.append((ni, nj))  # 통행금지는 모두 이동후 처리해야 함!!
                else:
                    nq.append((ni, nj, m))  # 계속 이동
        q = nq

        # [2] 편의점 도착처리 => arr[][]=1 (이동불가처리)
        if len(alst) > 0:
            for ai, aj in alst:
                arr[ai][aj] = 1  # 이동불가

        # [3] 시간번호의 멤버가 베이스캠프로 순간이동
        if time <= M:
            si, sj = store[time]
            ei, ej = find(si, sj, basecamp)  # 가장 가까운(우선순위 높은) 베이스캠프 선택
            basecamp.remove((ei, ej))
            arr[ei][ej] = 1  # 이동불가
            q.append((ei, ej, time))  # 베이스캠프에서 이동시작

        time += 1
    return max(arrived)


ans = solve()
print(ans)
