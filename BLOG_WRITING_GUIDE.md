# Engineering Blog Best Practices Guide

This guide outlines how to write high-impact technical blog posts for your portfolio. The goal is to demonstrate expertise, problem-solving skills, and clarity of thought—traits that hiring managers and fellow engineers value.

## 📁 Where to Add Posts
1.  Create a new file in: `web/content/`
2.  File naming convention: `kebab-case-slug.md` (e.g., `optimizing-docker-builds.md`)
3.  The filename becomes the URL: `vinayak.dev/blog/optimizing-docker-builds`

---

## 📝 The Frontmatter
Every post **must** start with this metadata block. Be precise with tags as they help with SEO and organization.

```markdown
---
title: "Deploying High-Availability Clusters with Docker Swarm"
date: "2026-01-22"
description: "A deep dive into setting up a 3-node Swarm cluster on bare metal, managing ingress with Traefik, and handling persistent storage."
tags: ["Docker", "Homelab", "Infrastructure"]
---
```

---

## 🏗️ Structural Framework: The "STAR" Method
Don't just write a tutorial; write a **case study**. Use the **STAR** method (Situation, Task, Action, Result) adapted for engineering.

### 1. The Hook (Situation)
*   **What was broken?** "My CI pipeline took 20 minutes."
*   **What was the goal?** "I needed to self-host a password manager securely."
*   **Why does it matter?** "Cloud costs were rising," or "I wanted data sovereignty."

### 2. The Deep Dive (Task & Action)
*   **Architecture Diagrams:** Use Mermaid.js or ASCII art to show data flow.
*   **Code Snippets:** Show the *before* and *after*.
*   **Trade-offs:** Explain *why* you chose Tool A over Tool B (e.g., "Why I picked Caddy over Nginx"). **This is where you show seniority.**

### 3. The Impact (Result)
*   **Quantify it:** "Reduced build time by 60%."
*   **Benchmarks:** "Queries per second increased from 500 to 5,000."
*   **Lessons Learned:** What would you do differently next time?

---

## 🎨 Style Guidelines

### Do's
*   **Use Active Voice:** "I optimized the database" instead of "The database was optimized."
*   **Show Logs:** Real terminal output adds authenticity.
    ```bash
    $ docker build -t api .
    [+] Building 0.4s (8/8) FINISHED
    ```
*   **Break it Up:** Use headers, bullet points, and short paragraphs. Huge walls of text scare readers.

### Don'ts
*   **Don't Oversell:** If something is hacky, admit it. "This is a temporary fix until v2."
*   **Don't Skip Context:** Assume the reader knows *code* but not *your specific system*.

---

## 📄 Standard Post Template
Copy this into a new `.md` file to get started.

```markdown
---
title: "Title Goes Here"
date: "YYYY-MM-DD"
description: "One sentence summary for the preview card."
tags: ["Tag1", "Tag2"]
---

## Introduction
Briefly describe the problem. Why did you build this?

## Architecture
How is it designed? 
- **Frontend:** Next.js
- **Backend:** Python (FastAPI)
- **Infrastructure:** Docker on Ubuntu

## The Challenge
What was the hardest part? (e.g., "Handling WebSocket reconnections").

````python
# Show the code that fixed it
def reconnect():
    pass
````

## Benchmarks / Results
- **Latency:** < 50ms
- **Uptime:** 99.9%

## Conclusion
What's next? (e.g., "Next I plan to add Prometheus monitoring.")
```

---

## 🔍 SEO & Distribution Checklist
- [ ] **Title:** Is it catchy but accurate? (e.g., "How I Built X" vs "Project X")
- [ ] **Description:** Does it include keywords (e.g., "Docker", "Python")?
- [ ] **Cross-Post:** After publishing here, consider posting to:
    - [Dev.to](https://dev.to)
    - [Hashnode](https://hashnode.com)
    - [Medium](https://medium.com)
    - *Always add a canonical link back to your portfolio.

```