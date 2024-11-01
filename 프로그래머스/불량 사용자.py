import re

answer = 0
answer_list = []


def solution(user_id, banned_id):
    star_count = {id: 0 for id in banned_id}

    for i in range(len(banned_id)):
        for ch in banned_id[i]:
            if ch == "*":
                star_count[banned_id[i]] += 1

    banned_id.sort(key=lambda id: [-star_count[id]])

    visited = [False] * len(user_id)
    for i in range(0, len(banned_id)):
        reg = banned_id[i].replace('*', '\w')
        group = set()

        for k in range(len(user_id)):
            result = re.fullmatch(reg, user_id[k])
            if result != None and not visited[k]:
                print(f'reg={reg}, id={user_id[k]}')
                visited[k] = True
                group.add(user_id[k])
                search(user_id, banned_id, visited, group)
                visited[k] = False
                group.remove(user_id[k])

    return answer


def search(user_id, banned_id, visited, group):
    global answer, answer_list
    #
    # if len(group) == len(banned_id):
    #     print(group)
    #     answer += 1
    #     return


    if len(group) == len(banned_id):
        if group not in answer_list:
            print(group)
            answer += 1
            new_group = {id for id in group}
            answer_list.append(new_group)
        return

    start_idx = len(group)

    for i in range(start_idx, len(banned_id)):
        reg = banned_id[i].replace('*', '\w')

        for k in range(len(user_id)):
            result = re.fullmatch(reg, user_id[k])
            if result != None and not visited[k]:
                print(f'reg={reg}, id={user_id[k]}')

                visited[k] = True
                group.add(user_id[k])
                search(user_id, banned_id, visited, group)
                visited[k] = False
                group.remove(user_id[k])


print("******".replace('*', '\w'))
print(re.fullmatch("\w\w\w\w\w\w", 'frodo'))


print(solution(["frodo", "fradi", "crodo", "abc123", "frodoc"], ["fr*d*", "*rodo", "******", "******"]))
print({'frodo', 'frodoc', 'crodo', 'abc123'} == {'frodoc', 'crodo', 'frodo', 'fradi'})