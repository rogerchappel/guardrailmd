# Cache Purge Runbook

This reviewed fixture keeps destructive steps explicit and bounded.

## Preconditions

- Confirm the target is the disposable staging cache host.
- Confirm the latest deployment has completed.
- Keep a rollback ticket open until the cache rebuild is healthy.

## Dry run

```sh
find ./tmp/staging-cache -maxdepth 1 -type f -print
```

## Execute

```sh
find ./tmp/staging-cache -maxdepth 1 -type f -delete
```

## Rollback

Rebuild the staging cache from the previous artifact and record the rebuild command output in the incident note.
