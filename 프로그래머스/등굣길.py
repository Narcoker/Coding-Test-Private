def solution(m, n, puddles):
    dp = [[1] * (m + 1) for _ in range(n + 1)]

    for col, row in puddles:
        dp[row][col] = 0
        if row == 1:
            for i in range(col, m + 1):
                dp[row][i] = 0
        if col == 1:
            for i in range(row, n + 1):
                dp[i][col] = 0

    for row in range(2, n + 1):
        for col in range(2, m + 1):
            if dp[row][col] == 0:
                continue
            dp[row][col] = (dp[row - 1][col] + dp[row][col - 1]) % 1_000_000_007

    return dp[-1][-1]