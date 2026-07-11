import BaseCommandType from "./BaseCommandType.js";

import CommandTypeNames from "./CommandTypeNames.js";

class GroupCommandType extends BaseCommandType {
    static type = CommandTypeNames.group;

    coerce(input) {
        if (typeof input !== "object" || Array.isArray(input)) {
            return this._createInvalid("invalid_group", "Value must be an object", input);
        }

        return this._createSuccess(input);
    }
}

export default GroupCommandType;
