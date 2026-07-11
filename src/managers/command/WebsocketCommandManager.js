import BaseCommandManager from "./BaseCommandManager.js";

import WebsocketCommand from "../../structures/command/WebsocketCommand.js";

import { getConfig } from "../../LevertClient.js";

class WebsocketCommandManager extends BaseCommandManager {
    static $name = "websocketCommandManager";

    static commandClass = WebsocketCommand;

    constructor(enabled) {
        const commandsDir = getConfig().websocketCommandsPath;

        super(enabled, commandsDir);
    }
}

export default WebsocketCommandManager;
