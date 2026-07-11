import BaseCommandType from "./BaseCommandType.js";

import CommandTypeNames from "./CommandTypeNames.js";

class StringCommandType extends BaseCommandType {
    static type = CommandTypeNames.string;

    coerce(input) {
        return this._createSuccess(String(input));
    }
}

export default StringCommandType;
