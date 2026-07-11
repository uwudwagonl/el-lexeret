import { loadBotConfig } from "../../config/loadConfig.js";

import { getClient, getLogger } from "../../LevertClient.js";

class RestartCommand {
    static info = {
        name: "restart",
        aliases: ["reload"]
    };

    async handler() {
        await getClient().restart(() => {
            getLogger().info("Reloading configs...");
            return loadBotConfig(getLogger());
        });

        return "Restarted bot!";
    }
}

export default RestartCommand;
