import {
    GroupCommandReader,
    ListCommandReader,
    MatchCommandReader,
    OptionCommandReader,
    PositionalCommandReader,
    RestCommandReader
} from "./index.js";

const CommandReaderClasses = new Map([
    [PositionalCommandReader.kind, PositionalCommandReader],
    [RestCommandReader.kind, RestCommandReader],
    [ListCommandReader.kind, ListCommandReader],
    [OptionCommandReader.kind, OptionCommandReader],
    [MatchCommandReader.kind, MatchCommandReader],
    [GroupCommandReader.kind, GroupCommandReader]
]);

export default CommandReaderClasses;
