import { readFileSync } from "node:fs";

import GatewayClient from "./GatewayClient.js";
import Util from "../src/util/Util.js";
import FileUtil from "../src/util/misc/FileUtil.js";

let config;

try {
    config = JSON.parse(readFileSync("./config/config.json", "utf-8"));
} catch (err) {
    config = {
        websocketPort: 8081
    };
}

const port = config.websocketPort ?? 8081,
    url = `ws://localhost:${port}`;

const args = process.argv.slice(2);

if (Util.empty(args)) {
    console.error("Error: No file path specified.");
    process.exit(1);
}

const filePath = FileUtil.resolve(args[0]);
let fileContent;

try {
    fileContent = readFileSync(filePath, "utf-8");
} catch (err) {
    console.error(`Error reading file "${filePath}":`, err.message);
    process.exit(1);
}

const sourceUrl = FileUtil.toFileUrl(filePath);

let extraData = {};

if (typeof args[1] === "string") {
    try {
        extraData = JSON.parse(args[1]);
    } catch (err) {
        console.error(`Error parsing debug payload "${args[1]}":`, err.message);
        process.exit(1);
    }
}

async function main() {
    const client = new GatewayClient(url, { clientId: `vscode_debug_${Math.floor(Math.random() * 10000)}` });

    client.on("inspector_ready", data => {
        console.log(`Inspector ready. Target URL: ${data}`);
    });

    try {
        await client.connect();

        const res = await client.sendRequest("vm_eval", {
            ...extraData,
            code: fileContent,
            debug: true,
            sourceUrl
        });

        console.log("\n--- Script Output ---");
        console.log(typeof res.data.output === "object" ? JSON.stringify(res.data.output, null, 2) : res.data.output);
        console.log("---------------------\n");

        client.close();
        process.exit(0);
    } catch (err) {
        console.error("\n--- Execution Error ---");
        console.error(err.message);
        console.error("-----------------------\n");

        client.close();
        process.exit(1);
    }
}

main();
