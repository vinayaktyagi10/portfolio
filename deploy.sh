#!/bin/bash

# Configuration
REGISTRY="git.toolden.xyz"
USERNAME="vinayak"       
IMAGE_NAME="portfolio"
TAG="latest"

# Ensure we stop on errors
set -e

echo "🚀 Starting Deployment Build for $REGISTRY..."

# 1. Login to Registry
if [ -z "$GITEA_TOKEN" ]; then
    echo "⚠️  GITEA_TOKEN not found. Assuming you are already logged in."
    echo "   (To automate: export GITEA_TOKEN='your_token')"
else
    echo "🔑 Logging into Gitea Registry..."
    echo "$GITEA_TOKEN" | docker login $REGISTRY -u "$USERNAME" --password-stdin
fi

# 2. Build for Production
echo "🏗️  Building Docker Image..."
# Using linux/amd64 explicitly to ensure compatibility with your server
docker build --platform linux/amd64 -t "$REGISTRY/$USERNAME/$IMAGE_NAME:$TAG" .

# 3. Push to Gitea
echo "tbl️  Pushing to Registry..."
docker push "$REGISTRY/$USERNAME/$IMAGE_NAME:$TAG"

echo "✅ Build Pushed Successfully to $REGISTRY/$USERNAME/$IMAGE_NAME:$TAG"
