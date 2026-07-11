import CommandReaderKinds from "../reader/CommandReaderKinds.js";
import OptionSyntaxTypes from "../reader/OptionSyntaxTypes.js";

const readerSchema = {
    type: "object",
    required: ["kind"],
    additionalProperties: false,
    properties: {
        kind: {
            type: "string",
            enum: Object.values(CommandReaderKinds)
        },
        index: {
            type: "integer",
            minimum: 0
        },
        aliases: {
            type: "array",
            items: {
                type: "string"
            }
        },
        shorthand: {
            type: "string",
            maxLength: 1
        },
        lowercase: {
            type: "boolean"
        },
        syntax: {
            type: "string",
            enum: Object.values(OptionSyntaxTypes)
        },
        separator: {
            oneOf: [
                {
                    type: "string"
                },
                {
                    type: "array",
                    items: {
                        type: "string"
                    }
                }
            ]
        },
        pattern: {
            isRegExp: true
        }
    },
    allOf: [
        {
            if: {
                properties: {
                    index: true
                },
                required: ["index"]
            },
            then: {
                properties: {
                    kind: {
                        enum: [CommandReaderKinds.positional, CommandReaderKinds.match]
                    }
                }
            }
        },
        {
            if: {
                anyOf: [
                    {
                        properties: {
                            aliases: true
                        },
                        required: ["aliases"]
                    },
                    {
                        properties: {
                            shorthand: true
                        },
                        required: ["shorthand"]
                    },
                    {
                        properties: {
                            syntax: true
                        },
                        required: ["syntax"]
                    }
                ]
            },
            then: {
                properties: {
                    kind: {
                        const: CommandReaderKinds.option
                    }
                }
            }
        },
        {
            if: {
                properties: {
                    separator: true
                },
                required: ["separator"]
            },
            then: {
                properties: {
                    kind: {
                        enum: [CommandReaderKinds.positional, CommandReaderKinds.list]
                    }
                }
            }
        },
        {
            if: {
                properties: {
                    pattern: true
                },
                required: ["pattern"]
            },
            then: {
                properties: {
                    kind: {
                        const: CommandReaderKinds.match
                    }
                }
            }
        }
    ]
};

export default readerSchema;
