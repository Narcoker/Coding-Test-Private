function solution(id_list, report, k) {
    const answer = [];
    // 유저 등록
    const userInfos = id_list.reduce((res, name) => {
        let user = { report: new Set(), reported: new Set(), makeStopUserCount: 0 }
        res.set(name, user);
        return res;
    }, new Map());


    // 신고 기록
    [...new Set(report)].forEach((log) => {
        let [user, report] = log.split(" ");
        userInfos.get(user).report.add(report);
        userInfos.get(report).reported.add(user);
    });

    // 제제 처리 카운트 누적
    userInfos.forEach((userInfo) => {
        if (userInfo.reported.size >= k) {
            userInfo.reported.forEach((user) => {
                userInfos.get(user).makeStopUserCount++;
            })
        }
    });

    // 답안 만들기
    userInfos.forEach((userInfo) => {
        answer.push(userInfo.makeStopUserCount);
    });

    return answer;
}