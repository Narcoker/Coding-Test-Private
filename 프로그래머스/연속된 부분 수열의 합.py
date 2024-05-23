def solution(sequence, k):
    answer = []

    accum_arr = [0]

    for i in range(len(sequence)):
        result = accum_arr[i] + sequence[i]
        accum_arr.append(result)

    left, right = 0, 0
    length = len(sequence) + 1

    while True:
        result_sum = accum_arr[right] - accum_arr[left]

        if result_sum == k and right - left + 1 < length:
            answer = [left, right]
            length = right - left + 1

        if result_sum < k:
            right += 1

        if result_sum > k:
            left += 1

        if left > right or left > len(accum_arr) - 1 or right > len(accum_arr) - 1:
            break

    return answer


print(solution([1,2,3,4,5], 7))