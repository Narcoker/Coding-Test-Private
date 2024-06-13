import sys

sys.stdin = open("data.txt", 'r')

N = int(input())
budgets = list(map(int, input().split()))
M = int(input())

max_budget = 1
sum_budgets = 0
count_budgets = {}
answer = 0

for budget in budgets:
    max_budget = max(max_budget, budget)
    sum_budgets += budget
    if budget in count_budgets.keys():
        count_budgets[budget] += 1
    else:
        count_budgets[budget] = 1

if sum_budgets <= M:
    print(max_budget)

else:
    left = 1
    right = M

    while left <= right:
        mid = (left + right) // 2
        given_budget = 0

        for budget in count_budgets.keys():
            if budget <= mid:
                given_budget += budget * count_budgets[budget]
            else:
                given_budget += mid * count_budgets[budget]

        if given_budget <= M:
            left = mid + 1
            answer = max(answer, mid)
        else:
            right = mid - 1

    print(answer)
