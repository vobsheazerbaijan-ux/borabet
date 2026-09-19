import { ChevronLeft } from 'lucide-react'

interface Props {
  balance: number
  onBack: () => void
  onWallet: () => void
  onFriends: () => void
  onSettings: () => void
  onResponsible: () => void
  onSupport: () => void
}

const STATS = [
  { label: 'Partidas', value: '148' },
  { label: 'Vitórias', value: '89' },
  { label: 'Maior pote', value: '2.000' },
  { label: 'Sequência', value: '5' },
]

const BADGES = [
  { icon: '🏆', label: 'Campeão' },
  { icon: '🔥', label: '7 dias' },
  { icon: '💎', label: 'VIP' },
  { icon: '🎯', label: 'Preciso' },
  { icon: '⚡', label: 'Rápido' },
  { icon: '🌟', label: 'Top 10' },
  { icon: '🦁', label: 'Veterano', locked: true },
  { icon: '👑', label: 'Lenda', locked: true },
  { icon: '🎲', label: '500 jogos', locked: true },
  { icon: '💰', label: '10k BC', locked: true },
]

export default function ProfileScreen({ balance, onBack, onWallet, onFriends, onSettings, onResponsible, onSupport }: Props) {
  const fmt = (n: number) => n.toLocaleString('pt-BR')

  return (
    <div className="flex flex-col" style={{ background: '#0D1222', minHeight: '100%' }}>
      <div className="flex items-center justify-between px-4 sticky top-0 z-40"
        style={{ background: '#141A2E', borderBottom: '1px solid rgba(255,255,255,0.06)', height: 56 }}>
        <button onClick={onBack} style={{ width: 44, height: 44, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'none', border: 'none', cursor: 'pointer' }}>
          <ChevronLeft size={24} color="#FFFFFF" />
        </button>
        <span style={{ fontFamily: 'Lilita One, cursive', fontSize: 18, color: '#FFFFFF' }}>Perfil</span>
        <div style={{ width: 44 }} />
      </div>

      <div className="flex flex-col gap-4 px-4 py-4 pb-6">
        {/* Hero */}
        <div className="card" style={{ padding: 20, position: 'relative', overflow: 'hidden' }}>
          <div style={{
            position: 'absolute', inset: 0,
            background: 'radial-gradient(ellipse at 50% 0%, rgba(255,217,61,0.08) 0%, transparent 60%)',
          }} />
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, position: 'relative' }}>
            <div style={{ fontSize: 72, lineHeight: 1 }}>🐆</div>
            <div style={{
              width: 80, height: 80, borderRadius: '50%', background: '#1B2340',
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 40,
              border: '3px solid #D4A017',
              marginTop: -20,
              boxShadow: '0 0 20px rgba(212,160,23,0.4)',
            }}>🦁</div>
            <div style={{ textAlign: 'center' }}>
              <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 18, color: '#FFFFFF' }}>
                Carlos Mendes
              </p>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: '#6E7691' }}>@carlos_m</p>
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: 4, marginTop: 6,
                background: 'rgba(255,217,61,0.1)', borderRadius: 999, padding: '4px 12px',
                border: '1px solid rgba(255,217,61,0.3)',
              }}>
                <span style={{ fontSize: 12 }}>👑</span>
                <span style={{ fontFamily: 'Lilita One, cursive', fontSize: 13, color: '#FFD93D' }}>Craque · Nível 12</span>
              </div>
            </div>
            {/* XP bar */}
            <div style={{ width: '100%', maxWidth: 240 }}>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: '62%' }} />
              </div>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: '#6E7691', textAlign: 'center', marginTop: 4 }}>
                1.250 / 2.000 XP
              </p>
            </div>
          </div>
        </div>

        {/* Balance card */}
        <button className="card flex items-center gap-4 w-full text-left" style={{ padding: 16, cursor: 'pointer' }} onClick={onWallet}>
          <span style={{ fontSize: 32 }}>🪙</span>
          <div className="flex-1">
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: '#6E7691' }}>Saldo</p>
            <p style={{ fontFamily: 'Lilita One, cursive', fontSize: 24, color: '#FFFFFF' }}>{fmt(balance)} BC</p>
          </div>
          <div className="flex flex-col gap-2">
            <button className="btn-yellow" style={{ height: 36, paddingLeft: 16, paddingRight: 16, fontSize: 13 }} onClick={e => { e.stopPropagation(); onWallet() }}>
              Carteira
            </button>
          </div>
        </button>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: 8 }}>
          {STATS.map((s, i) => (
            <div key={i} className="card-sm flex flex-col items-center" style={{ padding: '12px 8px' }}>
              <p style={{ fontFamily: 'Lilita One, cursive', fontSize: 16, color: '#FFFFFF' }}>{s.value}</p>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 10, color: '#6E7691', marginTop: 2, textAlign: 'center' }}>{s.label}</p>
            </div>
          ))}
        </div>

        {/* Badges */}
        <div className="card" style={{ padding: 16 }}>
          <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 13, color: '#FFFFFF', marginBottom: 12 }}>
            Conquistas
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 8 }}>
            {BADGES.map((b, i) => (
              <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, opacity: b.locked ? 0.3 : 1 }}>
                <div style={{
                  width: 48, height: 48, borderRadius: '50%', background: '#1B2340',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24,
                  border: !b.locked ? '2px solid rgba(255,217,61,0.4)' : '1px solid rgba(255,255,255,0.06)',
                  position: 'relative',
                }}>
                  {b.icon}
                  {b.locked && <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.4)', borderRadius: '50%', fontSize: 16 }}>🔒</div>}
                </div>
                <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 9, color: '#6E7691', textAlign: 'center' }}>{b.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Action menu */}
        <div className="card" style={{ padding: 0 }}>
          {[
            { icon: '👥', label: 'Amigos e indicações', action: onFriends },
            { icon: '🎧', label: 'Suporte', action: onSupport },
            { icon: '⚙️', label: 'Configurações', action: onSettings },
          ].map((item, i) => (
            <button key={i} onClick={item.action}
              className="flex items-center gap-3 w-full text-left"
              style={{
                padding: '14px 20px',
                borderTop: i > 0 ? '1px solid rgba(255,255,255,0.04)' : 'none',
                background: 'none', border: 'none', cursor: 'pointer',
              }}>
              <span style={{ fontSize: 18 }}>{item.icon}</span>
              <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, color: '#FFFFFF', flex: 1 }}>{item.label}</span>
              <span style={{ color: '#6E7691', fontSize: 16 }}>›</span>
            </button>
          ))}
        </div>

        {/* Responsible play */}
        <button className="card-sm flex items-center gap-3 w-full text-left" style={{ padding: 14, cursor: 'pointer', border: '1px solid rgba(255,217,61,0.2)' }} onClick={onResponsible}>
          <span style={{ fontSize: 22 }}>🛡️</span>
          <div className="flex-1">
            <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 14, color: '#FFFFFF' }}>Jogo responsável</p>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: '#6E7691', marginTop: 2 }}>Limites, pausas e autoexclusão</p>
          </div>
          <span style={{ color: '#6E7691', fontSize: 16 }}>›</span>
        </button>

        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: '#6E7691', textAlign: 'center' }}>
          BoraBet · 18+ · Jogo responsável
        </p>
      </div>
    </div>
  )
}
