import { getPostData, getSortedPostsData } from "@/lib/blog";
import ReactMarkdown from "react-markdown";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

// This function tells Next.js which slugs to pre-render at build time
export async function generateStaticParams() {
  const posts = getSortedPostsData();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function Post({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const postData = getPostData(slug);

  return (
    <div className="max-w-3xl mx-auto py-12 px-4">
      <Link 
        href="/blog"
        className="inline-flex items-center gap-2 text-terminal-dim hover:text-terminal-green mb-8 transition-colors"
      >
        <ArrowLeft size={16} /> cd ..
      </Link>

      <article className="prose prose-invert prose-pre:bg-terminal-black prose-pre:border prose-pre:border-terminal-dark-gray max-w-none">
        <div className="mb-8 border-b border-terminal-dark-gray pb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">{postData.title}</h1>
          <div className="flex gap-4 text-sm text-terminal-dim font-mono">
            <span>{postData.date}</span>
            <span>::</span>
            <div className="flex gap-2">
              {postData.tags.map(tag => (
                <span key={tag} className="text-terminal-blue">#{tag}</span>
              ))}
            </div>
          </div>
        </div>
        
        <div className="text-terminal-text leading-relaxed">
          <ReactMarkdown>{postData.content}</ReactMarkdown>
        </div>
      </article>
    </div>
  );
}
