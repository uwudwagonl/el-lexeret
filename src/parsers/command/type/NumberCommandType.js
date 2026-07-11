import BaseCommandType from "./BaseCommandType.js";

import CommandTypeNames from "./CommandTypeNames.js";

import Util from "../../../util/Util.js";

const NUMBER_REGEX = /^[+-]?(?:\d{1,3}(?:,\d{3})*|\d+)(?:\.\d+)?(?:[eE][+-]?\d+)?$/;

class NumberCommandType extends BaseCommandType {
    static type = CommandTypeNames.number;

    coerce(input) {
        const trimmed = String(input).trim();

        if (Util.empty(trimmed)) {
            return this._createInvalid("invalid_number", "Invalid number", input);
        }

        if (!NUMBER_REGEX.test(trimmed)) {
            return this._createInvalid("invalid_number", "Invalid number", input);
        }

        const clean = trimmed.replaceAll(",", ""),
            val = Number(clean);

        if (Number.isNaN(val)) {
            return this._createInvalid("invalid_number", "Invalid number", input);
        }

        return this._createSuccess(val);
    }
}

export default NumberCommandType;
