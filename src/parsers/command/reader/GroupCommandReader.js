import BaseCommandReader from "./BaseCommandReader.js";

import CommandReaderKinds from "./CommandReaderKinds.js";

import ObjectUtil from "../../../util/ObjectUtil.js";

class GroupCommandReader extends BaseCommandReader {
    static kind = CommandReaderKinds.group;

    read(session) {
        const value = {},
            properties = ObjectUtil.guaranteeObject(this.options.properties);

        for (const [key, property] of Object.entries(properties)) {
            const result = session.results.get(property.name);

            if (typeof result !== "undefined") {
                value[key] = result.value;
            }
        }

        return value;
    }
}

export default GroupCommandReader;
