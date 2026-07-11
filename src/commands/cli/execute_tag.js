import { getClient } from "../../LevertClient.js";

import EmulationCommandUtil from "../../util/commands/EmulationCommandUtil.js";

class ExecuteTagCommand {
    static info = {
        name: "execute_tag",
        arguments: [
            ...EmulationCommandUtil.getMessageCliArguments(),
            ...EmulationCommandUtil.getTagCliArguments(),
            {
                name: "execTagName",
                kind: "positional",
                index: 0
            },
            {
                name: "execTagArgs",
                kind: "rest"
            }
        ]
    };

    async handler(ctx) {
        let tag, tagArgs, emulatedMsg;

        try {
            ({ tag, tagArgs, emulatedMsg } = await EmulationCommandUtil.setupCliEmulation(ctx));
        } catch (err) {
            return `Error: ${err.message}`;
        }

        if (tag === null) {
            return `Tag "${ctx.arg("execTagName")}" doesn't exist.`;
        }

        return await getClient().tagManager.execute(tag, tagArgs, {
            msg: emulatedMsg
        });
    }
}

export default ExecuteTagCommand;
