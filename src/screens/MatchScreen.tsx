import { useState, useEffect } from 'react'
import { ChevronLeft, Volume2, Settings } from 'lucide-react'
import DominoTile from '../components/DominoTile'
import type { MatchResult } from '../App'

interface Props { onEnd: (result: MatchResult) => void }

const REACTIONS = ['👍', '😅', '🔥', '😮', '🎲', '👏']

const HAND = [
  { top: 6, bottom: 6 }, { top: 5, bottom: 4 }, { top: 3, bottom: 2 },
  { top: 1, bottom: 1 }, { top: 4, bottom: 0 }, { top: 2, bottom: 6 }, { top: 3, bottom: 3 },
]

const BOARD = [
  { top: 6, bottom: 6 }, { top: 6, bottom: 4 }, { top: 4, bottom: 2 }, { top: 2, bottom: 5 },
]

export default function MatchScreen({ onEnd }: Props) {
  const [timer, setTimer] = useState(20)
  const [selected, setSelected] = useState<number | null>(null)
  const [reaction, setReaction] = useState<string | null>(null)
  const [forfeit, setForfeit] = useState(false)
  const [opponentThinking, setOpponentThinking] = useState(false)
  const [myTurn, setMyTurn] = useState(true)

  useEffect(() => {
    if (!myTurn) return
    const t = setInterval(() => setTimer(n => {
      if (n <= 1) {
        clearInterval(t)
        handleEnd('loss')
        return 0
      }
      return n - 1
    }), 1000)
    return () => clearInterval(t)
  }, [myTurn])

  const handleEnd = (result: MatchResult) => {
    if (forfeit) setForfeit(false)
    onEnd(result)
  }

  const sendReaction = (r: string) => {
    setReaction(r)
    setTimeout(() => setReaction(null), 2000)
  }

  return (
    <div className="flex flex-col" style={{ background: '#070A14', height: '100vh', overflow: 'hidden', position: 'relative' }}>
      {/* Top bar */}
      <div className="flex items-center justify-between px-4"
        style={{ background: '#141A2E', borderBottom: '1px solid rgba(255,255,255,0.06)', height: 56, flexShrink: 0 }}>
        <button onClick={() => setForfeit(true)} style={{ width: 44, height: 44, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'none', border: 'none', cursor: 'pointer' }}>
          <ChevronLeft size={24} color="#FFFFFF" />
        </button>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ fontSize: 14 }}>🪙</span>
            <span style={{ fontFamily: 'Lilita One, cursive', fontSize: 18, color: '#FFFFFF' }}>500 BC</span>
          </div>
          <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 10, color: '#6E7691' }}>10% comissão</span>
        </div>
        <div className="flex items-center gap-1">
          <button style={{ width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'none', border: 'none', cursor: 'pointer' }}>
            <Volume2 size={18} color="#A9B0C6" />
          </button>
          <button style={{ width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'none', border: 'none', cursor: 'pointer' }}>
            <Settings size={18} color="#A9B0C6" />
          </button>
        </div>
      </div>

      {/* Opponent row */}
      <div className="flex items-center gap-3 px-4 py-3" style={{ flexShrink: 0 }}>
        <div style={{ position: 'relative' }}>
          <div style={{
            width: 48, height: 48, borderRadius: '50%', background: '#1B2340',
            display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24,
            border: `2px solid ${!myTurn ? '#FFD93D' : 'rgba(255,255,255,0.1)'}`,
          }}>🦁</div>
          {!myTurn && (
            <div style={{
              position: 'absolute', inset: -3, borderRadius: '50%',
              border: `2px solid #FFD93D`, opacity: 0.5,
            }} />
          )}
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 14, color: '#FFFFFF' }}>Carlos M.</span>
            <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, background: '#1B2340', padding: '2px 6px', borderRadius: 6, color: '#A9B0C6' }}>Nível 12</span>
          </div>
          {!myTurn && <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: '#6E7691', marginTop: 2 }}>pensando…</p>}
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <DominoTile top={0} bottom={0} size="sm" faceDown />
            <span style={{ fontFamily: 'Lilita One, cursive', fontSize: 14, color: '#FFFFFF' }}>×7</span>
          </div>
        </div>
        {reaction && (
          <div style={{
            position: 'absolute', left: '50%', top: 80,
            transform: 'translateX(-50%)',
            fontSize: 32, animation: 'fade-up 200ms ease-out',
            zIndex: 20,
          }}>{reaction}</div>
        )}
      </div>

      {/* Board */}
      <div className="flex-1 relative overflow-hidden"
        style={{
          background: 'radial-gradient(ellipse at 50% 40%, #0E7A4B 0%, #063D28 100%)',
          margin: '0 16px', borderRadius: 24,
          border: '8px solid #3B2414',
          outline: '2px solid #D4A017',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
        <div style={{ display: 'flex', gap: 4, padding: 16, flexWrap: 'wrap', justifyContent: 'center' }}>
          {BOARD.map((t, i) => (
            <div key={i} style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.5))' }}>
              <DominoTile top={t.top} bottom={t.bottom} size="md" />
            </div>
          ))}
        </div>

        {/* Boneyard */}
        <div style={{
          position: 'absolute', bottom: 12, left: 12,
          background: '#1B2340', borderRadius: 12, padding: '6px 10px',
          border: '1px solid rgba(255,255,255,0.1)',
          display: 'flex', alignItems: 'center', gap: 4,
        }}>
          <DominoTile top={0} bottom={0} size="sm" faceDown />
          <span style={{ fontFamily: 'Lilita One, cursive', fontSize: 13, color: '#FFFFFF' }}>14</span>
        </div>
      </div>

      {/* Turn indicator */}
      <div style={{
        height: 3, background: myTurn ? '#FFD93D' : 'rgba(255,255,255,0.1)',
        margin: '0 16px',
        boxShadow: myTurn ? '0 0 12px rgba(255,217,61,0.6)' : 'none',
        animation: myTurn ? 'glow-pulse 2s ease-in-out infinite' : 'none',
        transition: 'all 300ms',
      }} />

      {/* Reactions row */}
      <div className="flex items-center justify-around px-4 py-2" style={{ flexShrink: 0 }}>
        {REACTIONS.map(r => (
          <button key={r} onClick={() => sendReaction(r)}
            style={{ width: 44, height: 44, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'none', border: 'none', cursor: 'pointer', fontSize: 22 }}>
            {r}
          </button>
        ))}
      </div>

      {/* Player hand */}
      <div style={{ flexShrink: 0, paddingBottom: 8 }}>
        {/* Timer */}
        <div className="flex items-center justify-between px-4 mb-2">
          <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: '#A9B0C6' }}>
            {myTurn ? 'Sua vez' : 'Adversário jogando'}
          </span>
          {myTurn && (
            <span style={{ fontFamily: 'Lilita One, cursive', fontSize: 14, color: timer <= 5 ? '#F0424B' : '#FFD93D' }}>
              ⏱ {timer}s
            </span>
          )}
        </div>

        <div style={{ display: 'flex', gap: 6, paddingLeft: 16, paddingRight: 16, overflowX: 'auto' }}>
          {HAND.map((t, i) => {
            const playable = myTurn && (i % 2 === 0)
            const isSelected = selected === i
            return (
              <button key={i} onClick={() => { if (playable) { setSelected(isSelected ? null : i); if (!isSelected) setTimeout(() => { setSelected(null); setMyTurn(false); setTimeout(() => { setMyTurn(true); setTimer(20) }, 2000) }, 800) } }}
                style={{
                  flexShrink: 0, background: 'none', border: 'none', cursor: playable ? 'pointer' : 'not-allowed',
                  opacity: playable ? 1 : 0.5,
                  transform: isSelected ? 'translateY(-8px)' : 'translateY(0)',
                  transition: 'transform 150ms',
                  filter: isSelected ? 'drop-shadow(0 0 8px rgba(255,217,61,0.6))' : 'none',
                }}>
                <DominoTile top={t.top} bottom={t.bottom} size="md" />
              </button>
            )
          })}
        </div>
      </div>

      {/* Demo end buttons */}
      <div className="flex gap-2 px-4 pb-4" style={{ flexShrink: 0 }}>
        <button className="btn-yellow flex-1" style={{ height: 40, fontSize: 13 }} onClick={() => handleEnd('win')}>Demo: Ganhar</button>
        <button className="btn-secondary flex-1" style={{ height: 40, fontSize: 13 }} onClick={() => handleEnd('loss')}>Demo: Perder</button>
        <button className="btn-secondary flex-1" style={{ height: 40, fontSize: 13 }} onClick={() => handleEnd('draw')}>Demo: Empate</button>
      </div>

      {/* Forfeit sheet */}
      {forfeit && (
        <div className="fixed inset-0 sheet-backdrop flex items-end z-50">
          <div style={{ background: '#141A2E', borderRadius: '28px 28px 0 0', width: '100%', padding: '24px 24px 48px', border: '1px solid rgba(255,255,255,0.06)', borderBottom: 'none' }}>
            <div style={{ width: 40, height: 4, background: '#6E7691', borderRadius: 999, margin: '0 auto 20px' }} />
            <h3 style={{ fontFamily: 'Lilita One, cursive', fontSize: 22, color: '#FFFFFF', textAlign: 'center', marginBottom: 8 }}>
              Desistir da partida?
            </h3>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, color: '#A9B0C6', textAlign: 'center', marginBottom: 24 }}>
              Você perde o pote de 500 BC
            </p>
            <div className="flex gap-3">
              <button style={{ flex: 1, height: 48, borderRadius: 999, background: '#F0424B', border: 'none', color: '#FFFFFF', fontFamily: 'Lilita One, cursive', fontSize: 16, cursor: 'pointer' }}
                onClick={() => handleEnd('loss')}>Desistir</button>
              <button className="btn-secondary flex-1" style={{ height: 48 }} onClick={() => setForfeit(false)}>Continuar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
