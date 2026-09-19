import { useEffect } from 'react'

interface Props { onDone: () => void }

export default function SplashScreen({ onDone }: Props) {
  useEffect(() => {
    const t = setTimeout(onDone, 1800)
    return () => clearTimeout(t)
  }, [onDone])

  return (
    <div style={{
      position: 'fixed', inset: 0, background: '#070A14',
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      maxWidth: 480, margin: '0 auto',
    }}>
      <div style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16,
        animation: 'fade-up 300ms ease-out both',
      }}>
        {/* Emblem */}
        <div style={{
          width: 96, height: 96, borderRadius: 28,
          background: 'linear-gradient(135deg, #1B2340 0%, #0D1222 100%)',
          border: '2px solid #D4A017',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 52,
          boxShadow: '0 0 40px rgba(255,217,61,0.3)',
        }}>🁣</div>

        {/* Wordmark */}
        <div style={{ textAlign: 'center' }}>
          <span style={{
            fontFamily: 'Lilita One, cursive',
            fontSize: 40, color: '#FFFFFF',
            letterSpacing: -1,
            textShadow: '0 0 30px rgba(255,217,61,0.4)',
          }}>BoraBet</span>
        </div>
        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, color: '#6E7691' }}>
          Dominó 1v1 · Rápido · Brasileiro
        </p>
      </div>

      {/* Progress bar */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: 2,
        background: 'rgba(255,255,255,0.06)',
      }}>
        <div style={{
          height: '100%',
          background: 'linear-gradient(90deg, #FFD93D, #F2B705)',
          animation: 'progress-line 1.6s ease-out forwards',
        }} />
      </div>

      <style>{`
        @keyframes progress-line {
          from { width: 0%; }
          to { width: 100%; }
        }
      `}</style>
    </div>
  )
}
