import { isSeverity } from "../severity.js";
function take(args, index, flag) {
    const value = args[index + 1];
    if (!value || value.startsWith("--"))
        throw new Error(`${flag} requires a value`);
    return value;
}
function isFormat(value) {
    return ["human", "json", "sarif"].includes(value);
}
export function parseArgs(argv, cwd) {
    const [command, ...args] = argv;
    if (!command || command === "--help" || command === "-h")
        return { command: "help" };
    if (command === "--version" || command === "-v")
        return { command: "version" };
    if (command === "init") {
        return { command: "init", init: { cwd, writeConfig: args.includes("--write-config"), force: args.includes("--force") } };
    }
    if (command !== "scan")
        throw new Error(`Unknown command: ${command}`);
    const paths = [];
    let format = "human";
    let output;
    let configPath;
    let failOn = "high";
    for (let i = 0; i < args.length; i += 1) {
        const arg = args[i];
        if (!arg)
            continue;
        if (arg === "--format") {
            const value = take(args, i, arg);
            if (!isFormat(value))
                throw new Error("--format must be one of: human, json, sarif");
            format = value;
            i += 1;
        }
        else if (arg === "--output") {
            output = take(args, i, arg);
            i += 1;
        }
        else if (arg === "--config") {
            configPath = take(args, i, arg);
            i += 1;
        }
        else if (arg === "--fail-on") {
            const severity = take(args, i, arg);
            if (!isSeverity(severity))
                throw new Error("--fail-on must be one of: info, low, medium, high, critical");
            failOn = severity;
            i += 1;
        }
        else if (arg.startsWith("--")) {
            throw new Error(`Unknown option: ${arg}`);
        }
        else {
            paths.push(arg);
        }
    }
    if (paths.length === 0)
        paths.push(".");
    const scan = { cwd, paths, format, failOn };
    if (output)
        scan.output = output;
    if (configPath)
        scan.configPath = configPath;
    return { command: "scan", scan };
}
//# sourceMappingURL=args.js.map