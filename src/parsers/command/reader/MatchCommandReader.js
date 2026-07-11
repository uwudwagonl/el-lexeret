import BaseCommandReader from "./BaseCommandReader.js";

import CommandReaderKinds from "./CommandReaderKinds.js";

class MatchCommandReader extends BaseCommandReader {
    static kind = CommandReaderKinds.match;

    constructor(options = {}) {
        super(options);

        this.pattern = this.options.pattern instanceof RegExp ? this.options.pattern : null;
        this.index = this.options.index ?? 0;
    }

    read(session) {
        if (this.pattern === null) {
            return undefined;
        }

        const match = session.getPatternMatch(this.pattern, this.options.from ?? "args");
        return match?.[this.index];
    }
}

export default MatchCommandReader;
