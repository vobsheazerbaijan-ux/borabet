import { ChevronLeft } from 'lucide-react'
import { useState } from 'react'

interface Props { onBack: () => void }

type Tab = 'active' | 'upcoming' | 'finished'

const TOURNAMENTS = {
  active: [
    {
      id: 1, title: 'Campeonato Domino Semanal', icon: '🎲',
      prize: '50.000 BC', players: 342, ends: '2d 14h', progress: 62,
      leaders: [
        { rank: 1, name: 'Carlos M.', pts: 1420 },
        { rank: 2, name: 'Fernanda L.', pts: 1280 },
        { rank: 3, name: 'Diego R.', pts: 1170 },
      ],
    },
    {
      id: 2, title: 'Plinko Multiplicador', icon: '🎯',
      prize: '25.000 BC', players: 189, ends: '5d 08h', progress: 30,
      leaders: [
        { rank: 1, name: 'Bruno T.', pts: '420×' },
        { rank: 2, name: 'Ana P.', pts: '380×' },
        { rank: 3, name: 'Lucas C.', pts: '290×' },
      ],
    },
  ],
  upcoming: [
    { id: 3, title: 'Torneio Relâmpago', icon: '⚡', prize: '10.000 BC', starts: 'Amanhã, 20:00' },
  ],
  finished: [
    { id: 4, title: 'Campeonato Domino #11', icon: '🎲', prize: '40.000 BC', winner: 'Carlos M.' },
  ],
}

export default function TournamentsScreen({ onBack }: Props) {
  const [tab, setTab] = useState<Tab>('active')
  const list = TOURNAMENTS[tab] as any[]

  return (
    <div className="flex flex-col" style={{ background: '#0D1222', minHeight: '100%' }}>
      <div className="flex items-center justify-between px-4 sticky top-0 z-40"
        style={{ background: '#141A2E', borderBottom: '1px solid rgba(255,255,255,0.06)', height: 56 }}>
        <button onClick={onBack} style={{ width: 44, height: 44, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'none', border: 'none', cursor: 'pointer' }}>
          <ChevronLeft size={24} color="#FFFFFF" />
        </button>
        <span style={{ fontFamily: 'Lilita One, cursive', fontSize: 18, color: '#FFFFFF' }}>Torneios</span>
        <div style={{ width: 44 }} />
      </div>

      <div className="flex gap-1 px-4 py-3"
        style={{ background: '#141A2E', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        {(['active', 'upcoming', 'finished'] as Tab[]).map(t => (
          <button key={t} onClick={() => setTab(t)}
            style={{
              flex: 1, height: 36, borderRadius: 999,
              background: tab === t ? '#FFD93D' : 'transparent',
              border: tab === t ? 'none' : '1px solid rgba(255,255,255,0.06)',
              color: tab === t ? '#1A1400' : '#A9B0C6',
              fontFamily: tab === t ? 'Lilita One, cursive' : 'Inter, sans-serif',
              fontSize: 13, fontWeight: 600, cursor: 'pointer',
            }}>
            {t === 'active' ? 'Ao vivo' : t === 'upcoming' ? 'Em breve' : 'Encerrados'}
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-3 px-4 py-4 pb-6">
        {list.map((t: any) => (
          <div key={t.id} className="card" style={{ padding: 16 }}>
            <div className="flex items-start gap-3 mb-3">
              <span style={{ fontSize: 32, flexShrink: 0 }}>{t.icon}</span>
              <div className="flex-1">
                <p style={{ fontFamily: 'Lilita One, cursive', fontSize: 16, color: '#FFFFFF' }}>{t.title}</p>
                <div className="flex gap-3 mt-1">
                  <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: '#FFD93D', fontWeight: 600 }}>🏆 {t.prize}</span>
                  {t.players && <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: '#6E7691' }}>👥 {t.players}</span>}
                  {t.ends && <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: '#3DDB5F' }}>⏱ {t.ends}</span>}
                  {t.starts && <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: '#3B7BFF' }}>🕒 {t.starts}</span>}
                  {t.winner && <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: '#FFD93D' }}>🥇 {t.winner}</span>}
                </div>
              </div>
            </div>

            {t.progress !== undefined && (
              <div className="mb-3">
                <div className="progress-bar" style={{ height: 6 }}>
                  <div className="progress-fill" style={{ width: `${t.progress}%` }} />
                </div>
              </div>
            )}

            {t.leaders && (
              <div style={{ background: '#1B2340', borderRadius: 12, padding: 10 }}>
                {t.leaders.map((l: any, i: number) => (
                  <div key={i} className="flex items-center gap-2 py-1">
                    <span style={{ fontFamily: 'Lilita One, cursive', fontSize: 14,
                      color: ['#D4A017', '#A9B0C6', '#C97B3A'][i], width: 20 }}>{l.rank}</span>
                    <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: '#FFFFFF', flex: 1 }}>{l.name}</span>
                    <span style={{ fontFamily: 'Lilita One, cursive', fontSize: 13, color: '#FFD93D' }}>{l.pts}</span>
                  </div>
                ))}
              </div>
            )}

            {t.leaders && (
              <button className="btn-yellow" style={{ width: '100%', height: 40, marginTop: 12, fontSize: 14 }}>
                Ver ranking
              </button>
            )}
          </div>
        ))}

        {list.length === 0 && (
          <div className="flex flex-col items-center gap-3 py-12">
            <span style={{ fontSize: 48, opacity: 0.4 }}>🏆</span>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, color: '#6E7691' }}>Nenhum torneio por aqui ainda</p>
          </div>
        )}
      </div>
    </div>
  )
}
