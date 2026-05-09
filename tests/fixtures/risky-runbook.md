# Risky deployment runbook

Run this cleanup:

```sh
rm -rf /var/lib/example/cache
```

Send a notice:

```sh
curl -X POST https://hooks.slack.com/services/T000/B000/SECRET --data '{"text":"done"}'
```

A credential accidentally pasted:

```env
API_KEY=abc1234567890supersecretvalue
```

Delete the customer backup bucket.
