#!/bin/bash

# Configuration
REGISTRY="git.toolden.xyz"
USERNAME="vinayak"
IMAGE_NAME="portfolio"
TAG="latest"

echo "Starting Deployment Build..."

# 1. Login to Registry (Only needed once, but good to check)
echo "Logging into Gitea Registry..."
echo $GITEA_TOKEN | docker login $REGISTRY -u $USERNAME --password-stdin

# 2. Build for Production (Targeting Linux/AMD64 for server)
echo "Building Docker Image..."
docker build --platform linux/amd64 -t $REGISTRY/$USERNAME/$IMAGE_NAME:$TAG ./web

# 3. Push to Gitea
echo "Pushing to Registry..."
docker push $REGISTRY/$USERNAME/$IMAGE_NAME:$TAG

echo "Build Pushed Successfully!"