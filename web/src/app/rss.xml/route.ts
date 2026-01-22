import { getSortedPostsData } from "@/lib/blog";

export async function GET() {
  const posts = getSortedPostsData();
  const siteUrl = "https://portfolio.toolden.xyz";
  
  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Vinayak Tyagi | Blog</title>
    <link>${siteUrl}/blog</link>
    <description>Thoughts on engineering, systems, and tools.</description>
    <language>en-us</language>
    <atom:link href="${siteUrl}/rss.xml" rel="self" type="application/rss+xml" />
    ${posts.map(post => `
    <item>
      <title>${post.title}</title>
      <link>${siteUrl}/blog/${post.slug}</link>
      <guid>${siteUrl}/blog/${post.slug}</guid>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <description>${post.description}</description>
    </item>
    `).join('')}
  </channel>
</rss>`;

  return new Response(rss, {
    headers: { 
      'Content-Type': 'application/xml',
      'Cache-Control': 's-maxage=3600, stale-while-revalidate'
    }
  });
}
