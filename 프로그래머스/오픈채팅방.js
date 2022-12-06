function solution(record) {
    var answer = [];
    let users = new Map();
    let logs = [];
    record = record.map((log) => log.split(" "))
    for (let [type, uid, nickname] of record) {
        if (type === "Enter" || type === "Change")
            users.set(uid, nickname);

        if (type !== "Change")
            logs.push([uid, type]);
    }

    for (let [uid, type] of logs) {
        if (type === "Enter")
            answer.push(`${users.get(uid)}님이 들어왔습니다.`);
        if (type === "Leave")
            answer.push(`${users.get(uid)}님이 나갔습니다.`);
    }
    return answer;
}