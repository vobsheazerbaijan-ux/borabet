import { useState, useEffect } from 'react'
import { ChevronLeft, Volume2, Info, Pause } from 'lucide-react'

interface Props { onBack: () => void; onDeposit: () => void }

type Risk = 'low' | 'med' | 'high'
type Mode = 'manual' | 'auto'

const MULTIPLIERS: Record<Risk, number[]> = {
  low:  [5.6, 2.1, 1.1, 1.0, 0.5, 1.0, 1.1, 2.1, 5.6],
  med:  [13, 3, 1.3, 0.7, 0.4, 0.7, 1.3, 3, 13],
  high: [29, 4, 1.5, 0.3, 0.2, 0.3, 1.5, 4, 29],
}
const BIN_COLORS = ['#8B4DFF', '#5B3DF5', '#3B7BFF', '#FFD93D', '#F2B705', '#FFD93D', '#3B7BFF', '#5B3DF5', '#8B4DFF']

export default function PlinkoScreen({ onBack, onDeposit }: Props) {
  const [bet, setBet] = useState(50)
  const [risk, setRisk] = useState<Risk>('med')
  const [mode, setMode] = useState<Mode>('manual')
  const [balance, setBalance] = useState(2480)
  const [history, setHistory] = useState<{ m: number; win: boolean }[]>([])
  const [dropping, setDropping] = useState(false)
  const [lastBin, setLastBin] = useState<number | null>(null)
  const [auto, setAuto] = useState({ count: 0, stopProfit: 0, stopLoss: 0 })

  const mults = MULTIPLIERS[risk]

  const drop = () => {
    if (balance < bet) return
    setDropping(true)
    setBalance(b => b - bet)
    const bin = Math.floor(Math.random() * mults.length)
    const m = mults[bin]
    setLastBin(bin)
    setTimeout(() => {
      setDropping(false)
      const win = m >= 1
      setHistory(h => [{ m, win }, ...h].slice(0, 20))
      if (win) setBalance(b => b + Math.floor(bet * m))
    }, 2200)
  }

  useEffect(() => {
    if (mode === 'auto' && auto.count > 0 && !dropping) {
      const t = setTimeout(() => { drop(); setAuto(a => ({ ...a, count: a.count - 1 })) }, 400)
      return () => clearTimeout(t)
    }
  }, [mode, auto.count, dropping])

  return (
    <div className="flex flex-col" style={{ background: '#0D1222', minHeight: '100%' }}>
      <div className="flex items-center justify-between px-4 sticky top-0 z-40"
        style={{ background: '#141A2E', borderBottom: '1px solid rgba(255,255,255,0.06)', height: 56 }}>
        <button onClick={onBack} style={{ width: 44, height: 44, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'none', border: 'none', cursor: 'pointer' }} aria-label="Voltar">
          <ChevronLeft size={24} color="#FFFFFF" />
        </button>
        <span style={{ fontFamily: 'Lilita One, cursive', fontSize: 18, color: '#FFFFFF' }}>Plinko</span>
        <div className="flex items-center gap-1">
          <button style={{ width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'none', border: 'none', cursor: 'pointer' }}>
            <Volume2 size={18} color="#A9B0C6" />
          </button>
          <button style={{ width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'none', border: 'none', cursor: 'pointer' }}>
            <Pause size={18} color="#A9B0C6" />
          </button>
          <button style={{ width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'none', border: 'none', cursor: 'pointer' }}>
            <Info size={18} color="#A9B0C6" />
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between px-4 py-2"
        style={{ background: '#0D1222', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
        <div className="flex items-center gap-2">
          <span style={{ fontSize: 14 }}>🪙</span>
          <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 14, color: '#FFFFFF' }}>
            {balance.toLocaleString('pt-BR')} BC
          </span>
        </div>
        <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: '#6E7691' }}>
          Sessão: <span style={{ color: '#3DDB5F' }}>+120 BC</span>
        </span>
      </div>

      {/* Board */}
      <div className="relative" style={{ background: 'radial-gradient(ellipse at 50% 30%, #1C1466 0%, #0A0820 100%)', height: 380 }}>
        <svg viewBox="0 0 360 380" style={{ width: '100%', height: '100%' }}>
          {Array.from({ length: 9 }, (_, row) =>
            Array.from({ length: row + 2 }, (_, col) => {
              const x = 180 + (col - (row + 1) / 2) * 32
              const y = 40 + row * 34
              return <circle key={`${row}-${col}`} cx={x} cy={y} r="2.5" fill="#FFFFFF" opacity="0.5" />
            })
          )}
          {mults.map((m, i) => {
            const x = 20 + i * 40
            return (
              <g key={i}>
                <rect x={x} y={350} width={36} height={22} rx={6} fill={BIN_COLORS[i]}
                  opacity={lastBin === i ? 1 : 0.75}
                  style={{ filter: lastBin === i ? `drop-shadow(0 0 10px ${BIN_COLORS[i]})` : 'none' }} />
                <text x={x + 18} y={365} textAnchor="middle" fontSize="10"
                  fontFamily="Lilita One" fill="#0D1222" fontWeight="bold">
                  {m}×
                </text>
              </g>
            )
          })}
          {dropping && (
            <circle cx="180" cy="80" r="7" fill="#FFD93D"
              style={{ filter: 'drop-shadow(0 0 12px #FFD93D)' }}>
              <animate attributeName="cy" from="40" to="350" dur="2.2s" fill="freeze" />
              <animate attributeName="cx" values="180;196;164;180;196;180;212;180" dur="2.2s" fill="freeze" />
            </circle>
          )}
        </svg>
      </div>

      {/* History strip */}
      <div className="flex gap-1 px-4 py-2 overflow-x-auto"
        style={{ background: '#0D1222', borderTop: '1px solid rgba(255,255,255,0.04)', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
        {history.length === 0 && (
          <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: '#6E7691' }}>Sem resultados ainda</span>
        )}
        {history.map((h, i) => (
          <span key={i} style={{
            flexShrink: 0, padding: '2px 8px', borderRadius: 8,
            background: h.win ? 'rgba(61,219,95,0.15)' : 'rgba(240,66,75,0.15)',
            color: h.win ? '#3DDB5F' : '#F0424B',
            fontFamily: 'Inter, sans-serif', fontSize: 11, fontWeight: 600,
          }}>{h.m}×</span>
        ))}
      </div>

      {/* Bet panel */}
      <div className="flex flex-col gap-3 px-4 py-4 pb-8">
        <div className="flex gap-2">
          {(['manual', 'auto'] as const).map(m => (
            <button key={m} onClick={() => setMode(m)}
              style={{
                flex: 1, height: 36, borderRadius: 999,
                background: mode === m ? '#FFD93D' : '#1B2340',
                border: mode === m ? 'none' : '1px solid rgba(255,255,255,0.06)',
                color: mode === m ? '#1A1400' : '#A9B0C6',
                fontFamily: mode === m ? 'Lilita One, cursive' : 'Inter, sans-serif',
                fontSize: 13, fontWeight: 600, cursor: 'pointer',
              }}>{m === 'manual' ? 'Manual' : 'Auto'}</button>
          ))}
        </div>

        <div style={{ background: '#1B2340', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 16, padding: '12px 16px' }}>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: '#6E7691', marginBottom: 6 }}>Aposta (BC)</p>
          <div className="flex items-center gap-2">
            <button onClick={() => setBet(b => Math.max(1, Math.floor(b / 2)))}
              style={{ width: 32, height: 32, borderRadius: 8, background: '#141A2E', border: 'none', color: '#FFF', cursor: 'pointer' }}>½</button>
            <input type="number" value={bet} onChange={e => setBet(Number(e.target.value))}
              style={{ flex: 1, background: 'none', border: 'none', outline: 'none',
                fontFamily: 'Lilita One, cursive', fontSize: 22, color: '#FFFFFF', textAlign: 'center' }} />
            <button onClick={() => setBet(b => b * 2)}
              style={{ width: 32, height: 32, borderRadius: 8, background: '#141A2E', border: 'none', color: '#FFF', cursor: 'pointer' }}>2×</button>
          </div>
          <div className="flex gap-2 mt-2">
            {[10, 50, 100, 500].map(v => (
              <button key={v} onClick={() => setBet(v)} className="btn-secondary flex-1"
                style={{ height: 30, fontSize: 12 }}>{v}</button>
            ))}
          </div>
        </div>

        <div>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: '#6E7691', marginBottom: 6 }}>Risco</p>
          <div className="flex gap-2">
            {(['low', 'med', 'high'] as const).map(r => (
              <button key={r} onClick={() => setRisk(r)}
                style={{
                  flex: 1, height: 36, borderRadius: 999,
                  background: risk === r ? '#3B7BFF' : '#1B2340',
                  border: risk === r ? 'none' : '1px solid rgba(255,255,255,0.06)',
                  color: risk === r ? '#FFF' : '#A9B0C6',
                  fontFamily: 'Inter, sans-serif', fontSize: 13, fontWeight: 600, cursor: 'pointer',
                }}>{r === 'low' ? 'Baixo' : r === 'med' ? 'Médio' : 'Alto'}</button>
            ))}
          </div>
        </div>

        {mode === 'auto' && (
          <div className="card-sm" style={{ padding: 14 }}>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: '#6E7691', marginBottom: 6 }}>
              Número de rodadas
            </p>
            <div className="flex gap-2">
              {[10, 25, 50, 100].map(n => (
                <button key={n} onClick={() => setAuto(a => ({ ...a, count: n }))}
                  className="btn-secondary flex-1"
                  style={{ height: 32, fontSize: 12, border: auto.count === n ? '1px solid #FFD93D' : undefined }}>{n}</button>
              ))}
            </div>
          </div>
        )}

        {balance < bet ? (
          <button className="btn-yellow" style={{ height: 56, fontSize: 17 }} onClick={onDeposit}>
            Saldo insuficiente · Depositar
          </button>
        ) : (
          <button className="btn-yellow glow-pulse" disabled={dropping}
            style={{ height: 56, fontSize: 18 }} onClick={drop}>
            {dropping ? 'Caindo…' : mode === 'auto' ? `Soltar ${auto.count || 10} bolas` : 'Soltar bola'}
          </button>
        )}
      </div>
    </div>
  )
}
