/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from 'next/og'
import type { NextRequest } from 'next/server'

export function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const path = searchParams.get('path') || '/'
  const title = searchParams.get('title') || 'Recipe Generator'
  const emoji = searchParams.get('emoji') || '🍳'

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
          backgroundColor: '#000',
          gap: 24,
        }}
      >
        <div
          style={{
            fontSize: 96,
          }}
        >
          {emoji}
        </div>
        <div
          style={{
            fontSize: 60,
            fontWeight: 700,
            color: '#fff',
            textAlign: 'center',
            padding: '0 48px',
            lineHeight: 1.2,
          }}
        >
          {title}
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      headers: {
        'Cache-Control': 'public, max-age=3600, immutable',
      },
    }
  )
}
