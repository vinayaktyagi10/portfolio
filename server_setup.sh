#!/bin/bash

# Server-Side Setup Script for Portfolio
# Run this ON your Homelab Server

NETWORK_NAME="us_default"
REGISTRY="git.toolden.xyz"
IMAGE="git.toolden.xyz/admin/portfolio:latest"
CONTAINER_NAME="portfolio"

echo "------ Starting Portfolio Server Setup ------"

# 1. Ensure Docker Network Exists
if [ ! "$(docker network ls -q -f name=$NETWORK_NAME)" ]; then
    echo "Creating network: $NETWORK_NAME..."
    docker network create $NETWORK_NAME
else
    echo "Network $NETWORK_NAME already exists."
fi

# 2. Login to Registry
echo "Please log in to $REGISTRY (if not already logged in):"
docker login $REGISTRY

# 3. Pull the latest image
echo "Pulling latest image..."
docker pull $IMAGE

# 4. Stop/Remove old container if it exists
if [ "$(docker ps -aq -f name=$CONTAINER_NAME)" ]; then
    echo "Removing old container..."
    docker rm -f $CONTAINER_NAME
fi

# 5. Run new container
echo "Starting container..."
docker run -d \
  --name $CONTAINER_NAME \
  --restart always \
  --network $NETWORK_NAME \
  $IMAGE

echo "------ Setup Complete! ------"
echo "Don't forget to update your Caddyfile:"
echo "portfolio.toolden.xyz {"
echo "    reverse_proxy portfolio:3000"
echo "}"
