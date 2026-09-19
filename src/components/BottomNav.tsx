import { Home, Gamepad2, Gift, User, Plus } from 'lucide-react'

type Tab = 'home' | 'games' | 'rewards' | 'menu'

interface Props {
  active: Tab
  onChange: (tab: Tab) => void
  onDeposit: () => void
}

const ITEMS: { id: Tab; icon: typeof Home; label: string }[] = [
  { id: 'home', icon: Home, label: 'Início' },
  { id: 'games', icon: Gamepad2, label: 'Jogos' },
  { id: 'rewards', icon: Gift, label: 'Bônus' },
  { id: 'menu', icon: User, label: 'Perfil' },
]

export default function BottomNav({ active, onChange, onDeposit }: Props) {
  return (
    <div style={{
      height: 72,
      background: '#141A2E',
      borderTop: '1px solid rgba(255,255,255,0.06)',
      borderRadius: '32px 32px 0 0',
      display: 'flex',
      alignItems: 'center',
      position: 'relative',
      flexShrink: 0,
    }}>
      {/* Left two items */}
      <div style={{ flex: 1, display: 'flex' }}>
        {ITEMS.slice(0, 2).map(item => {
          const Icon = item.icon
          const isActive = active === item.id
          return (
            <button key={item.id} onClick={() => onChange(item.id)}
              style={{
                flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                gap: 3, background: 'none', border: 'none', cursor: 'pointer', paddingTop: 8, paddingBottom: 4,
              }}>
              <Icon size={22} color={isActive ? '#FFD93D' : '#6E7691'} />
              <span style={{
                fontFamily: 'Inter, sans-serif', fontSize: 10, fontWeight: 600,
                color: isActive ? '#FFD93D' : '#6E7691',
              }}>{item.label}</span>
              {isActive && (
                <div style={{ width: 4, height: 4, borderRadius: '50%', background: '#FFD93D', marginTop: -2 }} />
              )}
            </button>
          )
        })}
      </div>

      {/* Center deposit button */}
      <button onClick={onDeposit}
        style={{
          width: 64, height: 64, borderRadius: '50%',
          background: 'linear-gradient(180deg, #FFE66D 0%, #F2B705 100%)',
          border: 'none', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          position: 'absolute', left: '50%', transform: 'translateX(-50%) translateY(-16px)',
          boxShadow: '0 3px 0 #B98900, 0 8px 24px rgba(255,217,61,0.4)',
          zIndex: 10,
        }}>
        <Plus size={28} color="#1A1400" strokeWidth={2.5} />
      </button>

      {/* Spacer for center */}
      <div style={{ width: 80 }} />

      {/* Right two items */}
      <div style={{ flex: 1, display: 'flex' }}>
        {ITEMS.slice(2).map(item => {
          const Icon = item.icon
          const isActive = active === item.id
          return (
            <button key={item.id} onClick={() => onChange(item.id)}
              style={{
                flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                gap: 3, background: 'none', border: 'none', cursor: 'pointer', paddingTop: 8, paddingBottom: 4,
              }}>
              <Icon size={22} color={isActive ? '#FFD93D' : '#6E7691'} />
              <span style={{
                fontFamily: 'Inter, sans-serif', fontSize: 10, fontWeight: 600,
                color: isActive ? '#FFD93D' : '#6E7691',
              }}>{item.label}</span>
              {isActive && (
                <div style={{ width: 4, height: 4, borderRadius: '50%', background: '#FFD93D', marginTop: -2 }} />
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}
