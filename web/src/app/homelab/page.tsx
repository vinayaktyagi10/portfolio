"use client";

import { motion } from "framer-motion";
import { Server, Shield, Globe, Database, Cpu, Wifi } from "lucide-react";

export default function Homelab() {
  const categories = [
    {
      title: "Infrastructure & Security",
      icon: Shield,
      color: "text-terminal-red",
      items: [
        { name: "Authentik", desc: "Unified Identity Provider (SSO) for all internal services." },
        { name: "Tailscale", desc: "Mesh VPN for secure remote access without exposing ports." },
        { name: "AdGuard Home", desc: "Network-wide DNS sinkhole and ad blocking." },
        { name: "Caddy", desc: "Automatic HTTPS reverse proxy with local certificates." },
      ]
    },
    {
      title: "DevOps & Observability",
      icon: Cpu,
      color: "text-terminal-blue",
      items: [
        { name: "Ubuntu Server", desc: "Base OS managing all containerized workloads." },
        { name: "Docker", desc: "Container runtime managing 15+ services." },
        { name: "Uptime Kuma", desc: "Real-time monitoring and status pages." },
        { name: "Dozzle", desc: "Real-time log streaming for troubleshooting." },
      ]
    },
    {
      title: "Development Ecosystem",
      icon: Database,
      color: "text-terminal-green",
      items: [
        { name: "Gitea", desc: "Self-hosted Git service with CI/CD runners." },
        { name: "Vaultwarden", desc: "Bitwarden-compatible password manager." },
        { name: "FileBrowser", desc: "Web-based file manager for remote storage." },
        { name: "Duplicati", desc: "Encrypted, incremental off-site backups." },
      ]
    },
    {
      title: "Media Automation (*arr)",
      icon: Wifi,
      color: "text-terminal-purple",
      items: [
        { name: "Jellyfin", desc: "Hardware-accelerated media streaming server." },
        { name: "Sonarr/Radarr", desc: "Automated TV and Movie collection management." },
        { name: "Prowlarr", desc: "Index manager for aggregating trackers." },
        { name: "Navidrome", desc: "Self-hosted music streaming compatible with Subsonic." },
      ]
    }
  ];

  return (
    <div className="max-w-6xl mx-auto py-12 space-y-12">
      <div className="space-y-4 border-b border-terminal-dark-gray pb-8">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold text-white flex items-center gap-3"
        >
          <Server className="text-terminal-purple" size={32} />
          <span className="text-terminal-green">/mnt</span>/homelab
        </motion.h1>
        <p className="text-terminal-dim text-lg max-w-2xl">
          My private cloud infrastructure. A playground for <span className="text-white">Zero Trust networking</span>, <span className="text-white">virtualization</span>, and <span className="text-white">data sovereignty</span>.
        </p>
        <div className="flex gap-4 text-xs font-mono pt-2">
          <span className="bg-terminal-dark-gray/30 px-2 py-1 rounded text-terminal-green border border-terminal-dark-gray">STATUS: ONLINE</span>
          <span className="bg-terminal-dark-gray/30 px-2 py-1 rounded text-terminal-blue border border-terminal-dark-gray">UPTIME: 14d 03h</span>
          <span className="bg-terminal-dark-gray/30 px-2 py-1 rounded text-terminal-yellow border border-terminal-dark-gray">OS: UBUNTU SERVER</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {categories.map((cat, i) => {
          const Icon = cat.icon;
          return (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="border border-terminal-dark-gray bg-terminal-black/40 p-6 rounded hover:border-terminal-text transition-colors"
            >
              <div className="flex items-center gap-3 mb-6">
                <Icon className={cat.color} size={24} />
                <h2 className="text-xl font-bold text-white">{cat.title}</h2>
              </div>
              
              <ul className="space-y-4">
                {cat.items.map((item) => (
                  <li key={item.name} className="flex flex-col gap-1">
                    <span className="text-sm font-bold text-terminal-text font-mono flex items-center gap-2">
                      <span className="text-terminal-dim">./</span>
                      {item.name}
                    </span>
                    <span className="text-xs text-terminal-dim ml-4 border-l border-terminal-dark-gray pl-3">
                      {item.desc}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>
          )
        })}
      </div>
    </div>
  );
}
