---
sidebar_position: 3
title: Payment Docs
sidebar_label: Payment
---

```bash
curl -X GET "http://localhost:3000/subscription-payments/{payment_id}" \
-H "Content-Type: application/json" \
-H "client-id: DEMO"
```

```bash
curl -X POST "http://localhost:3000/subscription-payments" \
-H "Content-Type: application/json" \
-H "client-id: DEMO" \
-d '{
  "subscription_id": "sub_123456789",
  "amount": 99.99,
  "currency": "USD",
  "external_payment_id": "ext_pay_987654321",
  "status": "completed"
}'
```

```bash
curl -X PUT "http://localhost:3000/subscription-payments/{payment_id}" \
-H "Content-Type: application/json" \
-H "client-id: DEMO" \
-d '{
  "subscription_id": "8663c4c2-914b-4fed-b5f3-af9bd17b884d",
  "amount": 99.99,
  "currency": "USD",
  "external_payment_id": "ext_pay_987654321",
  "status": "completed"
}'
```

```bash
curl -X DELETE "http://localhost:3000/subscription-payments/{payment_id}" \
-H "Content-Type: application/json" \
-H "client-id: DEMO"
```
