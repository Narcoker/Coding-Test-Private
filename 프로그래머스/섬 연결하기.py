import heapq


def solution(n, costs):
    board = [[] for _ in range(n)]
    for start, end, amount in costs:
        board[start].append((end, amount))
        board[end].append((start, amount))

    # 시작 정점 0
    visited = [False] * n
    heap = [(0, 0)]
    answer = 0
    visited_count = 0

    while heap and visited_count < n:
        amount, cur = heapq.heappop(heap)

        if visited[cur]:
            continue

        visited[cur] = True
        visited_count += 1
        answer += amount

        for neighbor, neighbor_amount in board[cur]:
            if not visited[neighbor]:
                heapq.heappush(heap, (neighbor_amount, neighbor))

    return answer