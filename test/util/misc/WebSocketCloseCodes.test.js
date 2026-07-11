import { describe, expect, test } from "vitest";

import {
    createCloseCodeRegistry,
    getCloseCode,
    getCloseCodeInfo,
    getCloseName,
    getCloseReason,
    standardWsCloseCodeInfo,
    wsCloseCodes
} from "../../../src/util/misc/WebsocketCloseCodes.js";
import {
    closeCodes,
    getCloseCodeInfo as getGatewayCloseCodeInfo
} from "../../../src/structures/gateway/GatewayCloseCodes.js";

describe("WebsocketCloseCodes", () => {
    test("maps websocket close codes to readable reasons", () => {
        expect(getCloseReason(1000)).toBe("Normal Closure");
        expect(getCloseReason(4321)).toBe("Private Use");
    });

    test("maps websocket close names back to codes", () => {
        expect(getCloseCode("NORMAL_CLOSURE")).toBe(1000);
        expect(getCloseCode("NOT_AUTHENTICATED")).toBeNull();
        expect(wsCloseCodes.INTERNAL_ERROR).toBe(1011);
    });

    test("maps websocket close codes to symbolic names", () => {
        expect(getCloseName(1002)).toBe("PROTOCOL_ERROR");
        expect(getCloseName(4001)).toBe("PRIVATE_USE");
        expect(getCloseName(4999)).toBe("PRIVATE_USE");
    });

    test("returns websocket close info for registered and ranged codes", () => {
        expect(getCloseCodeInfo(1014)).toEqual({
            name: "BAD_GATEWAY",
            reason: "Bad Gateway"
        });

        expect(getCloseCodeInfo(3001)).toEqual({
            name: "UNASSIGNED_REGISTERABLE",
            reason: "Unassigned Registerable Close Code"
        });
    });

    test("extends websocket close code helpers for gateway-specific codes", () => {
        const registry = createCloseCodeRegistry({
            4001: {
                name: "UNKNOWN_OPCODE",
                reason: "Unknown Opcode"
            }
        });

        expect(standardWsCloseCodeInfo[4001]).toBeUndefined();
        expect(registry.getCloseCode("UNKNOWN_OPCODE")).toBe(4001);
        expect(registry.getCloseReason(4001)).toBe("Unknown Opcode");
        expect(closeCodes.NOT_AUTHENTICATED).toBe(4003);
        expect(getGatewayCloseCodeInfo(4009)).toEqual({
            name: "SESSION_TIMEOUT",
            reason: "Session Timeout"
        });
    });
});
