import BaseCommandReader from "./BaseCommandReader.js";
import CommandTextLexer from "../CommandTextLexer.js";

import CommandReaderKinds from "./CommandReaderKinds.js";

import Util from "../../../util/Util.js";
import ArrayUtil from "../../../util/ArrayUtil.js";

const defaultSeparators = [" ", "\n"];

class ListCommandReader extends BaseCommandReader {
    static kind = CommandReaderKinds.list;

    constructor(options = {}) {
        super(options);

        this.separators = ArrayUtil.guaranteeArray(this.options.separator ?? defaultSeparators).filter(
            separator => typeof separator === "string" && !Util.empty(separator)
        );
    }

    read(session) {
        return CommandTextLexer.lex(this.getSourceText(session), this.separators).map(token => token.value);
    }
}

export default ListCommandReader;
