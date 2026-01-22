# CI/CD Strategy: The "Registry Handoff" Pattern

This guide documents how to implement a CI/CD pipeline that leverages your Development Machine's power for building, while using Gitea Actions on your Homelab for automated deployment.

## 🏗️ The Architecture

| Stage | Executed By | Action |
| :--- | :--- | :--- |
| **1. Code** | You | Write code and commit to Gitea. |
| **2. Build** | **Dev Machine** | Runs `docker build`, tags the image, and pushes it to Gitea's Container Registry. |
| **3. Trigger** | Gitea | Receives the `push` event or a specific tag. |
| **4. Deploy** | **Homelab Server** | A Gitea Runner pulls the new image and restarts the container. |

---

## ✅ Prerequisites

1.  **Enable Gitea Container Registry:**
    *   Go to your Gitea `app.ini` and ensure `[packages]` is enabled.
    *   This allows you to push images to `git.vinayak.dev/vinayak/portfolio:latest`.

2.  **Install Gitea Runner (Act Runner) on Homelab:**
    *   The runner is a lightweight binary that listens for jobs.
    *   [Official Setup Guide](https://docs.gitea.com/usage/actions/act-runner)

---

## 🛠️ Step 1: Local Build Script (`deploy.sh`)

Instead of typing docker commands manually, create a `deploy.sh` in your project root. This acts as your "Local CI".

```bash
#!/bin/bash

# Configuration
REGISTRY="git.vinayak.dev"
USERNAME="vinayak"
IMAGE_NAME="portfolio"
TAG="latest"

echo "🚀 Starting Deployment Build..."

# 1. Login to Registry (Only needed once, but good to check)
echo "🔑 Logging into Gitea Registry..."
echo $GITEA_TOKEN | docker login $REGISTRY -u $USERNAME --password-stdin

# 2. Build for Production (Targeting Linux/AMD64 since server is likely x86)
echo "🏗️ Building Docker Image..."
docker build --platform linux/amd64 -t $REGISTRY/$USERNAME/$IMAGE_NAME:$TAG .

# 3. Push to Gitea
echo "tbl️ Pushing to Registry..."
docker push $REGISTRY/$USERNAME/$IMAGE_NAME:$TAG

echo "✅ Build Pushed Successfully!"
```

---

## 🤖 Step 2: Server-Side Deployment Action

Create a file in your repo: `.gitea/workflows/deploy.yaml`.
This tells the runner on your server what to do when code changes (or when you manually trigger it).

**Note:** For the "Registry Handoff" to work perfectly, you can trigger this workflow manually OR have it watch for a specific event. A simple approach is to let the runner just do the "Pull & Restart".

```yaml
name: Deploy to Homelab
run-name: Deploying Portfolio 🚀

on:
  # Trigger when a new package/image is pushed? 
  # Gitea Actions doesn't perfectly support "on: registry_package" yet.
  # So we usually trigger this on 'push' to main, OR manually.
  push:
    branches:
      - main
  workflow_dispatch: # Allows manual button click in Gitea UI

jobs:
  deploy:
    runs-on: ubuntu-latest # This maps to your self-hosted runner
    steps:
      - name: 🛑 Stop Old Container
        run: docker stop portfolio || true

      - name: 🗑️ Remove Old Container
        run: docker rm portfolio || true

      - name: ⬇️ Pull New Image
        # Note: Ensure the runner has permissions to pull from local Gitea
        run: docker pull git.vinayak.dev/vinayak/portfolio:latest

      - name: ▶️ Start New Container
        run: |
          docker run -d \
            --name portfolio \
            --restart always \
            -p 3000:3000 \
            --network caddy_net \
            git.vinayak.dev/vinayak/portfolio:latest
      
      - name: 🧹 Cleanup
        run: docker image prune -f
```

## 🔄 Alternative: "Watchtower" (No Actions Needed)

If you don't want to set up Gitea Runners yet, use **Watchtower**.

1.  Run **Watchtower** on your Homelab (you might already have it?).
2.  Add a label to your Portfolio container: `com.centurylinklabs.watchtower.enable=true`.
3.  When you run `deploy.sh` on your laptop and push the image, Watchtower (on the server) sees the new hash, pulls it, and restarts the app automatically within a few minutes.

**Verdict:**
*   **Gitea Actions:** Instant deployment, more control.
*   **Watchtower:** Polling-based (slower), zero config.
