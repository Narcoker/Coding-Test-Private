from collections import deque
import sys

sys.stdin = open('data.txt', 'r')
s = int(input())
q = deque()
# (현재 이모티콘 개수, 클립보드에 있는 개수)
q.append((1, 0))
# 2차원 리스트를 만들 수 있으나 불필요한 정보가 많으므로 방문 표시를 딕셔너리로 표현
visited = dict()
visited[(1, 0)] = 0

# 너비 우선 탐색 실행
while q:
    now, clip = q.popleft()
    # 현재 이모티콘 개수가 s개라면
    if now == s:
        # 걸린 시간 출력
        print(visited[(now, clip)])
        break
    # 1. 화면에 있는 이모티콘을 모두 복사하기
    if visited.get((now, now)) is None:
        visited[(now, now)] = visited[(now, clip)] + 1
        q.append((now, now))
    # 2. 클립보드에 있는 모든 이모티콘을 화면에 붙여넣기
    if visited.get((now + clip, clip)) is None:
        visited[(now + clip, clip)] = visited[(now, clip)] + 1
        q.append((now + clip, clip))
    # 3. 화면에 있는 이모티콘 중 하나를 삭제하기
    if visited.get((now - 1, clip)) is None:
        visited[(now - 1, clip)] = visited[(now, clip)] + 1
        q.append((now - 1, clip))