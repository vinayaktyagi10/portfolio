"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Terminal as TerminalIcon, Download } from "lucide-react";

export default function About() {
  return (
    <div className="max-w-4xl mx-auto py-12 space-y-12">
      {/* Header */}
      <div className="space-y-4 border-b border-terminal-dark-gray pb-8">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold text-white"
        >
          <span className="text-terminal-green">./</span>about_me
        </motion.h1>
        <div className="flex items-center justify-between gap-4">
          <p className="text-terminal-dim text-lg">
            Second-year Computer Science student, DevOps intern, and open-source enthusiast.
          </p>
          <div className="flex items-center gap-3">
            <Link href="/resume" className="shrink-0 flex items-center gap-2 border border-terminal-green/30 text-terminal-green px-4 py-2 text-sm hover:bg-terminal-green/10 transition-all rounded-md font-mono">
              <TerminalIcon size={14} /> resume.sh
            </Link>
            <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="shrink-0 flex items-center gap-2 border border-terminal-blue/30 text-terminal-blue px-4 py-2 text-sm hover:bg-terminal-blue/10 transition-all rounded-md font-mono">
              <Download size={14} /> resume.pdf
            </a>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-12">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="space-y-8 text-terminal-text leading-relaxed"
        >
          <section>
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="text-terminal-blue">#</span> Who Am I?
            </h2>
            <p className="mb-4">
              I am currently pursuing my B.Tech in Computer Science and Engineering at <strong className="text-white">Manipal University Jaipur (2024–2028)</strong>. 
              My passion lies in the intersection of <strong className="text-terminal-green">Systems Engineering</strong>, <strong className="text-terminal-green">DevOps</strong>, and <strong className="text-terminal-green">AI-powered tooling</strong>.
            </p>
            <p>
              Unlike the standard web dev path, I fell in love with the Linux ecosystem early on. I daily drive <strong className="text-white">Arch Linux</strong> (with Hyprland & Wayland) and live inside the terminal. 
              This "power user" mindset drives me to build tools that optimize workflows, like my CLI assistants and TUI applications.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="text-terminal-blue">#</span> Experience
            </h2>
            <div className="border-l-2 border-terminal-dark-gray pl-4 space-y-2">
              <div className="flex justify-between items-start">
                <h3 className="font-bold text-white">DevOps Intern</h3>
                <span className="text-xs bg-terminal-dark-gray px-2 py-1 rounded text-terminal-dim">Aug 2025 – Present</span>
              </div>
              <div className="text-terminal-purple text-sm">Software Development Centre, MUJ</div>
              <ul className="list-disc list-inside text-sm text-terminal-dim space-y-1 mt-2">
                <li>Led SSO (Authentik) and knowledge base implementation.</li>
                <li>Optimized CI/CD pipelines, implementing Docker layer caching across 10+ repos.</li>
                <li>Deployed containerized services using Docker, Caddy, and Cloudflare.</li>
              </ul>
            </div>
          </section>
        </motion.div>

        {/* Sidebar */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="space-y-8"
        >
          <div className="bg-terminal-dark-gray/20 p-6 border border-terminal-dark-gray rounded-sm">
            <h3 className="font-bold text-white mb-4 border-b border-terminal-dark-gray pb-2">Certifications</h3>
            <ul className="space-y-4 text-sm text-terminal-dim">
              <li className="flex flex-col gap-1">
                <span className="text-terminal-text font-bold">Intro to Git and GitHub</span>
                <div className="flex justify-between items-center text-xs">
                  <span>Google</span>
                  <span className="text-terminal-green">May 2025</span>
                </div>
              </li>
              <li className="flex flex-col gap-1">
                <span className="text-terminal-text font-bold">Python for Data Science & AI</span>
                 <div className="flex justify-between items-center text-xs">
                  <span>IBM</span>
                  <span className="text-terminal-green">May 2025</span>
                </div>
              </li>
              <li className="flex flex-col gap-1">
                <span className="text-terminal-text font-bold">Intro to OOP in C++</span>
                 <div className="flex justify-between items-center text-xs">
                  <span>Univ. of London</span>
                  <span className="text-terminal-green">Sept 2024</span>
                </div>
              </li>
            </ul>
          </div>

          <div className="bg-terminal-dark-gray/20 p-6 border border-terminal-dark-gray rounded-sm">
            <h3 className="font-bold text-white mb-4 border-b border-terminal-dark-gray pb-2">My Stack</h3>
            <div className="flex flex-wrap gap-2">
              {["Arch Linux", "Neovim", "Docker", "Python", "C++", "FastAPI", "Next.js", "Ollama"].map(tech => (
                <span key={tech} className="text-xs px-2 py-1 bg-terminal-black border border-terminal-dark-gray text-terminal-green">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
