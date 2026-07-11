import { getClient } from "../../LevertClient.js";

import Util from "../../util/Util.js";
import replEval from "../../util/commands/replEval.js";

class EvalCommand {
    static info = {
        name: "eval",
        arguments: [
            {
                name: "code",
                type: "string",
                required: true
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
        const code = ctx.args.code;

        if (!Util.nonemptyString(code)) {
            return {
                output: "Can't eval an empty expression."
            };
        }

        const out = await replEval(code, {
            getClient,
            Util
        });

        return {
            output: out
        };
    }
}

export default EvalCommand;
