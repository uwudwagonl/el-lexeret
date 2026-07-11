import { getClient } from "../../LevertClient.js";

class HelpCommand {
    static info = {
        name: "help",
        arguments: [],
        response: [
            {
                name: "commands",
                type: "array"
            }
        ]
    };

    handler() {
        const commands = getClient().websocketCommandManager.getCommands();

        return {
            commands: commands.map(cmd => cmd.name)
        };
    }
}

export default HelpCommand;
