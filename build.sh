#!/bin/env bash

rm -rf dist/
npm ci
npm run now-build

$(aws ecr get-login --no-include-email --region eu-west-1)
docker build -t ghsearch:latest --rm .
docker tag ghsearch:latest 168268005725.dkr.ecr.eu-west-1.amazonaws.com/ghsearch:latest
docker push 168268005725.dkr.ecr.eu-west-1.amazonaws.com/ghsearch:latest
# aws ecs update-service --cluster app-cluster --service app-service --force-new-deployment
