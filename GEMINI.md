# Project Context: Personal Portfolio

## 🌍 Status
*   **Live URL:** [https://portfolio.toolden.xyz](https://portfolio.toolden.xyz)
*   **Environment:** Production (Self-Hosted Homelab)

## 🛠️ Tech Stack
*   **Framework:** Next.js 16 (App Router)
*   **Language:** TypeScript
*   **Styling:** Tailwind CSS + Framer Motion
*   **Deployment:** Docker Container (Alpine Linux base)
*   **Infrastructure:** Ubuntu Server, Caddy Reverse Proxy, Tailscale

## 📂 Architecture
The project is a static-first Next.js application designed with a "Terminal/CLI" aesthetic.

### Key Components
*   **Home (`/`):** Features a "TUI Simulator" (interactive React component), GitHub stats, and Neofetch-style skills.
*   **Homelab (`/homelab`):** Visualizes the infrastructure stack (Authentik, Gitea, *arr suite).
*   **Blog (`/blog`):** Markdown-based static content system located in `web/content/`.
*   **CI/CD:** Hybrid approach. Build local -> Push Image -> Deploy on Server.

## 🎨 Design Philosophy
*   **Theme:** Dark mode, monospaced fonts (JetBrains Mono), minimal UI.
*   **UX:** Interactive elements (typing effects, simulated terminal windows) to demonstrate engineering capability.

## 📝 Maintenance
*   **Updating Resume:** Replace `web/public/resume.pdf`.
*   **New Blog Post:** Add `.md` file to `web/content/`.
*   **Deployment:** Run `./deploy.sh` locally to build/push, then update the container on the server.
