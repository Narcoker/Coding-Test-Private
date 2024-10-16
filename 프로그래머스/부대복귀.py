import heapq


def solution(n, roads, sources, destination):
    answer = []
    board = [[] for _ in range(n + 1)]
    distances = [int(1e9) for _ in range(n + 1)]
    distances[destination] = 0

    for start, end in roads:
        board[start].append(end)
        board[end].append(start)

    heap = [(0, destination)]

    while heap:
        distance, cur = heapq.heappop(heap)

        if distances[cur] < distance:
            continue

        for neighbor in board[cur]:
            next_distance = distance + 1  # 현재 위치를 거쳐서 neighbor 까지 가는 거리

            if next_distance < distances[neighbor]:
                distances[neighbor] = next_distance
                heapq.heappush(heap, (next_distance, neighbor))

    for source in sources:
        if distances[source] == int(1e9):
            answer.append(-1)

        else:
            answer.append(distances[source])

    return answer