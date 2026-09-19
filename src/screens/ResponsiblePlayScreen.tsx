import { ChevronLeft } from 'lucide-react'
import { useState } from 'react'

interface Props { onBack: () => void }

const LIMITS = [
  { id: 'depDay', label: 'Limite de depósito diário', value: '2.000 BC' },
  { id: 'depWeek', label: 'Limite de depósito semanal', value: '10.000 BC' },
  { id: 'depMonth', label: 'Limite de depósito mensal', value: '40.000 BC' },
  { id: 'lossDay', label: 'Limite de perda diária', value: 'Não definido' },
]

const PAUSES = [
  { id: 'p24', label: 'Pausa de 24 horas' },
  { id: 'p7', label: 'Pausa de 7 dias' },
  { id: 'p30', label: 'Pausa de 30 dias' },
]

const EXCLUSIONS = [
  { id: 'x6', label: '6 meses' },
  { id: 'x1', label: '1 ano' },
  { id: 'xp', label: 'Permanente' },
]

export default function ResponsiblePlayScreen({ onBack }: Props) {
  const [confirm, setConfirm] = useState<{ type: 'pause' | 'exclude'; label: string } | null>(null)
  const [reality, setReality] = useState(60)

  return (
    <div className="flex flex-col" style={{ background: '#0D1222', minHeight: '100%' }}>
      <div className="flex items-center justify-between px-4 sticky top-0 z-40"
        style={{ background: '#141A2E', borderBottom: '1px solid rgba(255,255,255,0.06)', height: 56 }}>
        <button onClick={onBack} style={{ width: 44, height: 44, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'none', border: 'none', cursor: 'pointer' }}>
          <ChevronLeft size={24} color="#FFFFFF" />
        </button>
        <span style={{ fontFamily: 'Lilita One, cursive', fontSize: 18, color: '#FFFFFF' }}>Jogo responsável</span>
        <div style={{ width: 44 }} />
      </div>

      <div className="flex flex-col gap-4 px-4 py-4 pb-6">
        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: '#A9B0C6' }}>
          Você está no controle. Jogue com moderação. Se o jogo deixar de ser diversão, use as ferramentas abaixo.
        </p>

        <div className="card" style={{ padding: 16 }}>
          <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 14, color: '#FFFFFF', marginBottom: 8 }}>Limites</p>
          {LIMITS.map((l, i) => (
            <button key={l.id} className="flex items-center justify-between w-full text-left py-3"
              style={{ borderTop: i > 0 ? '1px solid rgba(255,255,255,0.04)' : 'none',
                background: 'none', border: 'none', cursor: 'pointer' }}>
              <div>
                <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, color: '#FFFFFF' }}>{l.label}</p>
                <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: '#6E7691', marginTop: 2 }}>{l.value}</p>
              </div>
              <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: '#3B7BFF' }}>Editar</span>
            </button>
          ))}
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: '#6E7691', marginTop: 8 }}>
            Reduções aplicam imediatamente. Aumentos entram em vigor após 24h.
          </p>
        </div>

        <div className="card" style={{ padding: 16 }}>
          <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 14, color: '#FFFFFF', marginBottom: 8 }}>Alerta de tempo real</p>
          <div className="flex gap-2">
            {[30, 60, 120].map(v => (
              <button key={v} onClick={() => setReality(v)}
                style={{
                  flex: 1, height: 36, borderRadius: 999,
                  background: reality === v ? '#FFD93D' : '#1B2340',
                  border: reality === v ? 'none' : '1px solid rgba(255,255,255,0.06)',
                  color: reality === v ? '#1A1400' : '#A9B0C6',
                  fontFamily: reality === v ? 'Lilita One, cursive' : 'Inter, sans-serif',
                  fontSize: 13, fontWeight: 600, cursor: 'pointer',
                }}>{v} min</button>
            ))}
          </div>
        </div>

        <div className="card" style={{ padding: 16 }}>
          <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 14, color: '#FFFFFF', marginBottom: 8 }}>Fazer uma pausa</p>
          {PAUSES.map((p, i) => (
            <button key={p.id} onClick={() => setConfirm({ type: 'pause', label: p.label })}
              className="flex items-center justify-between w-full text-left py-3"
              style={{ background: 'none', border: 'none', cursor: 'pointer',
                borderTop: i > 0 ? '1px solid rgba(255,255,255,0.04)' : 'none' }}>
              <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, color: '#FFFFFF' }}>{p.label}</span>
              <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: '#FFD93D' }}>Iniciar</span>
            </button>
          ))}
        </div>

        <div className="card" style={{ padding: 16, border: '1px solid rgba(240,66,75,0.3)' }}>
          <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 14, color: '#F0424B', marginBottom: 4 }}>Autoexclusão</p>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: '#6E7691', marginBottom: 10 }}>
            Bloqueia sua conta de todas as atividades com dinheiro real. Não pode ser revertida antes do prazo.
          </p>
          {EXCLUSIONS.map((p, i) => (
            <button key={p.id} onClick={() => setConfirm({ type: 'exclude', label: p.label })}
              className="flex items-center justify-between w-full text-left py-3"
              style={{ background: 'none', border: 'none', cursor: 'pointer',
                borderTop: i > 0 ? '1px solid rgba(255,255,255,0.04)' : 'none' }}>
              <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, color: '#FFFFFF' }}>{p.label}</span>
              <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: '#F0424B' }}>Bloquear</span>
            </button>
          ))}
        </div>

        <div className="card-sm" style={{ padding: 14 }}>
          <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 13, color: '#FFFFFF', marginBottom: 6 }}>Precisa de ajuda?</p>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: '#A9B0C6' }}>
            Jogadores Anônimos Brasil · 0800-xxx-xxxx · CVV 188
          </p>
        </div>
      </div>

      {confirm && (
        <div className="fixed inset-0 sheet-backdrop flex items-end z-50">
          <div style={{ background: '#141A2E', borderRadius: '28px 28px 0 0', width: '100%',
            padding: '24px 24px 48px', border: '1px solid rgba(255,255,255,0.06)', borderBottom: 'none' }}>
            <div style={{ width: 40, height: 4, background: '#6E7691', borderRadius: 999, margin: '0 auto 20px' }} />
            <h3 style={{ fontFamily: 'Lilita One, cursive', fontSize: 20, color: '#FFFFFF', textAlign: 'center', marginBottom: 8 }}>
              {confirm.type === 'pause' ? 'Confirmar pausa?' : 'Confirmar autoexclusão?'}
            </h3>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, color: '#A9B0C6', textAlign: 'center', marginBottom: 24 }}>
              {confirm.label}
            </p>
            <div className="flex gap-3">
              <button style={{ flex: 1, height: 48, borderRadius: 999, background: '#F0424B', border: 'none',
                color: '#FFFFFF', fontFamily: 'Lilita One, cursive', fontSize: 16, cursor: 'pointer' }}
                onClick={() => setConfirm(null)}>Confirmar</button>
              <button className="btn-secondary flex-1" style={{ height: 48 }}
                onClick={() => setConfirm(null)}>Cancelar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
