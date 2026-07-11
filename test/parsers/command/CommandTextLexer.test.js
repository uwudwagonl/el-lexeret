import { describe, expect, test } from "vitest";

import CommandTextLexer from "../../../src/parsers/command/CommandTextLexer.js";

import ParserError from "../../../src/errors/ParserError.js";

describe("CommandTextLexer", () => {
    test("lexes basic text and quotes", () => {
        const tokens = CommandTextLexer.lex('hello "world of code" end');

        expect(tokens.length).toBe(3);
        expect(tokens[0].value).toBe("hello");
        expect(tokens[1].type).toBe("quoted");
        expect(tokens[1].value.value).toBe("world of code");
        expect(tokens[2].value).toBe("end");
    });

    test("lexes escaped quotes", () => {
        const tokens = CommandTextLexer.lex('alpha "quote \\" nested" beta');

        expect(tokens.length).toBe(3);
        expect(tokens[1].value.value).toBe('quote " nested');
    });

    test("preserves separators inside quotes", () => {
        const tokens = CommandTextLexer.lex('query "some --text = here" tail');

        expect(tokens.map(token => `${token.type}:${token.value}`)).toEqual([
            "text:query",
            "quoted:some --text = here",
            "text:tail"
        ]);
    });

    test("throws ParserError on unclosed quotes", () => {
        expect(() => CommandTextLexer.lex('hello "world')).toThrow(ParserError);
    });
});
