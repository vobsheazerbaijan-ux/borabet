import { useState } from 'react'
import { ChevronLeft } from 'lucide-react'

interface Props { onBack: () => void }

type Tab = 'daily' | 'missions' | 'levels' | 'chests'

const DAYS = [
  { day: 1, reward: '50 BC', icon: '🪙', claimed: true },
  { day: 2, reward: '50 BC', icon: '🪙', claimed: true },
  { day: 3, reward: '75 BC', icon: '🪙', claimed: true },
  { day: 4, reward: '75 BC', icon: '🪙', claimed: true, today: true },
  { day: 5, reward: '100 BC', icon: '🪙', claimed: false },
  { day: 6, reward: '100 BC', icon: '🪙', claimed: false },
  { day: 7, reward: '500 BC', icon: '🎁', claimed: false },
]

const MISSIONS_DAILY = [
  { icon: '🎲', title: 'Jogue 5 partidas', progress: 3, total: 5, reward: '+50 BC' },
  { icon: '🏆', title: 'Vença 3 partidas', progress: 1, total: 3, reward: '+75 BC' },
  { icon: '💬', title: 'Mande 10 mensagens', progress: 10, total: 10, reward: '+25 BC', done: true },
]

const MISSIONS_WEEKLY = [
  { icon: '🔥', title: 'Sequência de 7 dias', progress: 4, total: 7, reward: '+200 BC' },
  { icon: '💰', title: 'Deposite 1.000 BC', progress: 500, total: 1000, reward: '+50 BC' },
  { icon: '👥', title: 'Convide um amigo', progress: 0, total: 1, reward: '+500 BC' },
]

const TIERS = ['Novato', 'Parceiro', 'Craque', 'Fera', 'Lenda']

const CHESTS = [
  { icon: '📦', title: 'Baú diário', source: 'Sequência dia 7', available: false, progress: '4/7 dias' },
  { icon: '🎁', title: 'Missões diárias', source: 'Complete 3 missões', available: true },
  { icon: '🏆', title: 'Torneio semanal', source: 'Top 10 no ranking', available: false, progress: '#10' },
]

export default function RewardsScreen({ onBack }: Props) {
  const [tab, setTab] = useState<Tab>('daily')
  const [wheelSpun, setWheelSpun] = useState(false)

  const TABS: { id: Tab; label: string }[] = [
    { id: 'daily', label: 'Diárias' },
    { id: 'missions', label: 'Missões' },
    { id: 'levels', label: 'Níveis' },
    { id: 'chests', label: 'Baús' },
  ]

  return (
    <div className="flex flex-col" style={{ background: '#0D1222', minHeight: '100%' }}>
      <div className="flex items-center justify-between px-4 sticky top-0 z-40"
        style={{ background: '#141A2E', borderBottom: '1px solid rgba(255,255,255,0.06)', height: 56 }}>
        <button onClick={onBack} style={{ width: 44, height: 44, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'none', border: 'none', cursor: 'pointer' }}>
          <ChevronLeft size={24} color="#FFFFFF" />
        </button>
        <span style={{ fontFamily: 'Lilita One, cursive', fontSize: 18, color: '#FFFFFF' }}>Recompensas</span>
        <div style={{ width: 44 }} />
      </div>

      {/* Tab selector */}
      <div style={{ padding: '12px 16px', background: '#141A2E', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ display: 'flex', background: '#1B2340', borderRadius: 999, padding: 3, gap: 2 }}>
          {TABS.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)}
              style={{
                flex: 1, height: 34, borderRadius: 999, border: 'none', cursor: 'pointer',
                background: tab === t.id ? '#FFD93D' : 'transparent',
                color: tab === t.id ? '#1A1400' : '#A9B0C6',
                fontFamily: tab === t.id ? 'Lilita One, cursive' : 'Inter, sans-serif',
                fontSize: 12, fontWeight: 600,
              }}>{t.label}</button>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-4 px-4 py-4 pb-6">
        {tab === 'daily' && (
          <>
            {/* 7-day calendar */}
            <div className="card" style={{ padding: 16 }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 6, marginBottom: 12 }}>
                {DAYS.map(d => (
                  <div key={d.day} style={{
                    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
                    padding: '8px 4px', borderRadius: 12,
                    background: d.today ? 'rgba(255,217,61,0.1)' : d.claimed ? 'rgba(61,219,95,0.08)' : '#1B2340',
                    border: d.today ? '1px solid rgba(255,217,61,0.5)' : d.claimed ? '1px solid rgba(61,219,95,0.3)' : '1px solid rgba(255,255,255,0.06)',
                  }}>
                    <span style={{ fontSize: d.day === 7 ? 20 : 14 }}>{d.icon}</span>
                    <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 9, color: d.claimed ? '#3DDB5F' : '#6E7691' }}>
                      Dia {d.day}
                    </span>
                    {d.claimed && <span style={{ fontSize: 10 }}>✓</span>}
                  </div>
                ))}
              </div>
              <button className="btn-green" style={{ width: '100%', height: 44, fontSize: 15 }}>
                Pegar hoje (+75 BC)
              </button>
            </div>

            {/* Daily wheel */}
            <div className="card-sm flex items-center gap-4" style={{ padding: 16 }}>
              <span style={{ fontSize: 40 }}>🎡</span>
              <div className="flex-1">
                <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 14, color: '#FFFFFF' }}>
                  Roda diária
                </p>
                <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: '#A9B0C6', marginTop: 2 }}>
                  1 giro grátis a cada 24h
                </p>
              </div>
              <button className={`btn-green ${!wheelSpun ? 'glow-pulse' : ''}`}
                style={{ height: 40, paddingLeft: 16, paddingRight: 16, fontSize: 14 }}
                onClick={() => setWheelSpun(true)}
                disabled={wheelSpun}>
                {wheelSpun ? '✓ Girado' : 'Girar'}
              </button>
            </div>
          </>
        )}

        {tab === 'missions' && (
          <>
            <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 12, color: '#6E7691' }}>DIÁRIAS</p>
            {MISSIONS_DAILY.map((m, i) => (
              <div key={i} className="card-sm" style={{ padding: 14 }}>
                <div className="flex items-center gap-3 mb-2">
                  <span style={{ fontSize: 24, flexShrink: 0 }}>{m.icon}</span>
                  <div className="flex-1">
                    <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 13, color: '#FFFFFF' }}>{m.title}</p>
                    <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: '#FFD93D', marginTop: 2 }}>{m.reward}</p>
                  </div>
                  {m.done && <button className="btn-green" style={{ height: 32, paddingLeft: 12, paddingRight: 12, fontSize: 12 }}>Resgatar</button>}
                </div>
                <div className="progress-bar" style={{ height: 6 }}>
                  <div className="progress-fill" style={{ width: `${(m.progress / m.total) * 100}%` }} />
                </div>
                <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: '#6E7691', marginTop: 4 }}>
                  {m.progress}/{m.total}
                </p>
              </div>
            ))}

            <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 12, color: '#6E7691', marginTop: 4 }}>SEMANAIS</p>
            {MISSIONS_WEEKLY.map((m, i) => (
              <div key={i} className="card-sm" style={{ padding: 14 }}>
                <div className="flex items-center gap-3 mb-2">
                  <span style={{ fontSize: 24, flexShrink: 0 }}>{m.icon}</span>
                  <div className="flex-1">
                    <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 13, color: '#FFFFFF' }}>{m.title}</p>
                    <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: '#FFD93D', marginTop: 2 }}>{m.reward}</p>
                  </div>
                </div>
                <div className="progress-bar" style={{ height: 6 }}>
                  <div className="progress-fill" style={{ width: `${(m.progress / m.total) * 100}%` }} />
                </div>
                <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: '#6E7691', marginTop: 4 }}>
                  {m.progress.toLocaleString('pt-BR')}/{m.total.toLocaleString('pt-BR')}
                </p>
              </div>
            ))}
          </>
        )}

        {tab === 'levels' && (
          <>
            <div className="card" style={{ padding: 20, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
              <div style={{
                width: 120, height: 120, borderRadius: '50%', background: '#1B2340',
                border: '4px solid #FFD93D',
                boxShadow: '0 0 30px rgba(255,217,61,0.3)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <span style={{ fontFamily: 'Lilita One, cursive', fontSize: 40, color: '#FFFFFF' }}>12</span>
              </div>
              <div style={{ textAlign: 'center' }}>
                <p style={{ fontFamily: 'Lilita One, cursive', fontSize: 20, color: '#FFD93D' }}>Craque</p>
                <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: '#A9B0C6', marginTop: 4 }}>
                  1.250 / 2.000 XP para o próximo nível
                </p>
              </div>
              <div style={{ width: '100%' }}>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: '62%' }} />
                </div>
              </div>
            </div>

            {/* Tier badges */}
            <div style={{ display: 'flex', gap: 8, justifyContent: 'space-between' }}>
              {TIERS.map((t, i) => (
                <div key={i} style={{
                  flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, padding: '10px 4px',
                  borderRadius: 16, background: i === 2 ? 'rgba(255,217,61,0.08)' : '#1B2340',
                  border: i === 2 ? '2px solid rgba(255,217,61,0.4)' : '1px solid rgba(255,255,255,0.06)',
                  opacity: i > 2 ? 0.4 : 1,
                }}>
                  <span style={{ fontSize: i === 2 ? 24 : 18 }}>
                    {['🥉', '🥈', '🥇', '💎', '👑'][i]}
                  </span>
                  <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 9, color: i === 2 ? '#FFD93D' : '#6E7691', textAlign: 'center' }}>
                    {t}
                  </span>
                </div>
              ))}
            </div>

            {/* Current perks */}
            <div className="card" style={{ padding: 16 }}>
              <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 13, color: '#FFFFFF', marginBottom: 10 }}>
                Benefícios do nível Craque
              </p>
              {['3% cashback semanal', 'Tile skin Esmeralda', 'Badge de chat exclusivo'].map((p, i) => (
                <div key={i} className="flex items-center gap-2 py-2" style={{ borderTop: i > 0 ? '1px solid rgba(255,255,255,0.04)' : 'none' }}>
                  <span style={{ color: '#3DDB5F', fontSize: 14 }}>✓</span>
                  <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, color: '#A9B0C6' }}>{p}</span>
                </div>
              ))}
            </div>
          </>
        )}

        {tab === 'chests' && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {CHESTS.map((c, i) => (
              <div key={i} className="card-sm" style={{ padding: 16, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
                <span style={{ fontSize: 48 }}>{c.icon}</span>
                <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 13, color: '#FFFFFF', textAlign: 'center' }}>{c.title}</p>
                <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: '#6E7691', textAlign: 'center' }}>{c.source}</p>
                {c.available ? (
                  <button className="btn-green glow-pulse" style={{ height: 36, paddingLeft: 16, paddingRight: 16, fontSize: 13, width: '100%' }}>Abrir</button>
                ) : (
                  <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: '#6E7691' }}>{c.progress}</p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
