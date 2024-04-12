import sys

sys.stdin = open('data.txt')

N, M, D = map(int, input().split(" "))
board = [list(map(int, input().split(" "))) for _ in range(N)]
answer = 0


def play(pos, board):
    global answer
    count = 0
    # for row in board:
    #     print(*row)
    #
    # for col in range(M):
    #     if (N, col) in pos:
    #         print("A", end=" ")
    #     else:
    #         print(" ", end=" ")
    #
    # print()

    enemy = []
    for row in range(N):
        for col in range(M):
            if board[row][col] == 1:
                enemy.append((row, col))
    while enemy:
        # 공격
        target_enemies = set()
        for archer in pos:
            target_enemy = get_target_enemy(enemy, archer)

            if target_enemy == -1: continue
            target_enemies.add(target_enemy)
            # print(f'{archer} 공격 -> {target_enemy}')

        # 제거
        # print(f'제거 대상: {target_enemies}')
        count += len(target_enemies)
        atk_result = [e for e in enemy if not e in target_enemies]

        # 한 줄 이동
        for i in range(len(atk_result)):
            y, x = atk_result[i]
            y += 1

        enemy = [(e[0] + 1, e[1]) for e in atk_result if e[0] != N - 1]
        # for row in range(N):
        #     for col in range(M):
        #         if (row, col) in enemy:
        #             print("1", end=" ")
        #         else:
        #             print("0", end=" ")
        #     print()
        #
        # for col in range(M):
        #     if (N, col) in pos:
        #         print("A", end=" ")
        #     else:
        #         print(" ", end=" ")
        #
        # print()

    answer = max(answer, count)
    # print(f"게임 종료: {count}")
    return


def get_target_enemy(enemy, archer):
    boundary_enemy = [e for e in enemy if abs(archer[0] - e[0]) + abs(archer[1] - e[1]) <= D]

    if not boundary_enemy:
        return -1
    else:
        return min(boundary_enemy, key=lambda e: [abs(archer[0] - e[0]) + abs(archer[1] - e[1]), e[1]])


def select_archer_pos(pos):
    if len(pos) == 3:
        play_board = [[board[row][col] for col in range(M)] for row in range(N)]
        play(pos, play_board)
        return

    for col in range(M):
        if (N, col) not in pos:
            pos.append((N, col))
            select_archer_pos(pos)
            pos.pop()


select_archer_pos([])
print(answer)
