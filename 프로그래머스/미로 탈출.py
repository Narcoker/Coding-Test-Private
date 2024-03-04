from collections import deque


def bfs(maps, start_y, start_x, target):
    queue = deque([[start_y, start_x, 0]])
    visited = [[False] * len(maps[0]) for _ in range(len(maps))]
    visited[start_y][start_x] = True

    dy = [-1, 1, 0, 0]
    dx = [0, 0, -1, 1]

    while queue:
        cur_y, cur_x, count = queue.popleft()

        for i in range(4):
            next_y = cur_y + dy[i]
            next_x = cur_x + dx[i]

            if 0 <= next_y < len(maps) and 0 <= next_x < len(maps[0]) and not visited[next_y][next_x]:
                if maps[next_y][next_x] == "X":
                    continue
                queue.append([next_y, next_x, count + 1])
                visited[next_y][next_x] = True

                if maps[next_y][next_x] == target:
                    return next_y, next_x, count + 1

    return cur_y, cur_x, -1


def solution(maps):
    answer = 0
    max_row, max_col = (len(maps), len(maps[0]))

    cur_y, cur_x = 0, 0

    for r in range(max_row):
        for c in range(max_col):
            if maps[r][c] == "S":
                cur_y, cur_x = r, c

    cur_y, cur_x, L_count = bfs(maps, cur_y, cur_x, "L")
    if L_count == -1:
        return -1

    cur_y, cur_x, E_count = bfs(maps, cur_y, cur_x, "E")
    if E_count == -1:
        return -1

    return L_count + E_count
