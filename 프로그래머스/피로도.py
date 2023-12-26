def travel(cur, remain, dungeons, count):
    global answer
    answer = max(answer, count)

    for next_pos in range(0, len(dungeons)):
        if next_pos == cur: continue

        need, use, visited = dungeons[next_pos]
        if not visited and remain >= need:
            dungeons[next_pos][2] = True
            travel(next_pos, remain - use, dungeons, count + 1)
            dungeons[next_pos][2] = False


def solution(k, dungeons):
    global answer
    answer = 0

    for i in range(0, len(dungeons)):
        dungeons[i] = dungeons[i] + [False]

    for start in range(0, len(dungeons)):
        need, use, visited = dungeons[start]
        if not visited and k >= need:
            dungeons[start][2] = True
            travel(start, k - use, dungeons, 1)
            dungeons[start][2] = False
    return answer

solution(80, [[80,20],[50,40],[30,10]])