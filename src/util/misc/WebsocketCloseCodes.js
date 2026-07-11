const standardWsCloseCodeInfo = Object.freeze({
    1000: {
        name: "NORMAL_CLOSURE",
        reason: "Normal Closure"
    },
    1001: {
        name: "GOING_AWAY",
        reason: "Going Away"
    },
    1002: {
        name: "PROTOCOL_ERROR",
        reason: "Protocol Error"
    },
    1003: {
        name: "UNSUPPORTED_DATA",
        reason: "Unsupported Data"
    },
    1004: {
        name: "RESERVED",
        reason: "Reserved"
    },
    1005: {
        name: "NO_STATUS_RCVD",
        reason: "No Status Rcvd"
    },
    1006: {
        name: "ABNORMAL_CLOSURE",
        reason: "Abnormal Closure"
    },
    1007: {
        name: "INVALID_FRAME_PAYLOAD_DATA",
        reason: "Invalid Frame Payload Data"
    },
    1008: {
        name: "POLICY_VIOLATION",
        reason: "Policy Violation"
    },
    1009: {
        name: "MESSAGE_TOO_BIG",
        reason: "Message Too Big"
    },
    1010: {
        name: "MANDATORY_EXTENSION",
        reason: "Mandatory Extension"
    },
    1011: {
        name: "INTERNAL_ERROR",
        reason: "Internal Error"
    },
    1012: {
        name: "SERVICE_RESTART",
        reason: "Service Restart"
    },
    1013: {
        name: "TRY_AGAIN_LATER",
        reason: "Try Again Later"
    },
    1014: {
        name: "BAD_GATEWAY",
        reason: "Bad Gateway"
    },
    1015: {
        name: "TLS_HANDSHAKE",
        reason: "TLS Handshake"
    }
});

function getRangeCloseCodeInfo(code) {
    switch (true) {
        case code >= 0 && code <= 999:
            return {
                name: "NOT_USED",
                reason: "Not Used"
            };
        case code >= 1016 && code <= 2999:
            return {
                name: "UNASSIGNED_FUTURE_STANDARD",
                reason: "For Future Standard Use"
            };
        case code >= 3000 && code <= 3999:
            return {
                name: "UNASSIGNED_REGISTERABLE",
                reason: "Unassigned Registerable Close Code"
            };
        case code >= 4000 && code <= 4999:
            return {
                name: "PRIVATE_USE",
                reason: "Private Use"
            };
        default:
            return null;
    }
}

function createCloseCodeRegistry(closeCodeInfo) {
    closeCodeInfo = Object.freeze({
        ...standardWsCloseCodeInfo,
        ...closeCodeInfo
    });

    const closeCodes = Object.freeze(
        Object.fromEntries(Object.entries(closeCodeInfo).map(([code, info]) => [info.name, Number(code)]))
    );

    const getCloseCodeInfo = code => {
        if (typeof code !== "number") {
            return null;
        }

        return closeCodeInfo[code] ?? getRangeCloseCodeInfo(code);
    };

    const getCloseCode = name => closeCodes[name] ?? null;
    const getCloseName = code => getCloseCodeInfo(code)?.name ?? "UNKNOWN";
    const getCloseReason = code => getCloseCodeInfo(code)?.reason ?? "Unknown";

    return Object.freeze({
        closeCodeInfo,
        closeCodes,
        getCloseCode,
        getCloseCodeInfo,
        getCloseName,
        getCloseReason
    });
}

const defaultRegistry = createCloseCodeRegistry({});

const wsCloseCodeInfo = defaultRegistry.closeCodeInfo,
    wsCloseCodes = defaultRegistry.closeCodes,
    getCloseCode = defaultRegistry.getCloseCode,
    getCloseCodeInfo = defaultRegistry.getCloseCodeInfo,
    getCloseName = defaultRegistry.getCloseName,
    getCloseReason = defaultRegistry.getCloseReason;

export {
    standardWsCloseCodeInfo,
    wsCloseCodeInfo,
    wsCloseCodes,
    createCloseCodeRegistry,
    getCloseCode,
    getCloseCodeInfo,
    getCloseName,
    getCloseReason
};
