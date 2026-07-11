import { afterAll, beforeAll, describe, expect, test } from "vitest";
import { WebSocket } from "ws";

import { createRuntime, cleanupRuntime } from "../helpers/runtimeHarness.js";

import GatewayClient from "../../scripts/GatewayClient.js";

const port = Math.floor(20000 + Math.random() * 10000),
    url = `ws://localhost:${port}`;

describe("Gateway protocol and GatewayClient", () => {
    let runtime;

    beforeAll(async () => {
        runtime = await createRuntime({
            loadManagers: true,
            loadHandlers: true,
            loadVMs: true,
            config: {
                enableWebsocket: true,
                websocketPort: port
            }
        });

        runtime.client.gatewayManager.handleMessage = runtime.client.websocketCommandHandler.execute;
        runtime.client.gatewayManager.active = true;

        await new Promise(resolve => setTimeout(resolve, 500));
    });

    afterAll(async () => {
        if (runtime !== undefined) {
            await cleanupRuntime(runtime);
        }
    });

    test("client can connect, identify and receive READY", async () => {
        const client = new GatewayClient(url, {
            clientId: "test_client_1",
            connectTimeout: 2000,
            pingInterval: 1000,
            pongTimeout: 500
        });

        await client.connect();

        expect(client.connected).toBe(true);
        expect(client.sessionId).toBeTypeOf("string");
        expect(client.sessionId.length).toBeGreaterThan(0);

        client.close();
    });

    test("rejects duplicate client ID with INVALID_SESSION and closes connection", async () => {
        const client1 = new GatewayClient(url, {
            clientId: "test_duplicate_cli",
            connectTimeout: 2000,
            pingInterval: 1000,
            pongTimeout: 500
        });

        await client1.connect();
        expect(client1.connected).toBe(true);

        const client2 = new GatewayClient(url, {
            clientId: "test_duplicate_cli",
            connectTimeout: 2000,
            pingInterval: 1000,
            pongTimeout: 500
        });

        await expect(client2.connect()).rejects.toThrow("already connected");
        expect(client2.connected).toBe(false);

        client1.close();
        client2.close();
    });

    test("client can resume session after disconnect", async () => {
        const client = new GatewayClient(url, {
            clientId: "test_resume_cli",
            connectTimeout: 2000,
            pingInterval: 1000,
            pongTimeout: 500,
            maxReconnectAttempts: 0
        });

        await client.connect();
        expect(client.connected).toBe(true);

        const firstSessionId = client.sessionId;
        expect(firstSessionId).toBeTypeOf("string");

        await client.reconnect();

        expect(client.connected).toBe(true);
        expect(client.sessionId).toBe(firstSessionId);

        client.close();
    });

    test("commands are blocked before identification", async () => {
        const rawWs = new WebSocket(url);

        const receivedClose = new Promise(resolve => {
            rawWs.on("close", (code, reason) => {
                resolve({ code, reason: reason.toString() });
            });
        });

        rawWs.on("open", () => {
            rawWs.send(
                JSON.stringify({
                    id: "1",
                    op: "version",
                    data: {}
                })
            );
        });

        const closeInfo = await receivedClose;
        expect(closeInfo.code).toBe(4003);
    });

    test("commands work after identifying", async () => {
        const client = new GatewayClient(url, {
            clientId: "test_command_cli",
            connectTimeout: 2000,
            pingInterval: 1000,
            pongTimeout: 500
        });

        await client.connect();

        const res = await client.sendRequest("version", {});
        expect(res.status).toBe("success");
        expect(res.data.version).toBeTypeOf("string");

        client.close();
    });
});
