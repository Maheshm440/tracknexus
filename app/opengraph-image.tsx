import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const alt = 'Track Nexus - AI-Powered Time Tracking Software'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #096EB6 0%, #064E80 50%, #032740 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'system-ui, sans-serif',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Background pattern */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            opacity: 0.1,
            display: 'flex',
            background: 'radial-gradient(circle at 20% 50%, rgba(255,255,255,0.2) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255,255,255,0.15) 0%, transparent 40%)',
          }}
        />

        {/* Logo area */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: 30,
          }}
        >
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 16,
              background: 'rgba(255,255,255,0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: 16,
              fontSize: 36,
            }}
          >
            ⏱
          </div>
          <span
            style={{
              fontSize: 42,
              fontWeight: 700,
              color: 'white',
              letterSpacing: '-0.02em',
            }}
          >
            Track Nexus
          </span>
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: 52,
            fontWeight: 800,
            color: 'white',
            textAlign: 'center',
            maxWidth: 900,
            lineHeight: 1.2,
            letterSpacing: '-0.03em',
            marginBottom: 20,
          }}
        >
          AI-Powered Time Tracking
        </div>
        <div
          style={{
            fontSize: 52,
            fontWeight: 800,
            color: '#5BC0F8',
            textAlign: 'center',
            maxWidth: 900,
            lineHeight: 1.2,
            letterSpacing: '-0.03em',
            marginBottom: 30,
          }}
        >
          for Modern Teams
        </div>

        {/* Description */}
        <div
          style={{
            fontSize: 22,
            color: 'rgba(255,255,255,0.85)',
            textAlign: 'center',
            maxWidth: 700,
            lineHeight: 1.5,
          }}
        >
          Track work hours, boost productivity, and manage your workforce with AI-powered insights
        </div>

        {/* Bottom bar */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: 6,
            background: 'linear-gradient(90deg, #5BC0F8, #096EB6, #5BC0F8)',
            display: 'flex',
          }}
        />

        {/* URL */}
        <div
          style={{
            position: 'absolute',
            bottom: 24,
            right: 40,
            fontSize: 18,
            color: 'rgba(255,255,255,0.6)',
            display: 'flex',
          }}
        >
          tracknexus.com
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
