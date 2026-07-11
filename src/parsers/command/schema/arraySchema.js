const arraySchema = {
    $id: "command-argument-array-schema",
    type: "array",
    items: {
        $ref: "command-argument-schema"
    }
};

export default arraySchema;
