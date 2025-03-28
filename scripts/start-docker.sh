#!/bin/bash

LATEST_TAG=$(git describe --tags --abbrev=0)
IMAGE="homepage:${LATEST_TAG}"

echo "##### Building homepage:${LATEST_TAG} #####"

sudo docker build -t $IMAGE .

echo "##### Removing existing homepage container #####"
sudo docker rm -f homepage 2> /dev/null || true

echo "##### Running homepage:${LATEST_TAG} #####"
sudo docker run --restart unless-stopped --name "homepage" -d $IMAGE
