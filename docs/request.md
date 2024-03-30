# Requests

### Feature Flags

#### Create Feature Flag

```shell
curl --location --request POST 'http://localhost:3000/organizations/RITACUBA/feature_flag' \
--header 'Content-Type: application/json' \
--data '{
  "key": "testing",
  "percentage": 99,
  "is_experimental": true
}'
```
