import BaseCommandContext from "./BaseCommandContext.js";

class WebsocketCommandContext extends BaseCommandContext {
    constructor(data) {
        super(data);

        this.handler = this.data.handler;
        this.socket = this.data.socket;
        this.id = this.data.id;
        this.clientId = this.data.clientId;

        this.args = this._parseArgs(data.args);
    }

    async reply(status, data) {
        this.markReplied();
        return await this.handler.contextReply(this, status, data);
    }

    async send(status, data) {
        return await this.reply(status, data);
    }

    _parseArgs(rawArgs) {
        return this.command.parseArguments(rawArgs, this);
    }
}

export default WebsocketCommandContext;
