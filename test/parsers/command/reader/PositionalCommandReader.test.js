import { describe, expect, test } from "vitest";

import PositionalCommandReader from "../../../../src/parsers/command/reader/PositionalCommandReader.js";

describe("PositionalCommandReader", () => {
    test("splits arguments with single and multiple separators", () => {
        expect(PositionalCommandReader.split("ONE TWO", { lowercase: true })).toEqual(["one", "TWO"]);
        expect(PositionalCommandReader.split("a,b,c", { separator: ",", n: 2 })).toEqual(["a,b", "c"]);
        expect(PositionalCommandReader.split("a\nb c", { lowercase: true, separator: [" ", "\n"] })).toEqual([
            "a",
            "b c"
        ]);
        expect(PositionalCommandReader.split("abc", { separator: [] })).toEqual(["abc", ""]);
        expect(PositionalCommandReader.split(null, { separator: [null, ","] })).toEqual(["", ""]);
        expect(PositionalCommandReader.split("abc", { separator: [null], n: 0 })).toEqual(["abc", ""]);
        expect(PositionalCommandReader.split("abc", { separator: ",", n: 2 })).toEqual(["abc", ""]);
    });
});
