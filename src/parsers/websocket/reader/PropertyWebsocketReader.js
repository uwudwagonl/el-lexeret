import BaseWebsocketReader from "./BaseWebsocketReader.js";

class PropertyWebsocketReader extends BaseWebsocketReader {
    read(data) {
        if (data == null) {
            return undefined;
        }

        return data[this.options.name];
    }
}

export default PropertyWebsocketReader;
