import {
    ConnectPacket,
    DispatchPacket,
    HeartbeatAckPacket,
    HeartbeatPacket,
    IdentifyPacket,
    InvalidSessionPacket,
    ResumePacket
} from "./packets/index.js";

const PacketClasses = new Map([
    [ConnectPacket.op, ConnectPacket],
    [DispatchPacket.op, DispatchPacket],
    [HeartbeatPacket.op, HeartbeatPacket],
    [HeartbeatAckPacket.op, HeartbeatAckPacket],
    [IdentifyPacket.op, IdentifyPacket],
    [InvalidSessionPacket.op, InvalidSessionPacket],
    [ResumePacket.op, ResumePacket]
]);

export default PacketClasses;
