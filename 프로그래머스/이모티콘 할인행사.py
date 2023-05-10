from itertools import product


def solution(users, emoticons):
    plus_user = 0
    sales_amount = 0
    sales_type = list(product([10, 20, 30, 40], repeat=len(emoticons)))

    answer = [0, 0]
    for type in sales_type:
        sign_up = 0
        amount = 0
        for target_type, target_price in users:
            price = 0
            for i, emoticon in enumerate(emoticons):
                if target_type <= type[i]:
                    price += int(emoticon // 100 * (100 - type[i]))

            if target_price <= price:
                sign_up += 1
            else:
                amount += price

            answer = max(answer, [sign_up, amount])

    return answer