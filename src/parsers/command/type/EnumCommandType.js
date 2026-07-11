import BaseCommandType from "./BaseCommandType.js";

import CommandTypeNames from "./CommandTypeNames.js";

import Util from "../../../util/Util.js";

class EnumCommandType extends BaseCommandType {
    static type = CommandTypeNames.enum;

    coerce(input) {
        const values = this.options.values ?? [];

        if (Util.empty(values)) {
            return this._createInvalid("invalid_enum", "Enum has no valid values", input);
        }

        let kind = typeof Util.first(values),
            coerced;

        if (kind === "string") {
            coerced = String(input);
        } else if (kind === "number") {
            coerced = Number(input);

            if (Number.isNaN(coerced)) {
                return this._createInvalid("invalid_enum", `Value must be one of: ${values.join(", ")}`, input);
            }
        } else if (kind === "boolean") {
            if (typeof input === "boolean") {
                coerced = input;
            } else {
                coerced = Util.parseBool(String(input), null);

                if (coerced === null) {
                    return this._createInvalid("invalid_enum", `Value must be one of: ${values.join(", ")}`, input);
                }
            }
        } else {
            coerced = input;
        }

        if (!values.includes(coerced)) {
            return this._createInvalid("invalid_enum", `Value must be one of: ${values.join(", ")}`, input);
        }

        return this._createSuccess(coerced);
    }
}

export default EnumCommandType;
