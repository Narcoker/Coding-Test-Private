"""
[싸움땅]
N X N
각각 격자에 무기가 있거나 없거나
격자에 총이 여러개 있을 수 있음

[플레이어]
초기에 무기가 없는 격자에 위치
초기 능력치 가지며 각 플레이어 모두 다름
방향 있음
포인트 있음
"""

"""
[1라운드]

1. 플레이어가 향하고 있는 대로 한칸 이동, 격자 벗어나는 경우 정반대 방향으로 바꾸어 이동
2. 이동한 칸에 플레리어가 없다면 격자에 총이 있는지 없는지, 사람이 있는지 확인
2-1 총이 있는 경우 -> 바닥에 놓여있는 총들고 플레이어가 가진 총 중 가장 쎈 총 챙기고 나머지 총은 격자에
2-2 사람이 있는 경우 -> 전투
    전투력(초기 능력치 + 총) 비교하여 큰 플레이어가 승리, 
    이긴 플레이어는 진 플레이어와의 전투력 차이 만큼 포인트 획득

    진 플레이어는 총을 격자에 내려놓고 바라보던 방향대로 한칸 이동
        이동할 칸에 플레이어가 있거나 격자가 있는 경우 오른쪽으로 90씩 회전하여 빈칸 찾고 이동
        이동한 칸에 총이 있다면 제일 쎈총 획득 후 나머지는 격자에 내려놓음

    이긴 플레이어는 승리한 칸에 떨어져 있는 총들과 원래 있던 총 중 가장 공격력이 높은 총 획득, 나머지 총 격자에 버림
"""

"""
[싸움땅]
N X N
각각 격자에 무기가 있거나 없거나
격자에 총이 여러개 있을 수 있음

[플레이어]
초기에 무기가 없는 격자에 위치 y, x
초기 능력치 가지며 각 플레이어 모두 다름 s
방향 있음 d
포인트 있음 points 배열 사용
y, x, d, s
"""

"""
[1라운드]

1. 플레이어가 향하고 있는 대로 한칸 이동, 격자 벗어나는 경우 정반대 방향으로 바꾸어 이동
2. 이동한 칸에 플레리어가 없다면 격자에 총이 있는지 없는지, 사람이 있는지 확인
2-1 총이 있는 경우 -> 바닥에 놓여있는 총들고 플레이어가 가진 총 중 가장 쎈 총 챙기고 나머지 총은 격자에
2-2 사람이 있는 경우 -> 전투
    전투력(초기 능력치 + 총) 비교하여 큰 플레이어가 승리, 
    이긴 플레이어는 진 플레이어와의 전투력 차이 만큼 포인트 획득

    진 플레이어는 총을 격자에 내려놓고 바라보던 방향대로 한칸 이동
        이동할 칸에 플레이어가 있거나 격자가 있는 경우 오른쪽으로 90씩 회전하여 빈칸 찾고 이동
        이동한 칸에 총이 있다면 제일 쎈총 획득 후 나머지는 격자에 내려놓음

    이긴 플레이어는 승리한 칸에 떨어져 있는 총들과 원래 있던 총 중 가장 공격력이 높은 총 획득, 나머지 총 격자에 버림
"""

import sys

sys.stdin = open('input.txt', 'r')

N, M, K = map(int, input().split())
ground = []
for _ in range(N):
    row = map(int, input().split())
    temp = []
    for value in row:
        if value != 0:
            temp.append([value])
        else:
            temp.append([])
    ground.append(temp)

players = []
for _ in range(M):
    y, x, d, s = map(int, input().split())
    players.append([y - 1, x - 1, d, s, 0])

points = [0 for _ in range(M)]

vectors = [(-1, 0), (0, 1), (1, 0), (0, -1)]


def hasOtherPlayer(me, players):
    target_y, target_x = players[me][0], players[me][1]

    for i in range(len(players)):
        if i == me:
            continue

        other_y, other_x = players[i][0], players[i][1]

        if (target_y, target_x) == (other_y, other_x):
            return i

    return -1


def afterFight(winner, loser, points, players):
    points[winner] += win_point  # 포인트[본인 인덱스] += 승리자가 획득할 포인트

    winner_y, winner_x, winner_d, winner_s, winner_g = players[winner]
    loser_y, loser_x, loser_d, loser_s, loser_g = players[loser]

    if loser_g != 0:  # 진사람이 총을 가지고 있다면
        ground[loser_y][loser_x].append(loser_g)  # 적 총 값, 격자에 append
        players[loser] = [loser_y, loser_x, loser_d, loser_s, 0]  # 적 총 수치 0으로 할당

    # 적 dy dx 가져오기
    for v in range(4):  # for 문 4번
        dy, dx = vectors[(loser_d + v) % 4]  # 다음 방향  오른쪽 90도 회전 가져오기
        next_loser_y = loser_y + dy
        next_loser_x = loser_x + dx

        if not (0 <= next_loser_y < N and 0 <= next_loser_x < N):  # 이동할 칸이 벽이면
            continue  # continue

        players[loser][0], players[loser][1] = next_loser_y, next_loser_x  # 1 이동

        if hasOtherPlayer(loser, players) != -1:  # 플레이어가 있는 경우(함수로 확인)
            players[loser][0], players[loser][1] = loser_y, loser_x  # 원래 자리로 이동
            continue

        players[loser][2] = (loser_d + v) % 4  # 방향 재할당

        if len(ground[next_loser_y][next_loser_x]) > 0:  # 이동한 칸에 총이 있는 경우
            next_gun = ground[next_loser_y][next_loser_x].pop()  # 격자 총 맨 뒤에꺼 pop()
            players[loser][4] = next_gun  # 적 총으로 할당


        # 이긴사람 총 버리기
        ground[winner_y][winner_x].append(winner_g)
        ground[winner_y][winner_x].sort() # 바닥에서 제일 센총 찾기
        next_gun = ground[winner_y][winner_x].pop()
        players[winner] = [winner_y, winner_x, winner_d, winner_s, next_gun] # 이긴 사람 그총 줍기

        break


for turn in range(K):
    for me in range(len(players)):  # 플레이어 인덱스 순회 me
        me_y, me_x, me_d, me_s, me_g = players[me]  # y, x, d, s, g= players[me]

        me_dy, me_dx = vectors[me_d]  # dy dx 가져오기
        next_me_y = me_y + me_dy  # 이동할 칸 계산
        next_me_x = me_x + me_dx

        if 0 <= next_me_y < N and 0 <= next_me_x < N:  # 이동할 칸이 벽이 아닌 경우
            # 원래 방향대로 1 이동(재할당)
            players[me] = [next_me_y, next_me_x, me_d, me_s, me_g]
        else:  # 이동할 칸이 벽인 경우
            # 정반대 방향으로 1 이동(재할당)
            next_d = (me_d + 2) % 4  # 방향 전환
            next_dy, next_dx = vectors[next_d]  # dy dx 가져오기
            next_me_y = me_y + next_dy  # 이동할 칸 계산
            next_me_x = me_x + next_dx
            players[me] = [next_me_y, next_me_x, next_d, me_s, me_g]

        pos = [(players[me][0], players[me][1]), players]
        enemy = hasOtherPlayer(me, players)  # 이동할 칸에 플레이어 있는지 함수 반환 값(플레이어 인덱스)으로 확인

        if enemy == -1:  # 이동한 칸에 플레이어가 없다면 (-1)
            cur_y, cur_x = players[me][0], players[me][1]
            if len(ground[cur_y][cur_x]):  # 이동한 칸에 총이 있다면(격자 칸의 배열에 값이 있다면)
                if me_g > 0:  # 플레이어가 총을 가지고 있다면 g > 0
                    ground[cur_y][cur_x].append(me_g)  # 격자 총 배열에 append
                    ground[cur_y][cur_x].sort()  # 배열 sort()
                    next_gun = ground[cur_y][cur_x].pop()  # 맨뒤에꺼(제일 큰거) pop()
                    players[me][4] = next_gun  # 플레이어에게 주기
                if me_g == 0:  # 플레이어가 총을 가지고 있지 않다면 g == 0
                    next_gun = ground[cur_y][cur_x].pop()  # 맨뒤에꺼(제일 큰거) pop()
                    players[me][4] = next_gun  # 플레이어에게 주기

        if enemy != -1:  # 적 플레이어가 있다면
            enemy_atk = players[enemy][3] + players[enemy][4]  # 적 전투력 계산
            me_atk = players[me][3] + players[me][4]  # 본인 전투력 계산
            win_point = abs(enemy_atk - me_atk)  # 승리자가 획득할 포인트 계산

            if me_atk > enemy_atk:  # 만약 본인 전투력이 높다면
                afterFight(me, enemy, points, players)

            elif me_atk < enemy_atk:  # 만약 적 전투력이 높다면
                afterFight(enemy, me, points, players)

            else:
                if players[me][3] > players[enemy][3]:
                    afterFight(me, enemy, points, players)
                else:
                    afterFight(enemy, me, points, players)

    print(f"{turn + 1}턴 종료")
    for row in ground:
        print(row)
    for i, player in enumerate(players):
        print(f"{i + 1}번 플레이어: {player}")
    print(f"포인트: {points}")

    print()

print(*points)
