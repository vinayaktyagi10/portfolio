"use client";

import { Github, Linkedin, Mail } from "lucide-react";
import StatusWidget from "./StatusWidget";

export default function Footer() {
  return (
    <footer className="w-full border-t border-terminal-dark-gray bg-terminal-black/50 py-12 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-8">
        
        <StatusWidget />

        {/* Links */}
        <div className="flex gap-6 text-terminal-dim">
          <a href="https://github.com/vinayaktyagi10" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors" aria-label="GitHub Profile">
            <Github size={20} />
          </a>
          <a href="https://www.linkedin.com/in/vinayaktyagi10" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors" aria-label="LinkedIn Profile">
            <Linkedin size={20} />
          </a>
          <a href="mailto:vinayaktyagi.ed@gmail.com" className="hover:text-white transition-colors" aria-label="Send Email">
            <Mail size={20} />
          </a>
        </div>

        {/* Copyright */}
        <div className="text-xs font-mono text-terminal-dim">
          &copy; {new Date().getFullYear()} VINAYAK_TYAGI --version 1.1.0
        </div>
      </div>
    </footer>
  );
}
