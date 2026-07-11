import { getClient } from "../../LevertClient.js";

class ReloadCommandsCommand {
    static info = {
        name: "reload_commands",
        arguments: [],
        response: [
            {
                name: "success",
                type: "boolean"
            },
            {
                name: "message",
                type: "string"
            }
        ]
    };

    async handler() {
        getClient().silenceDiscordTransports(true);
        await getClient().commandManager.reloadCommands();
        await getClient().websocketCommandManager.reloadCommands();
        getClient().silenceDiscordTransports(false);

        return {
            success: true,
            message: "Reloaded commands!"
        };
    }
}

export default ReloadCommandsCommand;
