def solution(sticker):
    answer = 0

    if len(sticker) == 1:
        return sticker[0]

    dp1 = [0] + sticker[:-1]  # [0, 14, 6, 5, 11, 3, 9, 2]
    dp2 = [0] + sticker[1:]  # [0, 6, 5, 11, 3, 9, 2, 10]

    for i in range(2, len(sticker)):
        dp1[i] = max(dp1[i - 2] + dp1[i], dp1[i - 1])
        dp2[i] = max(dp2[i - 2] + dp2[i], dp2[i - 1])

    return max(dp1[-1], dp2[-1])