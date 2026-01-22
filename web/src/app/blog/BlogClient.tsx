"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { PostData } from "@/lib/blog";

export default function BlogClient({ posts }: { posts: PostData[] }) {
  return (
    <div className="max-w-4xl mx-auto py-12 space-y-12">
      <div className="space-y-4 border-b border-terminal-dark-gray pb-8">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold text-white"
        >
          <span className="text-terminal-green">./</span>blog
        </motion.h1>
        <p className="text-terminal-dim text-lg">
          Thoughts on engineering, systems, and tools.
        </p>
      </div>

      <div className="space-y-6">
        {posts.map((post, i) => (
          <motion.article
            key={post.slug}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className="group border border-terminal-dark-gray bg-terminal-black/50 p-6 hover:border-terminal-green transition-colors"
          >
            <Link href={`/blog/${post.slug}`} className="block space-y-3">
              <div className="flex items-center justify-between text-xs text-terminal-dim">
                <span>{post.date}</span>
                <div className="flex gap-2">
                   {post.tags.map(tag => (
                     <span key={tag} className="bg-terminal-dark-gray/30 px-2 py-0.5 rounded text-terminal-blue">{tag}</span>
                   ))}
                </div>
              </div>
              
              <h2 className="text-xl font-bold text-white group-hover:text-terminal-green transition-colors">
                {post.title}
              </h2>
              
              <p className="text-terminal-dim">
                {post.description}
              </p>
            </Link>
          </motion.article>
        ))}
      </div>
    </div>
  );
}
