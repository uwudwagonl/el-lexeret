import { getConfig } from "../../LevertClient.js";

class PythonEvalCommand {
    static info = {
        name: "py",
        parent: "eval",
        subcommand: true
    };

    load() {
        return getConfig().enableOtherLangs;
    }

    handler(ctx) {
        return this.parentCmd.altevalBase(ctx.argsText, ctx.msg, 71, {
            allowFilePath: this.parentCmd.canUseFilePath(ctx)
        });
    }
}

export default PythonEvalCommand;
