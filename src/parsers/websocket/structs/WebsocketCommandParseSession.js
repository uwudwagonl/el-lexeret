import Util from "../../../util/Util.js";

class WebsocketCommandParseSession {
    constructor(context) {
        this.context = context;
        this.results = new Map();
        this.issues = [];
    }

    get valid() {
        if (!Util.empty(this.issues)) {
            return false;
        }

        for (const result of this.results.values()) {
            if (!result.valid) {
                return false;
            }
        }

        return true;
    }

    addIssue(issue) {
        this.issues.push(issue);
    }

    addResult(result) {
        this.results.set(result.name, result);
    }
}

export default WebsocketCommandParseSession;
