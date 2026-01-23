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

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostData(slug);
  
  return {
    title: `${post.title} | Vinayak Tyagi`,
    description: post.description,
    alternates: {
      canonical: `/blog/${slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.date,
      tags: post.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
    }
  };
}

export default async function Post({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const postData = getPostData(slug);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: postData.title,
    datePublished: postData.date,
    dateModified: postData.date,
    description: postData.description,
    author: {
      '@type': 'Person',
      name: 'Vinayak Tyagi',
      url: 'https://portfolio.toolden.xyz',
    },
    url: `https://portfolio.toolden.xyz/blog/${slug}`,
  };

  return (
    <div className="max-w-3xl mx-auto py-12 px-4">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Link 
        href="/blog"
        className="inline-flex items-center gap-2 text-terminal-dim hover:text-terminal-green mb-8 transition-colors"
      >
        <ArrowLeft size={16} /> cd ..
      </Link>

      <article className="prose prose-invert prose-lg max-w-none 
        prose-headings:font-bold prose-headings:text-white prose-h1:text-4xl prose-h2:text-2xl prose-h2:mt-16 prose-h2:mb-8 prose-h2:border-b prose-h2:border-terminal-dark-gray prose-h2:pb-4
        prose-h3:text-xl prose-h3:mt-12 prose-h3:mb-6
        prose-p:text-terminal-text prose-p:leading-8 prose-p:mb-8
        prose-a:text-terminal-blue prose-a:no-underline hover:prose-a:underline
        prose-strong:text-terminal-green
        prose-code:text-terminal-yellow prose-code:bg-terminal-dark-gray/30 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:before:content-none prose-code:after:content-none
        prose-pre:bg-terminal-black prose-pre:border prose-pre:border-terminal-dark-gray prose-pre:text-sm prose-pre:font-mono prose-pre:p-6 prose-pre:my-10
        prose-li:text-terminal-text prose-li:my-2
        prose-ul:my-8 prose-ol:my-8
      ">
        <div className="mb-12 border-b border-terminal-dark-gray pb-12 not-prose">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6 leading-tight">{postData.title}</h1>
          <div className="flex items-center gap-6 text-sm text-terminal-dim font-mono">
            <span className="flex items-center gap-2">
              <span className="text-terminal-green">date:</span> {postData.date}
            </span>
            <span className="flex items-center gap-2">
              <span className="text-terminal-green">read:</span> {postData.readingTime} min
            </span>
            <span className="text-terminal-dark-gray">|</span>
            <div className="flex gap-3">
              <span className="text-terminal-green">tags:</span>
              {postData.tags.map(tag => (
                <span key={tag} className="text-terminal-blue">#{tag}</span>
              ))}
            </div>
          </div>
        </div>
        
        <ReactMarkdown>{postData.content}</ReactMarkdown>
      </article>
    </div>
  );
}
