#!/bin/bash

# Configuration
SERVER="homelab"
IMAGE_NAME="git.toolden.xyz/admin/portfolio:latest"
CONTAINER_NAME="portfolio"
NETWORK="us_default"

set -e # Exit on error

echo "--- Starting Automated Deployment ---"

# 1. Build locally (Targeting Linux/AMD64)
echo "Building Docker image with BuildKit..."
DOCKER_BUILDKIT=1 docker build --platform linux/amd64 -t $IMAGE_NAME ./web

# 2. Save and Compress
echo "Exporting image..."
docker save $IMAGE_NAME | gzip > portfolio.tar.gz

# 3. Transfer to Server
echo "Transferring to server..."
scp portfolio.tar.gz $SERVER:~ 

# 4. Remote Load and Restart
echo "Deploying on server..."
ssh $SERVER " \
    docker load < ~/portfolio.tar.gz && \
    docker rm -f $CONTAINER_NAME || true && \
    docker run -d --name $CONTAINER_NAME --restart always --network $NETWORK $IMAGE_NAME && \
    rm ~/portfolio.tar.gz
"

# 5. Local Cleanup
rm portfolio.tar.gz

echo "--- Deployment Complete! ---"
echo "Live at: https://portfolio.toolden.xyz"
