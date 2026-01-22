"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const steps = [
  { text: "devlog search 'authentication logic'", delay: 800, type: "input" },
  { text: ">> Loading repository index...", delay: 600, type: "output" },
  { text: ">> Embeddings loaded (all-MiniLM-L6-v2).", delay: 800, type: "output" },
  { text: ">> Searching 342 commits...", delay: 1200, type: "output" },
  { text: "Found 3 relevant commits (Similarity > 0.85):", delay: 800, type: "success" },
  { text: "1. 8a3f92 (2 days ago) - 'Refactor login flow with JWT'", delay: 400, type: "result" },
  { text: "2. b71c50 (1 week ago) - 'Fix session timeout bug'", delay: 400, type: "result" },
  { text: "3. 4ab9c2 (2 weeks ago) - 'Add OAuth provider support'", delay: 400, type: "result" },
  { text: ">> Analysis: Patterns indicate shifting auth strategy to stateless tokens.", delay: 1500, type: "insight" },
  { text: "", delay: 3000, type: "reset" } 
];

export default function TUISimulator() {
  const [currentStep, setCurrentStep] = useState(0);
  const [log, setLog] = useState<{text: string, type: string}[]>([]);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    
    if (currentStep < steps.length) {
      const step = steps[currentStep];
      
      timeout = setTimeout(() => {
        if (step.type === "reset") {
          setLog([]);
          setCurrentStep(0);
        } else {
          setLog((prev) => [...prev, { text: step.text, type: step.type }]);
          setCurrentStep((prev) => prev + 1);
        }
      }, step.delay);
    }

    return () => clearTimeout(timeout);
  }, [currentStep]);

  return (
    <div className="w-full h-64 bg-[#0c0c0c] border border-terminal-dark-gray rounded overflow-hidden font-mono text-xs flex flex-col shadow-2xl relative">
      {/* TUI Header */}
      <div className="bg-terminal-blue text-terminal-black px-2 py-1 font-bold flex justify-between">
        <span>DevLog v0.1.0</span>
        <span>● Live</span>
      </div>

      <div className="flex-1 p-3 flex flex-col font-mono text-sm overflow-hidden">
        {log.map((line, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className={`mb-1 ${
              line.type === "input" ? "text-white font-bold" :
              line.type === "success" ? "text-terminal-green font-bold mt-2" :
              line.type === "insight" ? "text-terminal-yellow border-l-2 border-terminal-yellow pl-2 mt-2 italic" :
              line.type === "result" ? "text-terminal-text pl-4" :
              "text-terminal-dim"
            }`}
          >
            {line.type === "input" && <span className="text-terminal-blue mr-2">➜</span>}
            {line.text}
          </motion.div>
        ))}
        {currentStep < steps.length - 1 && (
          <motion.div 
            animate={{ opacity: [0, 1, 0] }}
            transition={{ repeat: Infinity, duration: 0.8 }}
            className="w-2 h-4 bg-terminal-green mt-1"
          />
        )}
      </div>

      {/* Decorative Status Bar */}
      <div className="bg-terminal-dark-gray/30 p-1 text-[10px] text-terminal-dim flex gap-4 border-t border-terminal-dark-gray/50">
        <span>INDEX: 342 objs</span>
        <span>MODEL: all-MiniLM-L6-v2</span>
        <span>STATUS: IDLE</span>
      </div>
    </div>
  );
}
