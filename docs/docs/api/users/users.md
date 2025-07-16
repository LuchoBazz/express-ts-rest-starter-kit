---
sidebar_position: 1
title: Users Docs
sidebar_label: Users
---

```bash
curl -X PUT http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -H "client-id: DEMO" \
  -d '{
    "email": "example@email.com",
    "username": "fulanito",
    "first_name": "John",
    "last_name": "Doe",
    "identification_number": "123456789",
    "phone_number": "+441234567890",
    "terms": true,
    "notifications": false,
    "is_active": true,
    "uid": "user-uid-001",
    "role": "ADMIN",
    "auth_provider": "google",
    "auth_type": "oauth"
  }'
```
