# Homelab CI/CD Implementation: Registry Handoff

This document summarizes the setup performed on 2026-01-22 to enable automated deployments for the `portfolio` project.

## 🏗️ Architecture Overview

The "Registry Handoff" pattern moves the resource-heavy build process to your local development machine, while the homelab server only handles pulling and running the final image.

1.  **Local Machine:** Builds the Docker image and pushes it to the Gitea Container Registry.
2.  **Gitea Server:** Acts as the central hub and image registry.
3.  **Gitea Runner:** A lightweight agent on the homelab that listens for deployment triggers and restarts the containers.

---

## ✅ Completed Setup

### 1. Gitea Registry Configuration
*   **Domain:** `git.toolden.xyz`
*   **Verification:** Confirmed that `[packages] ENABLED = true` is set in the Gitea `app.ini` on the server.
*   **Connectivity:** Verified the domain is reachable over Tailscale.

### 2. Gitea Runner Installation
We added a self-hosted runner to the Gitea stack on the homelab.
*   **Service Name:** `gitea_runner`
*   **Image:** `gitea/act_runner:latest`
*   **Capabilities:** Mapped to the host's `/var/run/docker.sock` to allow the runner to manage Docker containers on the server.
*   **Label:** `ubuntu-latest` (mapped to `docker://docker:latest`).

### 3. Local Build Script (`deploy.sh`)
Created a deployment script to automate the build-and-push process from the dev machine.
*   **Functionality:**
    1.  Logs into `git.toolden.xyz`.
    2.  Builds the image for `linux/amd64` (to match the server architecture).
    3.  Pushes the image to the Gitea registry.

---

## 🚀 How to Deploy

### Step 1: Push the Image
From your project directory (`../portfolio`), run the build script:
```bash
./deploy.sh
```
*Note: Ensure `GITEA_TOKEN` is set in your environment for automation.*

### Step 2: Trigger the Workflow
Create `.gitea/workflows/deploy.yaml` in your project repository. Gitea will automatically trigger the deployment whenever you push to the `main` branch.

**Workflow Logic:**
1.  **Pull:** Runner pulls `git.toolden.xyz/vinayak/portfolio:latest`.
2.  **Stop:** Runner stops and removes the old `portfolio` container.
3.  **Run:** Runner starts the new container with production settings.
4.  **Cleanup:** Runner prunes old images to save disk space.

---

## 🛠️ Maintenance Notes
*   **Docker Network:** The workflow assumes a network named `caddy_net` exists on the server for reverse proxying.
*   **Ports:** The current configuration maps port `3000:3000`.
*   **Security:** The runner is isolated within the `us_default` network but can interact with the host Docker engine.