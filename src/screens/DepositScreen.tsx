import { useState } from 'react'
import { ChevronLeft, Copy } from 'lucide-react'

interface Props { onBack: () => void }

const ASSETS = [
  { id: 'usdt', name: 'USDT', network: 'TRON', icon: '💵', rate: 5.2 },
  { id: 'ton', name: 'TON', network: 'TON', icon: '💎', rate: 28.5 },
]

const ADDRESS = 'TQn9Y2khEsLJW1BzTN5YMWjMu7NER8rm1oG'
const MEMO = ''

export default function DepositScreen({ onBack }: Props) {
  const [asset, setAsset] = useState('usdt')
  const [amount, setAmount] = useState(500)
  const [step, setStep] = useState<'asset' | 'amount' | 'address'>('asset')
  const [copied, setCopied] = useState(false)

  const selected = ASSETS.find(a => a.id === asset)!
  const bcAmount = Math.floor(amount * selected.rate)
  const bonus = Math.floor(bcAmount * 0.1)
  const fmt = (n: number) => n.toLocaleString('pt-BR')

  const copy = () => {
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="flex flex-col" style={{ background: '#0D1222', minHeight: '100%' }}>
      <div className="flex items-center justify-between px-4 sticky top-0 z-40"
        style={{ background: '#141A2E', borderBottom: '1px solid rgba(255,255,255,0.06)', height: 56 }}>
        <button onClick={step === 'asset' ? onBack : () => setStep(step === 'address' ? 'amount' : 'asset')}
          style={{ width: 44, height: 44, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'none', border: 'none', cursor: 'pointer' }}>
          <ChevronLeft size={24} color="#FFFFFF" />
        </button>
        <span style={{ fontFamily: 'Lilita One, cursive', fontSize: 18, color: '#FFFFFF' }}>Depositar</span>
        <div style={{ width: 44 }} />
      </div>

      {/* Progress */}
      <div style={{ padding: '12px 16px', background: '#141A2E' }}>
        <div className="progress-bar" style={{ height: 4 }}>
          <div className="progress-fill" style={{ width: step === 'asset' ? '33%' : step === 'amount' ? '66%' : '100%' }} />
        </div>
        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: '#A9B0C6', marginTop: 4, textAlign: 'center' }}>
          {step === 'asset' ? 'Passo 1: Ativo' : step === 'amount' ? 'Passo 2: Valor' : 'Passo 3: Endereço'}
        </p>
      </div>

      <div className="flex flex-col gap-4 px-4 py-4 pb-6">
        {step === 'asset' && (
          <>
            <h2 style={{ fontFamily: 'Lilita One, cursive', fontSize: 22, color: '#FFFFFF' }}>Escolha o ativo</h2>
            {ASSETS.map(a => (
              <button key={a.id} onClick={() => { setAsset(a.id); setStep('amount') }}
                className="card flex items-center gap-4 text-left"
                style={{ padding: 20, cursor: 'pointer', border: asset === a.id ? '2px solid #FFD93D' : undefined }}>
                <span style={{ fontSize: 36 }}>{a.icon}</span>
                <div className="flex-1">
                  <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 16, color: '#FFFFFF' }}>
                    {a.name}
                  </p>
                  <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: '#6E7691', marginTop: 2 }}>
                    Rede {a.network}
                  </p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: '#A9B0C6' }}>
                    1 {a.name} ≈ {fmt(Math.floor(a.rate * 100))} BC
                  </p>
                </div>
              </button>
            ))}
          </>
        )}

        {step === 'amount' && (
          <>
            <h2 style={{ fontFamily: 'Lilita One, cursive', fontSize: 22, color: '#FFFFFF' }}>Valor do depósito</h2>
            <div className="card" style={{ padding: 20 }}>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: '#6E7691', marginBottom: 8 }}>Quantidade ({selected.name})</p>
              <div className="flex items-baseline gap-2 mb-2">
                <input type="number" value={amount} onChange={e => setAmount(Number(e.target.value))}
                  style={{
                    flex: 1, background: 'none', border: 'none', outline: 'none',
                    fontFamily: 'Lilita One, cursive', fontSize: 32, color: '#FFFFFF',
                  }} />
                <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 18, color: '#A9B0C6' }}>{selected.name}</span>
              </div>
              <div className="flex gap-2">
                {[10, 50, 100, 500].map(v => (
                  <button key={v} onClick={() => setAmount(v)} className="btn-secondary flex-1"
                    style={{ height: 32, fontSize: 12, border: amount === v ? '1px solid #FFD93D' : undefined }}>
                    {v}
                  </button>
                ))}
              </div>
            </div>

            <div className="card" style={{ padding: 16 }}>
              {[
                ['Você recebe', `${fmt(bcAmount)} BC`, '#FFFFFF'],
                ['Bônus +10%', `+${fmt(bonus)} BC`, '#3DDB5F'],
                ['Total', `${fmt(bcAmount + bonus)} BC`, '#FFD93D'],
              ].map(([k, v, c], i) => (
                <div key={i} className="flex justify-between py-2"
                  style={{ borderTop: i > 0 ? '1px solid rgba(255,255,255,0.04)' : 'none' }}>
                  <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: '#A9B0C6' }}>{k}</span>
                  <span style={{ fontFamily: 'Lilita One, cursive', fontSize: 14, color: c }}>{v}</span>
                </div>
              ))}
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: '#6E7691', marginTop: 8 }}>
                * Bônus exige aposta de 3× antes do saque
              </p>
            </div>

            <button className="btn-yellow" style={{ height: 52, fontSize: 17 }} onClick={() => setStep('address')}>
              Continuar
            </button>
          </>
        )}

        {step === 'address' && (
          <>
            <h2 style={{ fontFamily: 'Lilita One, cursive', fontSize: 22, color: '#FFFFFF' }}>Endereço de depósito</h2>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: '#A9B0C6' }}>
              Envie apenas <strong style={{ color: '#FFFFFF' }}>{selected.name}</strong> para o endereço abaixo. Outros ativos serão perdidos.
            </p>

            {/* QR placeholder */}
            <div className="card flex flex-col items-center" style={{ padding: 20 }}>
              <div style={{
                width: 160, height: 160, background: '#FFFFFF', borderRadius: 12,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                marginBottom: 16,
              }}>
                <span style={{ fontSize: 80 }}>{selected.icon}</span>
              </div>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: '#6E7691', marginBottom: 6 }}>
                Endereço {selected.name} · Rede {selected.network}
              </p>
              <div style={{
                background: '#1B2340', borderRadius: 12, padding: '10px 14px',
                display: 'flex', alignItems: 'center', gap: 8, width: '100%',
              }}>
                <span style={{ fontFamily: 'monospace', fontSize: 12, color: '#A9B0C6', flex: 1, wordBreak: 'break-all' }}>
                  {ADDRESS.slice(0, 16)}…{ADDRESS.slice(-8)}
                </span>
                <button onClick={copy} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                  {copied ? <span style={{ fontSize: 14, color: '#3DDB5F' }}>✓</span> : <Copy size={16} color="#A9B0C6" />}
                </button>
              </div>
            </div>

            {/* Timer */}
            <div style={{ textAlign: 'center' }}>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: '#FFD93D' }}>
                Cotação válida por 14:48
              </p>
            </div>

            {/* Status stepper */}
            <div className="card" style={{ padding: 16 }}>
              {[
                { label: 'Aguardando pagamento', active: true },
                { label: 'Detectado (0/3 confirmações)' },
                { label: 'Creditado' },
              ].map((s, i) => (
                <div key={i} className="flex gap-4" style={{ marginBottom: i < 2 ? 16 : 0 }}>
                  <div className="flex flex-col items-center">
                    <div style={{
                      width: 24, height: 24, borderRadius: '50%',
                      background: s.active ? 'rgba(255,217,61,0.2)' : '#1B2340',
                      border: s.active ? '2px solid #FFD93D' : '1px solid rgba(255,255,255,0.08)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      boxShadow: s.active ? '0 0 12px rgba(255,217,61,0.4)' : 'none',
                    }}>
                      {s.active && <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#FFD93D', animation: 'pulse-dot 1.5s ease-in-out infinite' }} />}
                    </div>
                    {i < 2 && <div style={{ width: 2, flex: 1, background: 'rgba(255,255,255,0.08)', minHeight: 16, marginTop: 4 }} />}
                  </div>
                  <div style={{ paddingTop: 2 }}>
                    <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, color: s.active ? '#FFFFFF' : '#6E7691' }}>
                      {s.label}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <button className="btn-yellow" style={{ height: 52, fontSize: 17 }}>
              Já paguei
            </button>
          </>
        )}
      </div>
    </div>
  )
}
