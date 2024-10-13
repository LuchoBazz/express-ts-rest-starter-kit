---
sidebar_position: 2
title: Subscription Docs
sidebar_label: Subscription
---

```bash
curl -X GET "http://localhost:3000/organizations/{client_id}/subscriptions" \
-H "Content-Type: application/json"
```

```bash
curl -X GET "http://localhost:3000/organizations/{client_id}/subscriptions/{id}" \
  -H "Content-Type: application/json"
```

```bash
curl -X POST 'http://localhost:3000/organizations/{client_id}/subscriptions' \
-H 'Content-Type: application/json' \
-d '{
  "user_id": "your_user_id",
  "subscription_plan_id": "your_subscription_plan_id",
  "external_subscription_id": "optional_external_subscription_id",
  "billing_cycle": "monthly",
  "status": "active",
  "is_active": true,
  "renews_at": "2024-12-31T00:00:00Z",
  "starts_at": "2024-01-01T00:00:00Z",
  "ends_at": "2025-01-01T00:00:00Z"
}'
```

```bash
curl -X PUT "http://localhost:3000/organizations/{client_id}/subscriptions/{id}" \
  -H "Content-Type: application/json" \
  -d '{
    "user_id": "987e6543-a21c-43b5-987f-765321098fbc",
    "subscription_plan_id": "876e5432-a21c-43b5-987f-765432109fbc",
    "external_subscription_id": "EXTERNAL-123456789",
    "billing_cycle": "monthly",
    "status": "active",
    "is_active": true,
    "renews_at": "2024-10-13T00:00:00.000Z",
    "starts_at": "2023-10-13T00:00:00.000Z",
    "ends_at": "2025-10-13T00:00:00.000Z"
  }'
```

```bash
curl -X DELETE 'http://localhost:3000/organizations/{client_id}/subscriptions/{id}' \
-H 'Content-Type: application/json'
```
