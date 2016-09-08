#!/bin/bash

# curl --include --request POST http://localhost:3000/sign-up \
#   --header "Content-Type: application/json" \
#   --data '{
#     "credentials": {
#       "email": "peic.natasa@gmail.com",
#       "password": "123",
#       "password_confirmation": "123"
#     }
#   }'

# curl --include --request POST http://localhost:3000/sign-up \
#   --header "Content-Type: application/json" \
#   --data '{
#     "credentials": {
#       "email": "another@example.email",
#       "password": "an example password",
#       "password_confirmation": "an example password"
#     }
#   }'



# IT WORKED
# ~/wdi/projects/ecommerce-back (models)$ scripts/sign-up.sh
# HTTP/1.1 200 OK
# X-Powered-By: Express
# Access-Control-Allow-Origin: http://localhost:8080
# Vary: Origin
# Content-Type: application/json; charset=utf-8
# Content-Length: 162
# ETag: W/"a2-00d5p3L4aE8GyEgLX12DDQ"
# Date: Fri, 02 Sep 2016 21:42:12 GMT
# Connection: keep-alive
#
# {"admin":{"__v":0,"updatedAt":"2016-09-02T21:42:12.109Z","createdAt":"2016-09-02T21:42:12.109Z","email":"peic.natasa@gmail.com","_id":"57c9f234b715d94a6b2d0765"}}




curl --include --request POST http://localhost:3000/sign-up \
  --header "Content-Type: application/json" \
  --data '{
    "credentials": {
      "email": "natasa@gmail.com",
      "password": "123",
      "password_confirmation": "123"
    }
  }'
