import { useState } from 'react'
import { ChevronLeft } from 'lucide-react'
import DominoTile from '../components/DominoTile'

interface Props {
  balance: number
  onBack: () => void
  onMatch: () => void
}

const TIERS = [
  { id: 1, name: 'Mesa 1', pot: 100, minBalance: 50, brl: 1 },
  { id: 2, name: 'Mesa 2', pot: 200, minBalance: 100, brl: 2 },
  { id: 3, name: 'Mesa 3', pot: 500, minBalance: 250, brl: 5 },
  { id: 4, name: 'Mesa 4', pot: 1000, minBalance: 500, brl: 10 },
  { id: 5, name: 'Mesa 5', pot: 2000, minBalance: 1000, brl: 20 },
]

export default function LobbyScreen({ balance, onBack, onMatch }: Props) {
  const [selected, setSelected] = useState(2)
  const [searching, setSearching] = useState(false)
  const tier = TIERS.find(t => t.id === selected)!
  const fmt = (n: number) => n.toLocaleString('pt-BR')

  const handlePlay = () => {
    setSearching(true)
    setTimeout(() => { setSearching(false); onMatch() }, 2000)
  }

  return (
    <div className="flex flex-col" style={{ background: '#0D1222', minHeight: '100%' }}>
      <div className="flex items-center justify-between px-4 sticky top-0 z-40"
        style={{ background: '#141A2E', borderBottom: '1px solid rgba(255,255,255,0.06)', height: 56 }}>
        <button onClick={onBack} style={{ width: 44, height: 44, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'none', border: 'none', cursor: 'pointer' }}>
          <ChevronLeft size={24} color="#FFFFFF" />
        </button>
        <span style={{ fontFamily: 'Lilita One, cursive', fontSize: 18, color: '#FFFFFF' }}>Dominó 1v1</span>
        <div style={{
          height: 32, borderRadius: 999, background: '#1B2340',
          border: '1px solid rgba(255,255,255,0.06)',
          display: 'flex', alignItems: 'center', gap: 6, paddingLeft: 10, paddingRight: 10,
        }}>
          <span style={{ fontSize: 14 }}>🪙</span>
          <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 13, color: '#FFFFFF' }}>
            {fmt(balance)}
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-4 px-4 py-4 pb-6">
        {/* Tier selector */}
        <div>
          <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 12, color: '#6E7691', marginBottom: 10 }}>
            ESCOLHA A MESA
          </p>
          <div className="flex gap-2 overflow-x-auto pb-1">
            {TIERS.map(t => {
              const canPlay = balance >= t.minBalance
              return (
                <button key={t.id} onClick={() => canPlay && setSelected(t.id)}
                  style={{
                    flexShrink: 0, width: 120, padding: '12px 14px',
                    borderRadius: 20, border: selected === t.id ? '2px solid #FFD93D' : '1px solid rgba(255,255,255,0.06)',
                    background: selected === t.id ? 'rgba(255,217,61,0.08)' : '#1B2340',
                    cursor: canPlay ? 'pointer' : 'not-allowed',
                    opacity: canPlay ? 1 : 0.4,
                    textAlign: 'left',
                    boxShadow: selected === t.id ? '0 0 20px rgba(255,217,61,0.2)' : 'none',
                    transform: selected === t.id ? 'scale(1.03)' : 'scale(1)',
                    transition: 'all 150ms',
                  }}>
                  <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: '#6E7691', marginBottom: 4 }}>{t.name}</p>
                  <p style={{ fontFamily: 'Lilita One, cursive', fontSize: 18, color: '#FFFFFF' }}>{fmt(t.pot)} BC</p>
                  <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: '#A9B0C6' }}>≈ R$ {t.brl},00</p>
                  {!canPlay && <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 10, color: '#F0424B', marginTop: 4 }}>🔒 Saldo insuf.</p>}
                </button>
              )
            })}
          </div>
        </div>

        {/* Preview card */}
        <div style={{
          height: 220, borderRadius: 24,
          background: 'radial-gradient(ellipse at 50% 30%, #0E7A4B 0%, #063D28 100%)',
          border: '1px solid rgba(255,255,255,0.06)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          gap: 12, position: 'relative', overflow: 'hidden',
        }}>
          {/* Tile decoration */}
          <div style={{ position: 'absolute', top: 16, right: 16, transform: 'rotate(15deg)', opacity: 0.7 }}>
            <DominoTile top={6} bottom={6} size="md" />
          </div>
          <div style={{ position: 'absolute', bottom: 16, left: 16, transform: 'rotate(-10deg)', opacity: 0.5 }}>
            <DominoTile top={3} bottom={4} size="sm" />
          </div>

          <div style={{ textAlign: 'center', zIndex: 1 }}>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: '#A9B0C6', marginBottom: 4 }}>{tier.name}</p>
            <p style={{ fontFamily: 'Lilita One, cursive', fontSize: 36, color: '#FFFFFF' }}>{fmt(tier.pot)} BC</p>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: '#A9B0C6' }}>Comissão: 10% · Você recebe {fmt(Math.floor(tier.pot * 0.9))} BC</p>
          </div>
          <button className="btn-yellow glow-pulse" style={{ height: 52, paddingLeft: 40, paddingRight: 40, fontSize: 18, zIndex: 1 }}
            onClick={handlePlay} disabled={searching}>
            {searching ? 'Procurando…' : 'Jogar'}
          </button>
        </div>

        {/* Secondary options */}
        <div className="flex gap-3">
          <button className="btn-secondary flex-1" style={{ height: 48, fontSize: 14, gap: 8 }}>
            👥 Desafiar amigo
          </button>
          <button className="btn-secondary flex-1" style={{ height: 48, fontSize: 14, gap: 8 }}>
            🤖 Treino
          </button>
        </div>

        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: '#6E7691', textAlign: 'center' }}>
          <span className="live-dot" style={{ width: 6, height: 6, borderRadius: '50%', background: '#3DDB5F', display: 'inline-block', marginRight: 6 }} />
          Mesas abertas: 28 · <span style={{ color: '#3B7BFF', cursor: 'pointer' }}>Regras do dominó</span>
        </p>

        {/* Matchmaking overlay */}
        {searching && (
          <div className="fixed inset-0 sheet-backdrop flex items-center justify-center z-50">
            <div style={{
              background: '#141A2E', borderRadius: 28, padding: '32px 40px',
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16,
              border: '1px solid rgba(255,255,255,0.06)',
            }}>
              <div style={{ display: 'flex', gap: 8 }}>
                {[6, 3, 5, 2, 4].map((n, i) => (
                  <div key={i} style={{
                    animation: `pulse-dot 1.2s ${i * 0.15}s ease-in-out infinite`,
                    transform: 'scale(0.8)',
                  }}>
                    <DominoTile top={n} bottom={n > 3 ? n - 3 : n} size="sm" />
                  </div>
                ))}
              </div>
              <h3 style={{ fontFamily: 'Lilita One, cursive', fontSize: 20, color: '#FFFFFF' }}>
                Procurando adversário…
              </h3>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, color: '#A9B0C6' }}>
                {tier.name} · Pote {fmt(tier.pot)} BC
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
