"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Terminal as TerminalIcon, ArrowLeft, Download } from "lucide-react";
import Link from "next/link";

const COMMANDS = {
  help: "Available commands: [about, skills, experience, education, certs, contact, download, ls, clear, exit]",
  about: "Vinayak Tyagi: Second-year CS student & DevOps intern at MUJ. Arch Linux enthusiast and TUI builder. I focus on containerization, LLM integration, and efficient developer workflows.",
  skills: "Languages: Python, C++, C, Dart\nFrameworks: FastAPI, Next.js, Textual, Flutter\nDevOps: Docker, Caddy, GitHub Actions, Tailscale, Ubuntu Server\nAI/ML: Ollama, Llama 3, Mistral, RAG Systems",
  experience: "• DevOps Intern @ Software Development Centre, MUJ (Aug 2025 - Present)\n  - Led SSO (Authentik) implementation\n  - Optimized CI/CD pipelines for 10+ repos\n  - Managed containerized service deployments",
  education: "• B.Tech in Computer Science & Engineering\n  - Manipal University Jaipur (2024 - 2028)\n  - Focus on Systems Programming & DevOps",
  certs: "• Intro to Git & GitHub (Google)\n• Python for Data Science & AI (IBM)\n• Intro to OOP in C++ (Univ. of London)",
  contact: "• Email: vinayaktyagi.ed@gmail.com\n• GitHub: github.com/vinayaktyagi10\n• LinkedIn: linkedin.com/in/vinayaktyagi10",
  download: "Redirecting to resume PDF...",
  ls: "Projects/\n  ├── DevLog\n  ├── BrokeBuddy\n  └── Kuro",
  exit: "Redirecting to home...",
};

export default function CLIResume() {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([
    "Vinayak System [Version 1.0.4]",
    "(c) 2026 Vinayak Tyagi. All rights reserved.",
    "",
    "Type 'help' to see available commands.",
    ""
  ]);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = input.trim().toLowerCase();
    
    if (!cmd) return;

    let response = "";
    
    if (cmd === "clear") {
      setHistory([]);
      setInput("");
      return;
    }

    if (cmd === "download") {
      window.open("/resume.pdf", "_blank");
      response = COMMANDS.download;
    } else if (cmd === "exit") {
      window.location.href = "/";
      response = COMMANDS.exit;
    } else {
      response = COMMANDS[cmd as keyof typeof COMMANDS] || `Command not found: ${cmd}. Type 'help' for assistance.`;
    }

    setHistory(prev => [...prev, `guest@toolden:~$ ${input}`, response, ""]);
    setInput("");
  };

  return (
    <div className="min-h-[80vh] py-8 flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <Link href="/about" className="flex items-center gap-2 text-terminal-dim hover:text-terminal-green transition-colors text-sm">
          <ArrowLeft size={16} /> back_to_about
        </Link>
        <div className="flex gap-2">
          <a href="/resume.pdf" download className="flex items-center gap-2 bg-terminal-dark-gray/50 hover:bg-terminal-green hover:text-terminal-black text-terminal-dim px-3 py-1.5 rounded transition-all text-xs border border-terminal-dark-gray">
            <Download size={14} /> PDF_VERSION
          </a>
        </div>
      </div>

      <div 
        className="flex-1 bg-terminal-black border border-terminal-dark-gray rounded-lg shadow-2xl p-4 font-mono text-sm sm:text-base overflow-hidden flex flex-col cursor-text"
        onClick={() => inputRef.current?.focus()}
      >
        {/* Terminal Header */}
        <div className="flex items-center gap-2 mb-4 border-b border-terminal-dark-gray pb-2 opacity-50">
          <TerminalIcon size={14} />
          <span className="text-xs">resume.sh — 80x24</span>
        </div>

        {/* Terminal Output */}
        <div className="flex-1 overflow-y-auto mb-4 scrollbar-hide">
          {history.map((line, i) => (
            <div key={i} className="whitespace-pre-wrap mb-1">
              {line.startsWith("guest@toolden:~") ? (
                <span className="text-terminal-green">{line}</span>
              ) : (
                <span className="text-terminal-text">{line}</span>
              )}
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* Terminal Input */}
        <form onSubmit={handleCommand} className="flex items-center gap-2">
          <span className="text-terminal-green shrink-0 font-bold">guest@toolden:~$</span>
          <input
            ref={inputRef}
            type="text"
            autoFocus
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 bg-transparent border-none outline-none text-white p-0"
            spellCheck={false}
            autoComplete="off"
          />
        </form>
      </div>
    </div>
  );
}
