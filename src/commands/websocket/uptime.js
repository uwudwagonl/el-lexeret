import { getClient } from "../../LevertClient.js";

class UptimeCommand {
    static info = {
        name: "uptime",
        arguments: [],
        response: [
            {
                name: "uptime",
                type: "number"
            },
            {
                name: "startedAt",
                type: "number"
            }
        ]
    };

    handler() {
        return {
            uptime: getClient().uptime,
            startedAt: getClient().startedAt
        };
    }
}

export default UptimeCommand;
