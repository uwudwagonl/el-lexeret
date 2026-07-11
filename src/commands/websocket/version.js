import { getClient } from "../../LevertClient.js";

class VersionCommand {
    static info = {
        name: "version",
        arguments: [],
        response: [
            {
                name: "version",
                type: "string"
            }
        ]
    };

    handler() {
        return {
            version: getClient().version
        };
    }
}

export default VersionCommand;
