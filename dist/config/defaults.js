export const defaultConfig = {
    failOn: "high",
    allowlistComment: "guardrailmd-ignore",
    riskyShellVerbs: [
        "rm -rf",
        "sudo rm",
        "chmod 777",
        "curl | sh",
        "curl -fsSL",
        "wget -qO-",
        "mkfs",
        "dd if=",
        "git push --force",
        "kubectl delete",
        "terraform destroy"
    ],
    externalWriteHosts: [
        "api.github.com",
        "hooks.slack.com",
        "discord.com/api",
        "api.stripe.com",
        "aws.amazon.com",
        "s3.amazonaws.com"
    ],
    secretPatterns: [
        { "name": "GitHub token", "pattern": "gh[pousr]_[A-Za-z0-9_]{30,}" },
        { "name": "Slack token", "pattern": "xox[baprs]-[A-Za-z0-9-]{20,}" },
        { "name": "AWS access key", "pattern": "AKIA[0-9A-Z]{16}" },
        { "name": "Generic API key assignment", "pattern": "(api[_-]?key|token|secret)\\s*[:=]\\s*['\\\"]?[A-Za-z0-9_./+-]{20,}" }
    ],
    missingConfirmation: {
        destructiveVerbs: ["delete", "destroy", "drop", "truncate", "overwrite", "purge", "revoke"],
        confirmationWords: ["confirm", "ask", "approval", "explicit", "dry-run", "backup", "rollback"]
    }
};
//# sourceMappingURL=defaults.js.map