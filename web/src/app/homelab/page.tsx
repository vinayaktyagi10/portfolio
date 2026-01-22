"use client";

import { motion } from "framer-motion";
import { Server, Shield, Globe, Database, Cpu, Wifi, Activity, Terminal } from "lucide-react";
import { useState, useEffect } from "react";

export default function Homelab() {
  const [telemetry, setTelemetry] = useState<any>(null);

  useEffect(() => {
    async function fetchStats() {
      const res = await fetch("/api/status");
      const data = await res.json();
      setTelemetry(data);
    }
    fetchStats();
    const interval = setInterval(fetchStats, 10000); // Update every 10s
    return () => clearInterval(interval);
  }, []);

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
          <span className="bg-terminal-dark-gray/30 px-2 py-1 rounded text-terminal-blue border border-terminal-dark-gray">UPTIME: {telemetry?.system?.uptime || "Loading..."}</span>
          <span className="bg-terminal-dark-gray/30 px-2 py-1 rounded text-terminal-yellow border border-terminal-dark-gray">OS: UBUNTU SERVER</span>
        </div>
      </div>

      {/* Live Telemetry Widget */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono"
      >
        <div className="md:col-span-2 bg-terminal-black border border-terminal-dark-gray p-6 rounded relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <Terminal size={80} />
          </div>
          <h3 className="text-sm font-bold text-terminal-green mb-4 flex items-center gap-2">
            <Activity size={14} /> LIVE_TELEMETRY
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
            <div className="space-y-1">
              <div className="text-[10px] text-terminal-dim uppercase">CPU Load</div>
              <div className="text-xl text-white">{telemetry?.system?.cpu || 0}%</div>
              <div className="w-full bg-terminal-dark-gray h-1 rounded-full overflow-hidden">
                <div 
                  className="bg-terminal-green h-full transition-all duration-1000" 
                  style={{ width: `${telemetry?.system?.cpu || 0}%` }}
                />
              </div>
            </div>
            <div className="space-y-1">
              <div className="text-[10px] text-terminal-dim uppercase">Memory</div>
              <div className="text-xl text-white">{telemetry?.system?.mem || 0}%</div>
              <div className="w-full bg-terminal-dark-gray h-1 rounded-full overflow-hidden">
                <div 
                  className="bg-terminal-blue h-full transition-all duration-1000" 
                  style={{ width: `${telemetry?.system?.mem || 0}%` }}
                />
              </div>
            </div>
            <div className="space-y-1">
              <div className="text-[10px] text-terminal-dim uppercase">Net State</div>
              <div className="text-xl text-terminal-green">ACTIVE</div>
            </div>
            <div className="space-y-1">
              <div className="text-[10px] text-terminal-dim uppercase">Refresh</div>
              <div className="text-xl text-terminal-dim animate-pulse">10s</div>
            </div>
          </div>
        </div>

        <div className="bg-terminal-black border border-terminal-dark-gray p-6 rounded">
          <h3 className="text-sm font-bold text-terminal-blue mb-4 flex items-center gap-2">
            <Server size={14} /> SERVICE_HEALTH
          </h3>
          <ul className="space-y-2 text-xs">
            {telemetry?.services?.map((s: any) => (
              <li key={s.name} className="flex justify-between items-center border-b border-terminal-dark-gray/30 pb-1">
                <span className="text-terminal-text">./{s.name}</span>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-terminal-dim">{s.latency}ms</span>
                  <span className={`w-2 h-2 rounded-full ${s.online ? "bg-terminal-green" : "bg-terminal-red"}`} />
                </div>
              </li>
            )) || <li className="text-terminal-dim italic">Polling internal network...</li>}
          </ul>
        </div>
      </motion.div>

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
