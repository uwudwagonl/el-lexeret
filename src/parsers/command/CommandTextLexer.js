import CommandToken from "./structs/CommandToken.js";
import CommandQuotedValue from "./structs/CommandQuotedValue.js";

import ParserError from "../../errors/ParserError.js";

class CommandTextLexer {
    static lex(str, separators = [" ", "\n"]) {
        str = String(str ?? "");

        let tokens = [],
            idx = 0;

        while (idx < str.length) {
            idx = this._skipSeparators(str, separators, idx);

            if (idx >= str.length) {
                break;
            }

            const token = this._readToken(str, separators, idx);
            tokens.push(token.value);

            idx = token.nextIndex;
        }

        return tokens;
    }

    static _skipSeparators(str, separators, idx) {
        let next = idx,
            length = this._getSeparatorLength(str, separators, next);

        while (length > 0 && next < str.length) {
            next += length;
            length = this._getSeparatorLength(str, separators, next);
        }

        return next;
    }

    static _readToken(str, separators, idx) {
        const state = {
            cooked: "",
            inQuote: false,
            quoteChar: null,
            start: idx
        };

        let next = idx;

        while (next < str.length) {
            if (!state.inQuote && this._getSeparatorLength(str, separators, next) > 0) {
                break;
            }

            next = this._readTokenCharacter(str, state, next);
        }

        if (state.inQuote) {
            throw new ParserError("Unclosed quote", state.start);
        }

        return {
            nextIndex: next,
            value: this._createToken(str, state, next)
        };
    }

    static _readTokenCharacter(str, state, idx) {
        const char = str[idx];

        if (!state.inQuote) {
            return this._readUnquotedCharacter(state, char, idx);
        }

        return this._readQuotedCharacter(str, state, char, idx);
    }

    static _readUnquotedCharacter(state, char, idx) {
        if (char === '"' || char === "'") {
            state.inQuote = true;
            state.quoteChar = char;

            return idx + 1;
        }

        state.cooked += char;
        return idx + 1;
    }

    static _readQuotedCharacter(str, state, char, idx) {
        if (char === "\\") {
            return this._readEscapeSequence(str, state, idx);
        }

        if (char === state.quoteChar) {
            state.inQuote = false;
            return idx + 1;
        }

        state.cooked += char;
        return idx + 1;
    }

    static _readEscapeSequence(str, state, idx) {
        const nextChar = str[idx + 1];

        if (nextChar === state.quoteChar || nextChar === "\\") {
            state.cooked += nextChar;
            return idx + 2;
        }

        state.cooked += "\\";
        return idx + 1;
    }

    static _createToken(str, state, end) {
        const raw = str.slice(state.start, end),
            quoted = this._isQuotedToken(raw);

        return new CommandToken(
            quoted ? "quoted" : "text",
            quoted ? new CommandQuotedValue(state.cooked, raw[0]) : state.cooked,
            raw,
            state.start
        );
    }

    static _isQuotedToken(raw) {
        return raw.length >= 2 && (raw.startsWith('"') || raw.startsWith("'")) && raw.endsWith(raw[0]);
    }

    static _getSeparatorLength(str, separators, idx) {
        for (const separator of separators) {
            if (separator && str.startsWith(separator, idx)) {
                return separator.length;
            }
        }

        return 0;
    }
}

export default CommandTextLexer;
