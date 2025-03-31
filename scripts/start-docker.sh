#!/bin/bash

LATEST_TAG=$(git describe --tags --abbrev=0)
IMAGE="pwc:${LATEST_TAG}"

echo "##### Building pwc:${LATEST_TAG} #####"

sudo docker build -t $IMAGE .

echo "##### Removing existing pwc container #####"
sudo docker rm -f pwc 2> /dev/null || true

echo "##### Running pwc:${LATEST_TAG} #####"
sudo docker run --restart unless-stopped --name "pwc" -d $IMAGE
