"use client";

import Hero from "@/components/Hero";
import TUISimulator from "@/components/TUISimulator";
import Link from "next/link";
import { ArrowRight, Activity, Code } from "lucide-react";

export default function Home() {
  const skills = {
    languages: ["Python", "C++", "Dart", "C"],
    frameworks: ["FastAPI", "Flutter", "Textual", "Rich"],
    devops: ["Docker", "Caddy", "GitHub Actions", "Prometheus"],
    ai_ml: ["Ollama", "Llama 3", "Mistral", "Prophet"],
    tools: ["Neovim", "Linux (Arch)", "Git"],
  };

  return (
    <div className="flex flex-col gap-24 pb-20">
      <Hero />

      {/* Featured Project: DevLog */}
      <section className="space-y-8">
        <div className="flex items-center gap-4">
          <h2 className="text-2xl font-bold text-white">
            <span className="text-terminal-green">./</span>featured_project
          </h2>
          <div className="h-px bg-terminal-dark-gray flex-grow" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h3 className="text-3xl font-bold text-white">DevLog</h3>
            <p className="text-terminal-dim text-lg leading-relaxed">
              A Local-first CLI tool that tracks Git commits and uses LLMs to find patterns in your development workflow. It features semantic search (RAG) to query your entire commit history conceptually.
            </p>
            <div className="flex flex-wrap gap-2">
              {["Python", "Textual", "Ollama", "SQLite", "RAG"].map(tag => (
                 <span key={tag} className="text-sm px-3 py-1 border border-terminal-dark-gray text-terminal-blue bg-terminal-dark-gray/20 rounded-full">
                  {tag}
                </span>
              ))}
            </div>
            <div className="pt-4">
               <a href="https://github.com/vinayaktyagi10/DevLog" target="_blank" rel="noopener noreferrer" className="text-terminal-green hover:underline flex items-center gap-2 font-bold">
                 View Source Code <ArrowRight size={16}/>
               </a>
            </div>
          </div>
          
          {/* Live Simulator */}
          <div className="relative group">
             <div className="absolute -inset-1 bg-gradient-to-r from-terminal-blue to-terminal-green opacity-20 group-hover:opacity-40 blur transition duration-1000"></div>
             <TUISimulator />
          </div>
        </div>
      </section>

      {/* Quick Stats & Skills */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* GitHub Stats */}
        <div className="border border-terminal-dark-gray bg-terminal-black/50 p-6 space-y-4 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 text-terminal-dark-gray group-hover:text-terminal-green transition-colors">
            <Activity size={48} strokeWidth={1} />
          </div>
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <span className="text-terminal-green">~</span> git_activity
          </h3>
          <p className="text-terminal-dim leading-relaxed">
            I believe in building in public. In the last year, I've pushed <span className="text-white font-bold">250+ contributions</span> across various repositories, maintaining a consistent commit streak.
          </p>
          <a href="https://github.com/vinayaktyagi10" target="_blank" className="text-sm text-terminal-blue hover:underline block pt-2">
            View GitHub Profile &rarr;
          </a>
        </div>

        {/* Skills Quickview */}
         <div className="border border-terminal-dark-gray bg-terminal-black/50 p-6 space-y-4 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 text-terminal-dark-gray group-hover:text-terminal-purple transition-colors">
            <Code size={48} strokeWidth={1} />
          </div>
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <span className="text-terminal-purple">$</span> bin_path
          </h3>
          <div className="flex flex-wrap gap-2 text-sm">
             {["Python", "C++", "Docker", "Caddy", "Neovim", "Arch Linux", "Next.js", "Ollama"].map(s => (
               <span key={s} className="bg-terminal-dark-gray/30 px-2 py-1 rounded text-terminal-dim border border-terminal-dark-gray">
                 {s}
               </span>
             ))}
          </div>
          <Link href="/about" className="text-sm text-terminal-purple hover:underline block pt-2">
            View Full Stack &rarr;
          </Link>
        </div>
      </section>

      {/* Detailed Skills (Neofetch Style) */}
      <section className="space-y-8">
        <div className="flex items-center gap-4">
          <h2 className="text-2xl font-bold text-white">
            <span className="text-terminal-green">./</span>neofetch
          </h2>
          <div className="h-px bg-terminal-dark-gray flex-grow" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 font-mono text-sm">
          {/* Arch Linux ASCII Art */}
          <div className="hidden md:flex items-center justify-center text-terminal-blue select-none">
            <pre className="text-[10px] leading-[1.1]">
{`
                   -
                  .o+
                 .ooo/
                .ooooo:
               .ooooooo.
              .ooooooooo.
             .ooooooooooo.
            .ooooooooooooo.
           .ooooooooooooooo.
          .ooooooooooooooooo.
         .ooooooooooooooooooo.
        .ooooooooooooooooooooo.
       .ooooooooooooooooooooooo.
      .ooooooooooooooooooooooooo.
     .ooooooooooooooooooooooooooo.
    .ooooooooooooooooooooooooooooo.
   .ooooooooooooooooooooooooooooooo.
  .ooooooooooooooooooooooooooooooooo.
`}
            </pre>
          </div>

          {/* Stats */}
          <div className="space-y-3">
            {Object.entries(skills).map(([category, items]) => (
              <div key={category} className="flex gap-4">
                <span className="text-terminal-purple min-w-[120px] text-right font-bold">
                  {category}:
                </span>
                <span className="text-terminal-dim">
                  {items.join(", ")}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
