import { useState } from 'react'
import { ChevronLeft, Plus } from 'lucide-react'

interface Props { onBack: () => void; onKyc: () => void }

type Status = 'idle' | 'requested' | 'review' | 'sent' | 'done'

const SAVED = [
  { id: 1, asset: 'USDT', network: 'TRON', address: 'TQn9Y2kh…Rm1oG', verified: true },
  { id: 2, asset: 'TON', network: 'TON', address: 'UQBF…z7Kq', verified: true },
]

export default function WithdrawScreen({ onBack, onKyc }: Props) {
  const [kycVerified] = useState(false)
  const [amount, setAmount] = useState(1000)
  const [selected, setSelected] = useState<number | null>(1)
  const [status, setStatus] = useState<Status>('idle')

  const fmt = (n: number) => n.toLocaleString('pt-BR')
  const fmtBRL = (n: number) => (n / 100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
  const fee = 20
  const receive = amount - fee

  if (!kycVerified) {
    return (
      <div className="flex flex-col" style={{ background: '#0D1222', minHeight: '100%' }}>
        <div className="flex items-center justify-between px-4 sticky top-0 z-40"
          style={{ background: '#141A2E', borderBottom: '1px solid rgba(255,255,255,0.06)', height: 56 }}>
          <button onClick={onBack} style={{ width: 44, height: 44, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'none', border: 'none', cursor: 'pointer' }}>
            <ChevronLeft size={24} color="#FFFFFF" />
          </button>
          <span style={{ fontFamily: 'Lilita One, cursive', fontSize: 18, color: '#FFFFFF' }}>Sacar</span>
          <div style={{ width: 44 }} />
        </div>
        <div className="flex-1 flex flex-col items-center justify-center gap-4 px-6" style={{ paddingTop: 80 }}>
          <span style={{ fontSize: 64 }}>🔒</span>
          <h2 style={{ fontFamily: 'Lilita One, cursive', fontSize: 24, color: '#FFFFFF', textAlign: 'center' }}>
            Verifique sua conta
          </h2>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, color: '#A9B0C6', textAlign: 'center', maxWidth: 300 }}>
            Para sacar, precisamos confirmar sua identidade. Leva cerca de 2 minutos.
          </p>
          <button className="btn-yellow" style={{ height: 52, paddingLeft: 32, paddingRight: 32, fontSize: 16, marginTop: 12 }} onClick={onKyc}>
            Verificar conta
          </button>
        </div>
      </div>
    )
  }

  if (status !== 'idle') {
    const steps: { id: Status; label: string; desc: string; time?: string }[] = [
      { id: 'requested', label: 'Solicitado', desc: 'Aguardando processamento', time: 'Agora' },
      { id: 'review', label: 'Em análise', desc: 'Normalmente até 30 min' },
      { id: 'sent', label: 'Enviado', desc: 'TX: 0xa3f…9c2' },
      { id: 'done', label: 'Concluído', desc: 'Crédito na sua carteira' },
    ]
    const order: Status[] = ['requested', 'review', 'sent', 'done']
    const idx = order.indexOf(status)

    return (
      <div className="flex flex-col" style={{ background: '#0D1222', minHeight: '100%' }}>
        <div className="flex items-center justify-between px-4 sticky top-0 z-40"
          style={{ background: '#141A2E', borderBottom: '1px solid rgba(255,255,255,0.06)', height: 56 }}>
          <button onClick={onBack} style={{ width: 44, height: 44, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'none', border: 'none', cursor: 'pointer' }}>
            <ChevronLeft size={24} color="#FFFFFF" />
          </button>
          <span style={{ fontFamily: 'Lilita One, cursive', fontSize: 18, color: '#FFFFFF' }}>Saque</span>
          <div style={{ width: 44 }} />
        </div>
        <div className="flex flex-col gap-4 px-4 py-4 pb-6">
          <h3 style={{ fontFamily: 'Lilita One, cursive', fontSize: 20, color: '#FFFFFF' }}>Status do saque</h3>
          <div className="card" style={{ padding: 20 }}>
            {steps.map((s, i) => {
              const done = order.indexOf(s.id) < idx
              const active = s.id === status
              return (
                <div key={s.id} className="flex gap-4" style={{ marginBottom: i < steps.length - 1 ? 20 : 0 }}>
                  <div className="flex flex-col items-center">
                    <div style={{
                      width: 24, height: 24, borderRadius: '50%',
                      background: done ? '#3DDB5F' : active ? '#FFD93D' : '#1B2340',
                      border: active ? '2px solid #FFD93D' : 'none',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      boxShadow: active ? '0 0 12px rgba(255,217,61,0.4)' : done ? '0 0 8px rgba(61,219,95,0.3)' : 'none',
                    }}>{done && <span style={{ fontSize: 12, color: '#0A2416' }}>✓</span>}</div>
                    {i < steps.length - 1 && (
                      <div style={{ width: 2, flex: 1, background: done ? '#3DDB5F' : 'rgba(255,255,255,0.08)', minHeight: 20, marginTop: 4 }} />
                    )}
                  </div>
                  <div style={{ paddingTop: 2 }}>
                    <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500, fontSize: 14,
                      color: active ? '#FFFFFF' : done ? '#3DDB5F' : '#6E7691' }}>{s.label}</p>
                    <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: '#6E7691', marginTop: 2 }}>
                      {s.desc}{s.time && ` · ${s.time}`}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
          {status === 'requested' && (
            <button className="btn-secondary" style={{ height: 48 }}>Cancelar solicitação</button>
          )}
          {status === 'done' && (
            <button className="btn-yellow" style={{ height: 52, fontSize: 17 }} onClick={onBack}>Voltar à carteira</button>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col" style={{ background: '#0D1222', minHeight: '100%' }}>
      <div className="flex items-center justify-between px-4 sticky top-0 z-40"
        style={{ background: '#141A2E', borderBottom: '1px solid rgba(255,255,255,0.06)', height: 56 }}>
        <button onClick={onBack} style={{ width: 44, height: 44, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'none', border: 'none', cursor: 'pointer' }}>
          <ChevronLeft size={24} color="#FFFFFF" />
        </button>
        <span style={{ fontFamily: 'Lilita One, cursive', fontSize: 18, color: '#FFFFFF' }}>Sacar</span>
        <div style={{ width: 44 }} />
      </div>

      <div className="flex flex-col gap-4 px-4 py-4 pb-6">
        <div className="card" style={{ padding: 20 }}>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: '#6E7691', marginBottom: 8 }}>Quanto deseja sacar?</p>
          <div className="flex items-center gap-2 mb-2">
            <input type="number" value={amount} onChange={e => setAmount(Number(e.target.value))}
              style={{ flex: 1, background: 'none', border: 'none', outline: 'none',
                fontFamily: 'Lilita One, cursive', fontSize: 32, color: '#FFFFFF' }} />
            <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 18, color: '#A9B0C6' }}>BC</span>
          </div>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: '#A9B0C6', marginBottom: 12 }}>≈ {fmtBRL(amount)}</p>
          <div className="flex gap-2">
            {[500, 1000, 2000, 5000].map(v => (
              <button key={v} onClick={() => setAmount(v)} className="btn-secondary flex-1"
                style={{ height: 32, fontSize: 12, border: amount === v ? '1px solid #FFD93D' : undefined }}>
                {fmt(v)}
              </button>
            ))}
          </div>
        </div>

        <div>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: '#6E7691', marginBottom: 8 }}>Endereço de destino</p>
          {SAVED.map(s => (
            <button key={s.id} onClick={() => setSelected(s.id)}
              className="card-sm flex items-center gap-3 w-full text-left"
              style={{ padding: 14, marginBottom: 8, cursor: 'pointer',
                border: selected === s.id ? '2px solid #FFD93D' : undefined }}>
              <span style={{ fontSize: 24 }}>{s.asset === 'USDT' ? '💵' : '💎'}</span>
              <div className="flex-1">
                <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 14, color: '#FFFFFF' }}>
                  {s.asset} · {s.network}
                </p>
                <p style={{ fontFamily: 'monospace', fontSize: 12, color: '#6E7691', marginTop: 2 }}>{s.address}</p>
              </div>
              {s.verified && <span style={{ fontSize: 12, color: '#3DDB5F' }}>✓</span>}
            </button>
          ))}
          <button className="card-sm flex items-center gap-2 w-full"
            style={{ padding: 14, cursor: 'pointer', borderStyle: 'dashed' }}>
            <Plus size={16} color="#A9B0C6" />
            <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, color: '#A9B0C6' }}>
              Novo endereço (aguarda 24h)
            </span>
          </button>
        </div>

        <div className="card" style={{ padding: 16 }}>
          {[
            ['Valor solicitado', `${fmt(amount)} BC`],
            ['Taxa de rede', `−${fmt(fee)} BC`],
            ['Você recebe', `${fmt(receive)} BC`],
            ['Cotação', '100 BC = R$ 1,00'],
          ].map(([k, v], i) => (
            <div key={i} className="flex justify-between py-2"
              style={{ borderTop: i > 0 ? '1px solid rgba(255,255,255,0.04)' : 'none' }}>
              <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: '#A9B0C6' }}>{k}</span>
              <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 13,
                color: i === 2 ? '#3DDB5F' : '#FFFFFF', fontWeight: 600 }}>{v}</span>
            </div>
          ))}
        </div>

        <button className="btn-yellow" style={{ height: 52, fontSize: 17 }}
          onClick={() => {
            setStatus('requested')
            setTimeout(() => setStatus('review'), 2000)
            setTimeout(() => setStatus('sent'), 5000)
            setTimeout(() => setStatus('done'), 8000)
          }}>
          Solicitar saque
        </button>
      </div>
    </div>
  )
}
