#!/bin/bash

curl --include --request DELETE http://localhost:3000/sign-out/$ID --header "Authorization: Token token=$TOKEN"


# ID=57c9f234b715d94a6b2d0765 TOKEN=C23zqrNvRKFVP/XWZKT8hSkTg+9dKawwlSdHEPvm7Os=--k/+7LdBCsuOmCsLZisTBbGY/7+QJQcNMrk87ZHp5LgA= scripts/sign-out.sh


# ID=57cb16f556ac6b37135b9dc5 TOKEN=xbIS6Yfpj277Mj8ACcCRwVfIp4ix2+ITzVtOntdwQWQ=--YVpTfEwajvlu5pElADcsQXjWKYj3u4rcGd+AksuLeho= scripts/sign-out.sh



 # {"admin":{"_id":"57c9f234b715d94a6b2d0765","updatedAt":"2016-09-03T18:35:13.868Z","createdAt":"2016-09-02T21:42:12.109Z","email":"peic.natasa@gmail.com","token":"ZSi1i60F6tYlM8aWcmgHymfR55B3IlUWUmpTXmXaiwc=--XcYC25Y83MURlkpfuagm3rfF+zRbmnG/bn2jHWLtGk8=","__v":0}}
 #
 #
 #
 # curl --include --request DELETE http://localhost:3000/sign-out/$ID --header "Authorization: Token token=$TOKEN" ID=57c9f234b715d94a6b2d0765 TOKEN=R8kVGLu49uJKu9LKFX3WRYNpYwg7Nb+v/7SzT32+PzU=--9xOURp5unoQt58/TLu2jhfSYBEiUG5rVOfUUXcFqTB8=
