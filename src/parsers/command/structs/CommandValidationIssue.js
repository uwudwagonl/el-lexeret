class CommandValidationIssue {
    constructor(code, message, ref = {}) {
        this.code = code;
        this.message = message;
        this.ref = ref;
    }
}

export default CommandValidationIssue;
