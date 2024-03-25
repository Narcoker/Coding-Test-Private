def solution(n, times):
    answer = 0

    start, end = 1, max(times) * n

    while start <= end:
        mid = (start + end) // 2

        total = 0
        for time in times:
            total += mid // time
            if total >= n:
                break

        if total >= n:
            end = mid - 1
            answer = mid
        else:
            start = mid + 1

    return answer