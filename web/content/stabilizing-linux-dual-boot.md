---
title: "Stabilizing a Dual-Boot Linux Setup on Modern Laptop Firmware"
date: "2026-01-24"
description: "A case study on debugging persistent OS freezes across Windows and Linux, isolating firmware and driver issues, and arriving at a stable Hyprland workflow."
tags: ["Linux", "Firmware", "Debugging", "Hyprland", "Arch"]
---

## Introduction

Over the past few months, my laptop had become unreliable to the point where **neither Windows nor Linux could be daily-driven**. Random freezes, unexplained BSODs, USB-triggered crashes, and installer instability made the system feel fundamentally broken.

This post documents how I approached the problem *as an engineering problem*, not an OS issue—and how I eventually arrived at a **stable EndeavourOS + Hyprland setup** without replacing hardware or endlessly reinstalling operating systems.

---

## System Context

- **Laptop:** Lenovo Legion Slim 5  
- **CPU:** AMD Ryzen 7 8845HS  
- **GPU:** AMD iGPU + NVIDIA dGPU (hybrid)  
- **Boot:** UEFI, Secure Boot disabled  
- **Target OS:** EndeavourOS (Arch-based)  
- **Final WM:** Hyprland (Wayland)

---

## The Problem (Situation)

Symptoms across **multiple months** and **multiple OS installs**:

- Windows BSODs (`CRITICAL_PROCESS_DIED`)
- Linux hard freezes (no logs, no recovery)
- USB hotplug sometimes caused immediate crashes
- Secure Boot / BitLocker interactions made recovery harder
- Issues persisted across reinstalls and distros

At first glance, this looked like:
- Bad RAM
- Faulty SSD
- Or “Linux being unstable on laptops”

All hardware diagnostics passed.

That ruled out the obvious causes—and made the problem more interesting.

---

## The Real Challenge (Task)

The real task wasn’t “install Linux”.

It was to answer a harder question:

> *What system layer is failing if multiple operating systems behave inconsistently, yet hardware tests pass?*

That reframed the problem from **OS-level debugging** to **firmware, power management, and driver interaction analysis**.

---

## Investigation & Actions

### 1. Stop Reinstalling, Start Isolating

Instead of reinstalling again, I froze variables:

- No NVIDIA drivers
- No aggressive power management
- No multiboot USB tools
- Conservative kernel choices only

This immediately reduced noise.

---

### 2. Identify the USB Trigger

A key breakthrough was noticing:

> The system was stable until **a specific USB stick** was plugged in.

That USB had:
- Ventoy
- Multiple partition schemes
- Repeated re-writes

Using a **fresh USB written with a single ISO** eliminated immediate crashes.

This ruled out:
- Random OS instability
- Kernel regressions

And strongly suggested **USB power / firmware interaction issues**.

---

### 3. Treat Firmware as a First-Class Component

Key changes:

- Disabled Secure Boot
- Avoided Modern Standby / aggressive power features
- Stopped stacking power daemons early
- Chose conservative defaults everywhere

This stabilized both:
- Windows boot behavior
- Linux live environments

---

### 4. Install Conservatively, Then Observe

EndeavourOS was installed with:

- Manual partitioning
- Existing EFI reused (not formatted)
- GRUB for robust dual-boot handling
- KDE Plasma as a recovery-safe desktop
- **No NVIDIA drivers**

Only after confirming stability did I proceed further.

---

### 5. Restore Workflow Incrementally

Once stable:

- Hyprland installed manually
- Dotfiles restored gradually
- Neovim, scripts, wallpapers reintroduced
- No GPU switching tricks
- AMD iGPU only

At no point did I “fix everything at once”.

---

## Results (Impact)

- ✅ Stable dual-boot (Windows + EndeavourOS)
- ✅ No freezes during idle, USB hotplug, or suspend
- ✅ Hyprland running reliably on Wayland
- ✅ Full dev workflow restored
- ✅ No NVIDIA drivers required for daily use

Most importantly:

> The system became **boringly reliable**.

---

## Key Lessons Learned

### 1. If multiple OSes fail, look *below* the OS
Firmware, power states, and device enumeration matter more than distro choice.

### 2. Stability comes from sequencing, not cleverness
Installing fewer things—later—beat every “advanced” setup I tried before.

### 3. NVIDIA is optional, not foundational
On hybrid laptops, treating the dGPU as opt-in avoids entire classes of failure.

### 4. Reproducibility beats hero debugging
Dotfiles, conservative defaults, and rollback points mattered more than any tweak.

---

## What’s Next

- Optional NVIDIA offloading (only if needed)
- Formalizing power management once confidence is high
- Documenting Hyprland + AMD-only best practices
- Turning this setup into a reproducible baseline

---

## Closing Thoughts

This wasn’t a story about Linux being unstable.

It was a story about **treating the system as a layered engineering problem**, identifying the correct abstraction level to debug, and resisting the urge to “just reinstall”.

The result is the most stable setup this machine has had in months.
