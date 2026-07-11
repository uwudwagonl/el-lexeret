class CommandQuotedValue {
    constructor(value, quote) {
        this.value = value;
        this.quote = quote;
    }

    toString() {
        return this.value;
    }
}

export default CommandQuotedValue;
