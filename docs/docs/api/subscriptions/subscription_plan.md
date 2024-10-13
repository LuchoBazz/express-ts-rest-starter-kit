---
sidebar_position: 1
title: Subscription Plan Docs
sidebar_label: Subscription Plan
---

```bash
curl -X GET "http://localhost:3000/subscriptions/{client_id}/plans/{slug}" \
-H "Content-Type: application/json"
```

```bash
curl -X POST "http://localhost:3000/subscriptions/{client_id}/plans" \
-H "Content-Type: application/json" \
-d '{
  "name": "Your Plan Name",
  "productId": "12345",
  "variants": ["variant1", "variant2"],
  "slug": "your-plan-slug",
  "price": 29.99,
  "href": "https://your-link.com",
  "billingCycle": "monthly",
  "description": "A brief description of the plan",
  "nodeQuota": 10,
  "features": "Feature1, Feature2",
  "mostPopular": true,
  "tier": 2
}'
```

```bash
curl -X PUT "http://localhost:3000/subscriptions/{client_id}/plans/{slug}" \
-H "Content-Type: application/json" \
-d '{
  "price": 99.99,
  "billingCycle": "monthly",
  "description": "Updated subscription plan description",
  "nodeQuota": 5,
  "features": "Feature1, Feature2",
  "mostPopular": true,
  "tier": 1,
  "isActive": true
}'
```

```bash
curl -X DELETE "http://localhost:3000/subscriptions/{client_id}/plans/{slug}" \
  -H "Content-Type: application/json"
```
