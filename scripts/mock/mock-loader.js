import fs from "node:fs";

import "../../setupGlobals.js";
import FileUtil from "../../src/util/misc/FileUtil.js";

const MockMapPath = FileUtil.resolve(process.env.MOCK_MAP_PATH || "mock-map.json"),
    MockMap = JSON.parse(fs.readFileSync(MockMapPath, "utf8"));

const MockUrls = new Map(
        Object.entries(MockMap).map(([moduleName, relativePath]) => [moduleName, FileUtil.toFileUrl(relativePath)])
    ),
    MockFiles = new Set(MockUrls.values());

export function resolve(specifier, context, nextResolve) {
    const externalModule = context.parentURL?.includes("node_modules") ?? true;

    if (externalModule || MockFiles.has(context.parentURL)) {
        return nextResolve(specifier, context);
    }

    const moduleName = FileUtil.getPathName(specifier),
        mockUrl = MockUrls.get(moduleName);

    return nextResolve(mockUrl ?? specifier, context);
}
