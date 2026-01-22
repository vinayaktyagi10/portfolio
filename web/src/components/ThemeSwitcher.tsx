"use client";

import { useState, useEffect } from "react";
import { Palette, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const themes = [
  { name: "default", label: "Arch Linux", desc: "The classic green-on-black terminal vibe." },
  { name: "dracula", label: "Dracula", desc: "A cozy, dark theme for late-night sessions." },
  { name: "nord", label: "Nord", desc: "Cool, arctic, and focused blue tones." },
  { name: "monokai", label: "Monokai", desc: "Classic high-contrast developer theme." },
];

export default function ThemeSwitcher() {
  const [currentTheme, setCurrentTheme] = useState("default");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("portfolio-theme") || "default";
    setCurrentTheme(savedTheme);
    document.documentElement.setAttribute("data-theme", savedTheme);
  }, []);

  const changeTheme = (theme: string) => {
    setCurrentTheme(theme);
    localStorage.setItem("portfolio-theme", theme);
    document.documentElement.setAttribute("data-theme", theme);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="absolute bottom-16 right-0 w-64 bg-terminal-black border border-terminal-dark-gray rounded-lg shadow-2xl overflow-hidden mb-2"
          >
            <div className="bg-terminal-dark-gray/50 px-4 py-2 border-b border-terminal-dark-gray flex justify-between items-center">
              <span className="text-xs font-bold text-terminal-green uppercase tracking-widest">Select Theme</span>
              <button onClick={() => setIsOpen(false)} className="text-terminal-dim hover:text-white transition-colors">
                <X size={14} />
              </button>
            </div>
            <div className="p-2 space-y-1">
              {themes.map((theme) => (
                <button
                  key={theme.name}
                  onClick={() => changeTheme(theme.name)}
                  className={`w-full text-left p-3 rounded-md transition-all group ${
                    currentTheme === theme.name 
                      ? "bg-terminal-green/10 border border-terminal-green/30" 
                      : "hover:bg-terminal-dark-gray/50 border border-transparent"
                  }`}
                >
                  <div className="flex justify-between items-center mb-1">
                    <span className={`text-sm font-bold ${currentTheme === theme.name ? "text-terminal-green" : "text-terminal-text"}`}>
                      {theme.label}
                    </span>
                    {currentTheme === theme.name && <div className="w-2 h-2 rounded-full bg-terminal-green shadow-[0_0_8px_rgba(74,246,38,0.8)]" />}
                  </div>
                  <p className="text-[10px] text-terminal-dim leading-tight group-hover:text-terminal-text transition-colors">
                    {theme.desc}
                  </p>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button 
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center justify-center w-12 h-12 rounded-full border shadow-lg transition-all ${
          isOpen 
            ? "bg-terminal-green text-terminal-black border-terminal-green" 
            : "bg-terminal-black text-terminal-green border-terminal-dark-gray hover:border-terminal-green"
        }`}
      >
        <Palette size={20} />
      </motion.button>
    </div>
  );
}