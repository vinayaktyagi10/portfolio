"use client";

import { motion } from "framer-motion";
import { Github, ExternalLink, Box } from "lucide-react";
import Image from "next/image";

interface ProjectProps {
  title: string;
  description: string;
  tags: string[];
  repoUrl?: string;
  demoUrl?: string;
  image?: string; // If null, use a terminal fallback
}

export default function ProjectCard({ title, description, tags, repoUrl, demoUrl, image }: ProjectProps) {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="group relative border border-terminal-dark-gray bg-terminal-black/50 overflow-hidden flex flex-col h-full"
    >
      {/* Window Header */}
      <div className="flex items-center justify-between px-3 py-2 bg-terminal-dark-gray/50 border-b border-terminal-dark-gray text-xs text-terminal-dim">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-terminal-red/50"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-terminal-yellow/50"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-terminal-green/50"></div>
        </div>
        <span className="font-mono">./projects/{title.toLowerCase().replace(/\s+/g, '-')}</span>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex items-start justify-between mb-4">
          <h3 className="text-xl font-bold text-white group-hover:text-terminal-green transition-colors">{title}</h3>
          {image ? (
            // Placeholder for actual image
             <div className="relative w-12 h-12">
                <Image src={image} alt={title} fill className="object-cover rounded grayscale group-hover:grayscale-0 transition-all"/>
             </div>
          ) : (
            <Box size={32} className="text-terminal-dim group-hover:text-terminal-green transition-colors" />
          )}
        </div>
        
        <p className="text-terminal-dim text-sm mb-6 flex-grow leading-relaxed">
          {description}
        </p>

        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {tags.map(tag => (
              <span key={tag} className="text-xs px-2 py-1 border border-terminal-dark-gray text-terminal-blue bg-terminal-dark-gray/20">
                {tag}
              </span>
            ))}
          </div>

          <div className="flex gap-4 pt-4 border-t border-terminal-dark-gray/50">
            {repoUrl && (
              <a href={repoUrl} target="_blank" rel="noopener noreferrer" className="text-sm flex items-center gap-2 text-terminal-dim hover:text-white transition-colors">
                <Github size={16} /> Source
              </a>
            )}
            {demoUrl && (
              <a href={demoUrl} target="_blank" rel="noopener noreferrer" className="text-sm flex items-center gap-2 text-terminal-dim hover:text-white transition-colors">
                <ExternalLink size={16} /> Live Demo
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
