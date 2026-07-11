import { getClient } from "../../LevertClient.js";

import EmulationCommandUtil from "../../util/commands/EmulationCommandUtil.js";

class ExecuteTagCommand {
    static info = {
        name: "execute_tag",
        arguments: [
            {
                name: "name",
                type: "string"
            },
            {
                name: "args",
                type: "string",
                defaultValue: ""
            },
            {
                name: "msg",
                kind: "group",
                properties: EmulationCommandUtil.getMessageGroupProperties()
            },
            {
                name: "tag",
                kind: "group",
                properties: EmulationCommandUtil.getTagGroupProperties()
            }
        ],
        response: [
            {
                name: "output",
                type: "any"
            }
        ]
    };

    async handler(ctx) {
        const { tag, tagArgs, emulatedMsg } = await EmulationCommandUtil.setupWebsocketEmulation(ctx);

        if (tag === null) {
            return {
                output: `Tag "${ctx.args.name}" doesn't exist.`
            };
        }

        const out = await getClient().tagManager.execute(tag, tagArgs, {
            msg: emulatedMsg
        });

        return {
            output: out
        };
    }
}

export default ExecuteTagCommand;
