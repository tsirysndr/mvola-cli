---
sidebar_position: 3
---

# Get Transaction Status

Show the status of a transaction.

```bash title="Execute"
mvola transactions status 2ba1d66a-25cf-4c12-8a6f-4cb01255148e -d 0343500003
```

```json title="Response"
{
  "status": "completed",
  "serverCorrelationId": "2ba1d66a-25cf-4c12-8a6f-4cb01255148e",
  "notificationMethod": "polling",
  "objectReference": "636042511"
}
```
