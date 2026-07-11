import CommandTypeNames from "../type/CommandTypeNames.js";

const typeSchema = {
    oneOf: [
        {
            type: "string",
            enum: Object.values(CommandTypeNames)
        },
        {
            type: "object",
            required: ["name"],
            additionalProperties: false,
            properties: {
                name: {
                    type: "string",
                    const: CommandTypeNames.enum
                },
                values: {
                    type: "array",
                    minItems: 1,
                    items: {
                        anyOf: [{ type: "string" }, { type: "number" }, { type: "boolean" }]
                    }
                }
            }
        }
    ]
};

export default typeSchema;
