# Safe runbook

Preview changes first:

```sh
terraform plan
```

Ask for explicit approval before delete operations, keep a backup, and document rollback.

<!-- guardrailmd-ignore: intentional fire-drill command documented below -->
rm -rf ./tmp/fire-drill
