def solution(stones, k):
    start = 0
    end = max(stones)
    mid = 0
    answer = 0
    while start <= end:
        mid = (start + end) // 2

        if is_ok(stones, k, mid):
            start = mid + 1
            answer = mid + 1
        else:
            end = mid - 1

    return answer


def is_ok(stones, k, mid):
    result = 0
    continuous = 0
    for stone in stones:
        if stone - mid <= 0:
            continuous += 1
            if continuous > result:
                result = continuous
        else:
            continuous = 0

    if result >= k:
        return False

    return True