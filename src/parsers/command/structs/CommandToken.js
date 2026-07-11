class CommandToken {
    constructor(type, value, raw, index) {
        this.type = type;
        this.value = value;
        this.raw = raw;
        this.index = index;
    }
}

export default CommandToken;
