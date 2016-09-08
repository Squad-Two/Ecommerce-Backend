#!/bin/bash

curl --include --request POST http://localhost:3000/sign-in \
  --header "Content-Type: application/json" \
  --data '{
    "credentials": {
      "email": "peic.natasa@gmail.com",
      "password": "123",
      "password_confirmation": "123"
    }
  }'

  # IT WORKED
  # ~/wdi/projects/ecommerce-back (models)$
  # ~/wdi/projects/ecommerce-back (models)$ scripts/sign-in.sh
  # HTTP/1.1 200 OK
  # X-Powered-By: Express
  # Access-Control-Allow-Origin: http://localhost:8080
  # Vary: Origin
  # Content-Type: application/json; charset=utf-8
  # Content-Length: 263
  # ETag: W/"107-KdAxsR/kFmP910KPDsdyzg"
  # Date: Fri, 02 Sep 2016 21:52:41 GMT
  # Connection: keep-alive
  #
  # {"admin":{"_id":"57c9f234b715d94a6b2d0765","updatedAt":"2016-09-02T21:52:41.023Z","createdAt":"2016-09-02T21:42:12.109Z","email":"peic.natasa@gmail.com","token":"pumzAzJtosLBqg1A2IbQwTGS9PKiCSqNBNB05n9/WB4=--3DNBfh45GTyEW95A3kfcSWKYk2ovuciaGVWq7I+n6FQ=","__v":0}}~/wdi/projects/ecommerce-back (models)$


  # curl --include --request POST http://localhost:3000/sign-in \
  #   --header "Content-Type: application/json" \
  #   --data '{
  #     "credentials": {
  #       "email": "natasa@gmail.com",
  #       "password": "123",
  #       "password_confirmation": "123"
  #     }
  #   }'
