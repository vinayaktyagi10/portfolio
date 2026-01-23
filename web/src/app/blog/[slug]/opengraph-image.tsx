import { ImageResponse } from 'next/og';
import { getPostData } from '@/lib/blog';

export const alt = 'Blog Post | Vinayak Tyagi';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostData(slug);

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          backgroundColor: '#0C0C0C', // terminal-black
          color: '#4AF626', // terminal-green
          padding: '80px',
          fontFamily: 'monospace',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '20px',
            fontSize: '24px',
            color: '#6B7280', // terminal-dim
          }}
        >
          <span>~/blog/{slug}</span>
        </div>
        <div
          style={{
            fontSize: '60px',
            fontWeight: 'bold',
            color: '#FFFFFF',
            marginBottom: '40px',
            lineHeight: 1.2,
          }}
        >
          {post.title}
        </div>
        <div
          style={{
            display: 'flex',
            gap: '20px',
            fontSize: '24px',
          }}
        >
          <div style={{ color: '#4AF626' }}>
            $ date -d "{post.date}"
          </div>
          <div style={{ color: '#2563EB' }}>
            # {post.tags[0]}
          </div>
        </div>
        <div
            style={{
                position: 'absolute',
                bottom: '40px',
                right: '40px',
                fontSize: '20px',
                color: '#6B7280',
            }}
        >
            portfolio.toolden.xyz
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
