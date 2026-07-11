import BaseCommandType from "./BaseCommandType.js";

import CommandTypeNames from "./CommandTypeNames.js";

import DiscordUtil from "../../../util/DiscordUtil.js";

class ScriptCommandType extends BaseCommandType {
    static type = CommandTypeNames.script;

    static parse(script) {
        script = String(script ?? "");

        const match = script.match(DiscordUtil.parseScriptRegex);

        if (!match) {
            return {
                body: script,
                language: "",
                isScript: false
            };
        }

        const body = (match[2] ?? match[3])?.trim(),
            language = match[1]?.trim() ?? "";

        if (typeof body === "undefined") {
            return {
                body: script,
                language: "",
                isScript: false
            };
        }

        return {
            body,
            language,
            isScript: true
        };
    }

    coerce(input) {
        return this._createSuccess(ScriptCommandType.parse(input));
    }
}

export default ScriptCommandType;
