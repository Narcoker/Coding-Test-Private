def solution(money):
    dp1 = [0] + money[:-1]
    dp2 = [0] + money[1:]

    for i in range(2, len(dp1)):
        dp1[i] = max(dp1[i - 1], dp1[i - 2] + dp1[i])
        dp2[i] = max(dp2[i - 1], dp2[i - 2] + dp2[i])

    return max(dp1[-1], dp2[-1])
