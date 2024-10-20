---
sidebar_position: 1
title: Authentication Docs
sidebar_label: Authentication
---

```bash
curl -X POST "http://localhost:3000/organizations/DEMO/sign-in" \
  -H "Content-Type: application/json" \
  -d '{
        "access_token": "your_access_token",
        "email": "your_email@example.com"
      }'

```

```bash
curl -X POST "http://localhost:3000/organizations/DEMO/sign-up" \
  -H "Content-Type: application/json" \
  -d '{
        "access_token": "your_access_token",
        "email": "your_email@example.com"
      }'

```

```bash
curl -X DELETE "http://localhost:3000/organizations/DEMO/delete-my-account/{auth_id}" \
  -H "Content-Type: application/json"

```
