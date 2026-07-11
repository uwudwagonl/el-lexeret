class CommandArgumentResult {
    constructor(name, input, value, valid, issues = []) {
        this.name = name;
        this.input = input;
        this.value = value;
        this.valid = valid;
        this.issues = issues;
    }
}

export default CommandArgumentResult;
