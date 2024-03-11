def solution(triangle):
    answer = 0
    dp = [[0] * len(row) for row in triangle]

    dp[0][0] = triangle[0][0]

    for row in range(1, len(triangle)):
        for col in range(0, len(triangle[row])):
            if col == 0:
                dp[row][col] = triangle[row][col] + dp[row - 1][col]
            elif col == len(triangle[row]) - 1:
                dp[row][col] = triangle[row][col] + dp[row - 1][col - 1]
            else:
                dp[row][col] = triangle[row][col] + max(dp[row - 1][col], dp[row - 1][col - 1])

    answer = max(dp[-1])

    return answer