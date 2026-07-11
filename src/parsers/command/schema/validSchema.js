const validSchema = {
    type: "object",
    additionalProperties: false,
    properties: {
        required: {
            type: "boolean"
        },
        allowEmpty: {
            type: "boolean"
        },
        min: {
            type: "number"
        },
        max: {
            type: "number"
        },
        minLength: {
            type: "integer",
            minimum: 0
        },
        maxLength: {
            type: "integer",
            minimum: 0
        },
        regex: {
            isRegExp: true
        }
    }
};

export default validSchema;
