import {
    ArrayCommandType,
    BaseCommandType,
    BooleanCommandType,
    EnumCommandType,
    GroupCommandType,
    IntegerCommandType,
    NumberCommandType,
    ObjectCommandType,
    ScriptCommandType,
    StringCommandType
} from "./index.js";

const CommandTypeClasses = new Map([
    [BaseCommandType.type, BaseCommandType],
    [StringCommandType.type, StringCommandType],
    [IntegerCommandType.type, IntegerCommandType],
    [NumberCommandType.type, NumberCommandType],
    [BooleanCommandType.type, BooleanCommandType],
    [ScriptCommandType.type, ScriptCommandType],
    [ArrayCommandType.type, ArrayCommandType],
    [ObjectCommandType.type, ObjectCommandType],
    [GroupCommandType.type, GroupCommandType],
    [EnumCommandType.type, EnumCommandType]
]);

export default CommandTypeClasses;
