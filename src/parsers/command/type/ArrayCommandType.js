import BaseCommandType from "./BaseCommandType.js";

import CommandTypeNames from "./CommandTypeNames.js";

class ArrayCommandType extends BaseCommandType {
    static type = CommandTypeNames.array;

    coerce(input) {
        if (Array.isArray(input)) {
            return this._createSuccess(input);
        }

        const str = String(input).trim();

        try {
            const parsed = JSON.parse(str);

            if (!Array.isArray(parsed)) {
                return this._createInvalid("invalid_array", "Invalid JSON array", input);
            }

            return this._createSuccess(parsed);
        } catch (err) {
            return this._createInvalid("invalid_array", "Invalid JSON array", input);
        }
    }
}

export default ArrayCommandType;
