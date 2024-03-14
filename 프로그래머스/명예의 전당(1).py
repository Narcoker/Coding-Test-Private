import heapq

def solution(k, score):
    answer = []
    max_heap = []
    for sc in score:
        heapq.heappush(max_heap, (-sc, sc))
        answer.append(heapq.nsmallest(k, max_heap)[-1][1])
    return answer