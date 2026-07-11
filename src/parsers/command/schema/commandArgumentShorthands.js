import CommandTypeNames from "../type/CommandTypeNames.js";

const commandArgumentShorthands = {
    type: {
        shape: "value",
        fields: {
            int: CommandTypeNames.integer,
            bool: CommandTypeNames.boolean
        }
    },
    reader: {
        shape: "field",
        placement: "exclusive",
        fields: ["kind", "index", "aliases", "shorthand", "lowercase", "separator", "pattern", "syntax"]
    },
    valid: {
        shape: "field",
        placement: "inside",
        fields: {
            required: { placement: "mixed" },
            allowEmpty: null,
            min: null,
            max: null,
            minLength: null,
            maxLength: null,
            regex: null
        }
    }
};

export default commandArgumentShorthands;
