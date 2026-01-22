"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Terminal, ArrowRight, Github, Linkedin, Mail } from "lucide-react";
import Link from "next/link";

const bootLines = [
  "Initializing kernel...",
  "Loading user modules...",
  "Mounting /home/vinayak...",
  "Starting interface services...",
  "Done."
];

export default function Hero() {
  const [booted, setBooted] = useState(false);
  const [currentLine, setCurrentLine] = useState(0);

  useEffect(() => {
    if (currentLine < bootLines.length) {
      const timeout = setTimeout(() => {
        setCurrentLine(prev => prev + 1);
      }, 150 + Math.random() * 300); // Random typing speed
      return () => clearTimeout(timeout);
    } else {
      setTimeout(() => setBooted(true), 500);
    }
  }, [currentLine]);

  if (!booted) {
    return (
      <div className="h-[50vh] flex flex-col justify-center items-start font-mono text-sm sm:text-base text-terminal-dim p-4">
        {bootLines.slice(0, currentLine + 1).map((line, i) => (
          <div key={i} className="flex items-center gap-2">
            <span className="text-terminal-green">➜</span>
            <span>{line}</span>
          </div>
        ))}
        <div className="animate-pulse text-terminal-green mt-2">_</div>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      className="flex flex-col gap-6 py-20 sm:py-32"
    >
      <div className="space-y-2">
        <motion.div 
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex items-center gap-2 text-terminal-green font-bold text-lg"
        >
          <span>$ whoami</span>
        </motion.div>
        
        <motion.h1 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-4xl sm:text-6xl font-bold tracking-tight text-white"
        >
          Vinayak Tyagi
        </motion.h1>
        
        <motion.p 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-xl sm:text-2xl text-terminal-dim max-w-2xl"
        >
          DevOps Intern & CS Student <br/>
          <span className="text-terminal-blue">crafting efficient, containerized systems.</span>
        </motion.p>
      </div>

      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="flex flex-wrap gap-4 mt-4"
      >
        <Link href="/projects" className="flex items-center gap-2 bg-terminal-green text-terminal-black px-6 py-3 font-bold hover:bg-terminal-green-dim transition-colors">
          <Terminal size={18} />
          View Projects
        </Link>
        <Link href="/resume" className="flex items-center gap-2 border border-terminal-dark-gray text-terminal-dim px-6 py-3 hover:border-terminal-blue hover:text-terminal-blue transition-colors">
          Interactive Resume <ArrowRight size={18} />
        </Link>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="flex gap-6 mt-8 text-terminal-dim"
      >
        <a href="https://github.com/vinayaktyagi10" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
          <Github size={24} />
        </a>
        <a href="https://www.linkedin.com/in/vinayaktyagi10" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
          <Linkedin size={24} />
        </a>
        <a href="mailto:vinayaktyagi.ed@gmail.com" className="hover:text-white transition-colors">
          <Mail size={24} />
        </a>
      </motion.div>
    </motion.div>
  );
}
