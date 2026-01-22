"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Send } from "lucide-react";

export default function Contact() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setFormState({ name: "", email: "", message: "" });
    }, 1500);
  };

  return (
    <div className="max-w-2xl mx-auto py-12 space-y-8">
      <div className="space-y-4 border-b border-terminal-dark-gray pb-8">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold text-white"
        >
          <span className="text-terminal-green">./</span>contact
        </motion.h1>
        <p className="text-terminal-dim text-lg">
          Execute <span className="text-terminal-blue">send-mail</span> to initialize a handshake.
        </p>
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="bg-terminal-dark-gray/20 border border-terminal-dark-gray p-6 sm:p-8"
      >
        {submitted ? (
          <div className="text-center py-12 space-y-4">
            <div className="text-terminal-green text-xl font-bold">Message Transmitted Successfully.</div>
            <p className="text-terminal-dim">I will respond to your signal shortly.</p>
            <button 
              onClick={() => setSubmitted(false)}
              className="text-terminal-blue hover:underline text-sm mt-4"
            >
              Send another message
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="name" className="block text-sm font-bold text-terminal-green">
                --name
              </label>
              <input
                type="text"
                id="name"
                required
                value={formState.name}
                onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                className="w-full bg-terminal-black border border-terminal-dark-gray p-3 text-white focus:border-terminal-green focus:outline-none transition-colors"
                placeholder='Vinayak Tyagi'
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-bold text-terminal-green">
                --email
              </label>
              <input
                type="email"
                id="email"
                required
                value={formState.email}
                onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                className="w-full bg-terminal-black border border-terminal-dark-gray p-3 text-white focus:border-terminal-green focus:outline-none transition-colors"
                placeholder="vinayak@example.com"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="message" className="block text-sm font-bold text-terminal-green">
                --message
              </label>
              <textarea
                id="message"
                required
                rows={5}
                value={formState.message}
                onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                className="w-full bg-terminal-black border border-terminal-dark-gray p-3 text-white focus:border-terminal-green focus:outline-none transition-colors font-mono"
                placeholder="Initial content..."
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-terminal-green text-terminal-black font-bold py-3 px-4 hover:bg-terminal-green-dim transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <span>Transmitting...</span>
              ) : (
                <>
                  <Send size={18} /> Send Message
                </>
              )}
            </button>
          </form>
        )}
      </motion.div>
    </div>
  );
}
