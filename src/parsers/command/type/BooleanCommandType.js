import BaseCommandType from "./BaseCommandType.js";

import CommandTypeNames from "./CommandTypeNames.js";

import Util from "../../../util/Util.js";

class BooleanCommandType extends BaseCommandType {
    static type = CommandTypeNames.boolean;

    coerce(input) {
        if (typeof input === "boolean") {
            return this._createSuccess(input);
        }

        const str = String(input),
            val = Util.parseBool(str, null);

        if (val === null) {
            return this._createInvalid("invalid_boolean", "Invalid boolean", input);
        }

        return this._createSuccess(val);
    }
}

export default BooleanCommandType;
