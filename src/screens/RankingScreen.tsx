import { useState } from 'react'
import { ChevronLeft } from 'lucide-react'

interface Props { onBack: () => void }

type Period = 'week' | 'month' | 'all'

const DATA = [
  { rank: 1, name: 'Carlos M.', avatar: '🦁', wins: 142, pot: 28000 },
  { rank: 2, name: 'Fernanda L.', avatar: '🌟', wins: 128, pot: 24000 },
  { rank: 3, name: 'Diego R.', avatar: '🔥', wins: 117, pot: 21000 },
  { rank: 4, name: 'Ana P.', avatar: '🎯', wins: 98, pot: 18000 },
  { rank: 5, name: 'Bruno T.', avatar: '🎲', wins: 87, pot: 15000 },
  { rank: 6, name: 'Lucas C.', avatar: '💎', wins: 76, pot: 13000 },
  { rank: 7, name: 'Marina S.', avatar: '⚡', wins: 65, pot: 11000 },
  { rank: 8, name: 'Pedro A.', avatar: '🏆', wins: 54, pot: 9000 },
  { rank: 9, name: 'Julia M.', avatar: '🎵', wins: 43, pot: 7500 },
  { rank: 10, name: 'Você', avatar: '😊', wins: 89, pot: 16000, isMe: true },
]

export default function RankingScreen({ onBack }: Props) {
  const [period, setPeriod] = useState<Period>('week')
  const fmt = (n: number) => n.toLocaleString('pt-BR')
  const rankColors = ['#D4A017', '#A9B0C6', '#C97B3A']

  return (
    <div className="flex flex-col" style={{ background: '#0D1222', minHeight: '100%' }}>
      <div className="flex items-center justify-between px-4 sticky top-0 z-40"
        style={{ background: '#141A2E', borderBottom: '1px solid rgba(255,255,255,0.06)', height: 56 }}>
        <button onClick={onBack} style={{ width: 44, height: 44, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'none', border: 'none', cursor: 'pointer' }}>
          <ChevronLeft size={24} color="#FFFFFF" />
        </button>
        <span style={{ fontFamily: 'Lilita One, cursive', fontSize: 18, color: '#FFFFFF' }}>Ranking</span>
        <div style={{ width: 44 }} />
      </div>

      {/* Period selector */}
      <div className="flex gap-1 px-4 py-3" style={{ background: '#141A2E', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        {([
          { id: 'week', label: 'Semana' },
          { id: 'month', label: 'Mês' },
          { id: 'all', label: 'Geral' },
        ] as { id: Period; label: string }[]).map(p => (
          <button key={p.id} onClick={() => setPeriod(p.id)}
            style={{
              flex: 1, height: 36, borderRadius: 999,
              background: period === p.id ? '#FFD93D' : 'transparent',
              border: period === p.id ? 'none' : '1px solid rgba(255,255,255,0.06)',
              color: period === p.id ? '#1A1400' : '#A9B0C6',
              fontFamily: period === p.id ? 'Lilita One, cursive' : 'Inter, sans-serif',
              fontSize: 13, fontWeight: 600, cursor: 'pointer',
            }}>{p.label}</button>
        ))}
      </div>

      <div className="flex flex-col gap-3 px-4 py-4 pb-6">
        {/* Podium */}
        <div className="flex items-end justify-center gap-3 mb-2">
          {[DATA[1], DATA[0], DATA[2]].map((player, i) => {
            const heights = [100, 130, 85]
            const colors = ['#A9B0C6', '#D4A017', '#C97B3A']
            const ranks = [2, 1, 3]
            return (
              <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                {ranks[i] === 1 && <span style={{ fontSize: 20 }}>👑</span>}
                <div style={{
                  width: 56, height: 56, borderRadius: '50%', background: '#1B2340',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28,
                  border: `3px solid ${colors[i]}`,
                  boxShadow: `0 0 16px ${colors[i]}40`,
                }}>{player.avatar}</div>
                <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 12, color: '#FFFFFF', textAlign: 'center', maxWidth: 80 }}>
                  {player.name}
                </p>
                <div style={{
                  width: 80, height: heights[i], borderRadius: '8px 8px 0 0',
                  background: `linear-gradient(180deg, ${colors[i]}30, ${colors[i]}10)`,
                  border: `1px solid ${colors[i]}40`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <span style={{ fontFamily: 'Lilita One, cursive', fontSize: 22, color: colors[i] }}>{ranks[i]}</span>
                </div>
              </div>
            )
          })}
        </div>

        {/* List */}
        <div className="flex flex-col gap-2">
          {DATA.slice(3).map(player => (
            <div key={player.rank} className={player.isMe ? 'card' : 'card-sm'} style={{
              padding: '12px 14px', display: 'flex', alignItems: 'center', gap: 12,
              border: player.isMe ? '2px solid rgba(255,217,61,0.4)' : undefined,
            }}>
              <span style={{ fontFamily: 'Lilita One, cursive', fontSize: 18, color: '#6E7691', width: 28, textAlign: 'center' }}>
                {player.rank}
              </span>
              <div style={{
                width: 36, height: 36, borderRadius: '50%', background: '#1B2340',
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18,
                border: player.isMe ? '2px solid #FFD93D' : '1px solid rgba(255,255,255,0.08)',
              }}>{player.avatar}</div>
              <div className="flex-1">
                <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 13, color: '#FFFFFF' }}>
                  {player.name} {player.isMe && <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: '#FFD93D' }}>(você)</span>}
                </p>
              </div>
              <span style={{ fontFamily: 'Lilita One, cursive', fontSize: 14, color: '#FFD93D' }}>
                {player.wins} vitórias
              </span>
            </div>
          ))}
        </div>

        {/* My position sticky hint */}
        <div className="card" style={{ padding: '12px 14px', display: 'flex', alignItems: 'center', gap: 12, border: '2px solid rgba(255,217,61,0.4)' }}>
          <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: '#FFD93D', flexShrink: 0 }}>Minha posição</span>
          <span style={{ fontFamily: 'Lilita One, cursive', fontSize: 18, color: '#FFD93D', width: 28 }}>10</span>
          <div style={{ width: 36, height: 36, borderRadius: '50%', background: '#1B2340', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, border: '2px solid #FFD93D' }}>😊</div>
          <div className="flex-1">
            <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 13, color: '#FFFFFF' }}>Você</p>
          </div>
          <span style={{ fontFamily: 'Lilita One, cursive', fontSize: 14, color: '#FFD93D' }}>89 vitórias</span>
        </div>
      </div>
    </div>
  )
}
