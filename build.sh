#!/bin/env bash

rm -rf node_modules/ dist/
npm ci
npx ng build
$(aws ecr get-login --no-include-email --region eu-west-1)
docker build -t ghsearch --rm Dockerfile
docker tag ghsearch:latest 168268005725.dkr.ecr.eu-west-1.amazonaws.com/ghsearch:latest
docker push 168268005725.dkr.ecr.eu-west-1.amazonaws.com/ghsearch:latest
