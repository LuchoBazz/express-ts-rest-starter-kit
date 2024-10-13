---
sidebar_position: 1
title: Subscription Plan Docs
sidebar_label: Subscription Plan
---

```bash
curl -X GET "http://localhost:3000/organizations/{client_id}/subscription-plans" \
  -H "Accept: application/json"
```

```bash
curl -X GET "http://localhost:3000/organizations/{client_id}/subscription-plans/{slug}" \
-H "Content-Type: application/json"
```

```bash
curl -X POST "http://localhost:3000/organizations/{client_id}/subscription-plans" \
-H "Content-Type: application/json" \
-d '{
  "name": "Your Plan Name",
  "product_id": "12345",
  "variants": ["variant1", "variant2"],
  "slug": "your-plan-slug-1",
  "price": 29.99,
  "href": "https://your-link.com",
  "billing_cycle": "weekly",
  "description": "A brief description of the plan",
  "node_quota": 10,
  "features": "Feature1, Feature2",
  "most_popular": true,
  "tier": 2
}'
```

```bash
curl -X PUT "http://localhost:3000/organizations/{client_id}/subscription-plans/{slug}" \
-H "Content-Type: application/json" \
-d '{
  "price": 99.99,
  "billing_cycle": "weekly",
  "description": "Updated subscription plan description",
  "node_quota": 10,
  "features": "Feature1, Feature2",
  "most_popular": true,
  "tier": 1,
  "is_active": true
}'
```

```bash
curl -X DELETE "http://localhost:3000/organizations/{client_id}/subscription-plans/{slug}" \
  -H "Content-Type: application/json"
```
