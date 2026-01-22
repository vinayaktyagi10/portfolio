"use client";

import { useState, useEffect } from "react";
import { Palette } from "lucide-react";

const themes = [
  { name: "default", label: "Arch" },
  { name: "dracula", label: "Dracula" },
  { name: "nord", label: "Nord" },
  { name: "monokai", label: "Monokai" },
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
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 text-terminal-dim hover:text-terminal-green transition-colors px-3 py-1.5 border border-transparent hover:border-terminal-dark-gray rounded-md"
      >
        <Palette size={14} />
        <span className="hidden sm:inline text-xs font-mono">{themes.find(t => t.name === currentTheme)?.label}</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-32 bg-terminal-black border border-terminal-dark-gray rounded-md shadow-xl z-50">
          {themes.map((theme) => (
            <button
              key={theme.name}
              onClick={() => changeTheme(theme.name)}
              className={`w-full text-left px-4 py-2 text-xs font-mono hover:bg-terminal-dark-gray transition-colors ${currentTheme === theme.name ? "text-terminal-green" : "text-terminal-text"}`}
            >
              {theme.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
