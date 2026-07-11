import BaseCommandType from "./BaseCommandType.js";

import CommandTypeNames from "./CommandTypeNames.js";

import Util from "../../../util/Util.js";

class IntegerCommandType extends BaseCommandType {
    static type = CommandTypeNames.integer;

    coerce(input) {
        const trimmed = String(input).trim();

        if (Util.empty(trimmed)) {
            return this._createInvalid("invalid_integer", "Invalid integer", input);
        }

        const val = Util.parseInt(trimmed);

        if (Number.isNaN(val)) {
            return this._createInvalid("invalid_integer", "Invalid integer", input);
        }

        return this._createSuccess(val);
    }
}

export default IntegerCommandType;
