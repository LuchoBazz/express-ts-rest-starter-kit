---
sidebar_position: 1
title: Authentication Docs
sidebar_label: Authentication
---

```bash
curl -X POST "http://localhost:3000/authentication/sign-in" \
-H "Content-Type: application/json" \
-H "client-id: DEMO" \
-H "x-forwarded-for: 127.0.0.1" \
-d '{
      "access_token": "your_access_token",
      "email": "your_email@example.com"
    }'
```

```bash
curl -X POST 'http://localhost:3000/authentication/sign-up' \
-X 'Content-Type: application/json' \
-X 'client-id: DEMO' \
-X 'x-forwarded-for: 127.0.0.1' \
-D '{
      "access_token": "PROVIDER_ACCESS_TOKEN",
      "email": "test@demo.com",
      "username": "test",
      "first_name": "test",
      "last_name": "test",
      "terms": true,
      "notifications": true
    }'
```

```bash
curl -X POST 'http://localhost:3000/authentication/user-logged-in' \
-H 'Content-Type: application/json' \
-H 'client-id: DEMO' \
-H 'Authorization: Bearer JWT_AUTH_TOKEN'
```

```bash
curl -X POST "http://localhost:3000/authentication/refresh-token" \
-H "Content-Type: application/json" \
-H "client-id: DEMO" \
-d '{
      "refresh_token": "your_refresh_token"
    }'
```

```bash
curl -X DELETE "http://localhost:3000/authentication/delete-my-account/{auth_id}" \
-H "Content-Type: application/json" \
-H "client-id: DEMO" \
-H 'Authorization: Bearer JWT_AUTH_TOKEN'
```

```bash
curl -X GET "http://localhost:3000/authentication/tokens" \
-H "Content-Type: application/json" \
-H "client-id: DEMO" \
-H "Authorization: Bearer JWT_AUTH_TOKEN"
```

```bash
curl -X POST "http://localhost:3000/authentication/tokens/logout" \
-H "Content-Type: application/json" \
-H "client-id: DEMO" \
-H "Authorization: Bearer JWT_AUTH_TOKEN"

```

```bash
curl -X POST "http://localhost:3000/authentication/tokens/revoke-all" \
-H "Content-Type: application/json" \
-H "client-id: DEMO" \
-H "Authorization: Bearer JWT_AUTH_TOKEN"
```

```bash
curl -X POST "http://localhost:3000/authentication/tokens/revoke-all-except-current" \
-H "Content-Type: application/json" \
-H "client-id: DEMO" \
-H "Authorization: Bearer JWT_AUTH_TOKEN"
```
