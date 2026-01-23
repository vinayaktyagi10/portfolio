"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Terminal, Folder, User, FileText, Mail, Server } from "lucide-react";

const navItems = [
  { name: "home", path: "/", icon: Terminal },
  { name: "projects", path: "/projects", icon: Folder },
  { name: "homelab", path: "/homelab", icon: Server },
  { name: "about", path: "/about", icon: User },
  { name: "blog", path: "/blog", icon: FileText },
  { name: "contact", path: "/contact", icon: Mail },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 left-0 w-full z-40 bg-terminal-black/90 backdrop-blur-md border-b border-terminal-dark-gray text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
        {/* Logo / Hostname */}
        <div className="flex items-center gap-2 text-terminal-green font-bold">
          <span className="hidden sm:inline">vinayaktyagi@arch:</span>
          <span className="text-terminal-blue">~{pathname === "/" ? "" : pathname}</span>
          <span className="animate-pulse">_</span>
        </div>

        {/* Navigation Links */}
        <div className="flex items-center gap-1 sm:gap-4">
          {navItems.map((item) => {
            const isActive = pathname === item.path;
            const Icon = item.icon;
            
            return (
              <Link 
                key={item.path} 
                href={item.path} 
                className="relative group px-3 py-1.5"
                aria-label={item.name}
              >
                {isActive && (
                  <motion.div
                    layoutId="nav-pill"
                    className="absolute inset-0 bg-terminal-green/10 border border-terminal-green/30 rounded-md"
                    initial={false}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <span className={`relative flex items-center gap-2 ${isActive ? "text-terminal-green" : "text-terminal-dim hover:text-terminal-text transition-colors"}`}>
                  <Icon size={14} />
                  <span className="hidden sm:inline">{item.name}</span>
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
