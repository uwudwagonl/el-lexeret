import { createCloseCodeRegistry } from "../../util/misc/WebsocketCloseCodes.js";

const closeCodeInfo = {
    3000: {
        name: "UNAUTHORIZED",
        reason: "Unauthorized"
    },
    3003: {
        name: "FORBIDDEN",
        reason: "Forbidden"
    },
    3008: {
        name: "TIMEOUT",
        reason: "Timeout"
    },
    4000: {
        name: "UNKNOWN_ERROR",
        reason: "Unknown Error"
    },
    4001: {
        name: "UNKNOWN_OPCODE",
        reason: "Unknown Opcode"
    },
    4002: {
        name: "DECODE_ERROR",
        reason: "Decode Error"
    },
    4003: {
        name: "NOT_AUTHENTICATED",
        reason: "Not Authenticated"
    },
    4004: {
        name: "AUTHENTICATION_FAILED",
        reason: "Authentication Failed"
    },
    4005: {
        name: "ALREADY_AUTHENTICATED",
        reason: "Already Authenticated"
    },
    4009: {
        name: "SESSION_TIMEOUT",
        reason: "Session Timeout"
    }
};

const closeCodeRegistry = createCloseCodeRegistry(closeCodeInfo);

export const { closeCodes, getCloseCode, getCloseCodeInfo, getCloseName, getCloseReason } = closeCodeRegistry;
export { closeCodeInfo };
