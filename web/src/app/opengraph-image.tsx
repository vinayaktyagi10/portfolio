import { ImageResponse } from 'next/og';

export const alt = 'Vinayak Tyagi | DevOps & Systems Engineering';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#0C0C0C',
          color: '#4AF626',
          fontFamily: 'monospace',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            border: '4px solid #333',
            padding: '60px',
            borderRadius: '20px',
            backgroundColor: '#111',
          }}
        >
          <div
            style={{
              fontSize: '80px',
              fontWeight: 'bold',
              color: '#fff',
              marginBottom: '20px',
            }}
          >
            Vinayak Tyagi
          </div>
          <div
            style={{
              fontSize: '32px',
              color: '#4AF626',
              marginBottom: '40px',
            }}
          >
            DevOps & Systems Engineering
          </div>
          <div
            style={{
              display: 'flex',
              gap: '20px',
              fontSize: '24px',
              color: '#6B7280',
            }}
          >
            <span>Linux</span>
            <span>•</span>
            <span>Docker</span>
            <span>•</span>
            <span>Kubernetes</span>
            <span>•</span>
            <span>Go</span>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
