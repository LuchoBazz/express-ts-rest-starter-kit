# Requests

### Feature Flags

#### Find Feature Flag

```shell
curl --location --request GET 'http://localhost:3000/organizations/RITACUBA/feature_flag/testing'
```

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

#### Update Feature Flag

```shell
curl --location --request PUT 'http://localhost:3000/organizations/RITACUBA/feature_flag/testing' \
--header 'Content-Type: application/json' \
--data '{
    "percentage": 10,
    "is_experimental": false
}'
```

#### Delete Feature Flag

```shell
curl --location --request DELETE 'http://localhost:3000/organizations/RITACUBA/feature_flag/testing'
```
