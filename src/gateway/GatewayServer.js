import { EventEmitter } from "node:events";

import { WebSocketServer } from "ws";

import { getLogger } from "../LevertClient.js";

class GatewayServer extends EventEmitter {
    static defaultPort = 8081;

    constructor(port, options = {}) {
        super();

        this.port = port ?? this.constructor.defaultPort;
        this.options = options;

        this.websocketServer = null;
        this.sockets = new Set();

        this._handleConnection = this._handleConnection.bind(this);
    }

    start() {
        if (this.websocketServer !== null) {
            return;
        }

        getLogger().info(`Starting WebSocket server on port ${this.port}...`);

        this.websocketServer = new WebSocketServer({
            port: this.port
        });

        this.websocketServer.on("connection", this._handleConnection);
        this.websocketServer.on("error", err => {
            this.emit("server_error", err);
        });
    }

    stop() {
        if (this.websocketServer === null) {
            return;
        }

        getLogger().info("Stopping WebSocket server...");

        for (const socket of this.sockets) {
            socket.removeAllListeners("close");
            socket.removeAllListeners("error");
            socket.close();
        }

        this.sockets.clear();

        this.websocketServer.close();
        this.websocketServer = null;
    }

    _handleConnection(socket, req) {
        this.sockets.add(socket);

        this.emit("connection", socket, req);

        socket.on("message", (data, isBinary) => {
            this.emit("message", socket, data, isBinary);
        });

        socket.on("close", (code, reason) => {
            this.sockets.delete(socket);
            this.emit("close", socket, code, reason);
        });

        socket.on("error", err => {
            this.sockets.delete(socket);
            this.emit("error", socket, err);
        });
    }
}

export default GatewayServer;
