import Util from "../../util/Util.js";
import EmulationCommandUtil from "../../util/commands/EmulationCommandUtil.js";
import replEval from "../../util/commands/replEval.js";

import { getClient } from "../../LevertClient.js";

class EvalCommand {
    static info = {
        name: "eval"
    };

    async handler(ctx) {
        const parsed = await EmulationCommandUtil.resolveGuessedPathBody(ctx.argsText, {
                name: "script"
            }),
            body = parsed.body;

        if (parsed.err !== null) {
            return `Error: ${parsed.err.message}`;
        }

        if (Util.empty(body)) {
            return "Can't eval an empty expression.";
        }

        return await replEval(body, {
            getClient,
            Util
        });
    }
}

export default EvalCommand;
