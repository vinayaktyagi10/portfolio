"use client";

import { useState, useEffect } from "react";
import { Activity } from "lucide-react";

export default function StatusWidget() {
  const [status, setStatus] = useState<"loading" | "operational" | "degraded" | "offline">("loading");

  useEffect(() => {
    async function checkStatus() {
      try {
        const res = await fetch("/api/status");
        const data = await res.json();
        
        if (data.services) {
          const allOnline = data.services.every((s: any) => s.online);
          const someOnline = data.services.some((s: any) => s.online);
          
          if (allOnline) setStatus("operational");
          else if (someOnline) setStatus("degraded");
          else setStatus("offline");
        } else {
          setStatus("offline");
        }
      } catch (e) {
        setStatus("offline");
      }
    }
    checkStatus();
    // Re-check every 5 minutes
    const interval = setInterval(checkStatus, 300000);
    return () => clearInterval(interval);
  }, []);

  const config = {
    loading: { color: "bg-terminal-yellow", text: "CHECKING SYSTEMS..." },
    operational: { color: "bg-terminal-green", text: "SYSTEMS OPERATIONAL" },
    degraded: { color: "bg-terminal-yellow", text: "SYSTEMS DEGRADED" },
    offline: { color: "bg-terminal-red", text: "SYSTEMS OFFLINE" },
  };

  const current = config[status];

  return (
    <div className="flex flex-col items-center md:items-start gap-2">
      <div className="flex items-center gap-2 text-xs font-mono">
        <span className="relative flex h-2 w-2">
          {status === "operational" && (
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-terminal-green opacity-75"></span>
          )}
          <span className={`relative inline-flex rounded-full h-2 w-2 ${current.color}`}></span>
        </span>
        <span className={status === "operational" ? "text-terminal-green" : "text-terminal-text"}>
          {current.text}
        </span>
      </div>
      <a 
        href="https://status.toolden.xyz" 
        target="_blank" 
        rel="noopener noreferrer"
        className="text-[10px] text-terminal-dim hover:text-terminal-blue flex items-center gap-1 transition-colors"
      >
        <Activity size={10} /> View Public Status Page
      </a>
    </div>
  );
}
