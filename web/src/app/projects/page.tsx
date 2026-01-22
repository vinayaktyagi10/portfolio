"use client";

import { motion } from "framer-motion";
import ProjectCard from "@/components/ProjectCard";

const projects = [
  {
    title: "DevLog",
    description: "Local-first CLI/TUI that tracks Git commits, analyzes code with LLMs, and compares implementations against best practices using semantic search. Built with Textual & Ollama.",
    tags: ["Python", "Textual", "Ollama", "SQLite"],
    repoUrl: "https://github.com/vinayaktyagi10/DevLog",
  },
  {
    title: "BrokeBuddy",
    description: "Financial advisory app with JWT auth, Plaid integration, and Llama 3-powered advice engine. Features Dockerized multi-container architecture.",
    tags: ["FastAPI", "Docker", "Llama 3", "Plaid"],
    repoUrl: "https://github.com/vinayaktyagi10/BrokeBuddy",
  },
  {
    title: "Kuro",
    description: "Terminal assistant for automating developer workflows and Git commands using local Mistral model via Ollama.",
    tags: ["Python", "Mistral", "Ollama", "CLI"],
    repoUrl: "https://github.com/vinayaktyagi10/kuro",
  },
];

export default function Projects() {
  return (
    <div className="max-w-7xl mx-auto py-12 space-y-12">
       <div className="space-y-4 border-b border-terminal-dark-gray pb-8">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold text-white"
        >
          <span className="text-terminal-green">./</span>projects
        </motion.h1>
        <p className="text-terminal-dim text-lg">
          A collection of tools, utilities, and experiments.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((p, i) => (
          <motion.div
            key={p.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <ProjectCard {...p} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
