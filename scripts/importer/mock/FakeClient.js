import ClientError from "../../../src/errors/ClientError.js";

let client = null;

class LevertClient {
    constructor(config, logger) {
        if (client === null) {
            client = this;
        } else {
            throw new ClientError("The client can only be constructed once");
        }

        this.config = config;
        this.reactions = {};

        this.logger = logger;
    }
}

function getClient() {
    return client;
}

function getConfig() {
    return client?.config ?? null;
}

function getEmoji(name) {
    return getConfig()?.emoji?.[name] ?? "";
}

function getLogger() {
    return client?.logger ?? null;
}

export { LevertClient, getClient, getConfig, getEmoji, getLogger };
