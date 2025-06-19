---
sidebar_position: 1
title: Authentication Docs
sidebar_label: Authentication
---

```bash
curl -X POST "http://localhost:3000/authentication/sign-in" \
  -H "Content-Type: application/json" \
  -H "client-id: DEMO" \
  -d '{
        "access_token": "your_access_token",
        "email": "your_email@example.com"
      }'
```

```bash
curl -X POST "http://localhost:3000/authentication/sign-up" \
  -H "Content-Type: application/json" \
  -H "client-id: DEMO" \
  -d '{
        "access_token": "your_access_token",
        "email": "your_email@example.com"
      }'
```

```bash
curl -X DELETE "http://localhost:3000/authentication/delete-my-account/{auth_id}" \
  -H "Content-Type: application/json" \
  -H "client-id: DEMO"
```
