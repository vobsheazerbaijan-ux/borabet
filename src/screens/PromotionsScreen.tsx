import { ChevronLeft } from 'lucide-react'

interface Props { onBack: () => void }

const ACTIVE = [
  {
    id: 1, icon: '🎁', title: 'Bônus de boas-vindas',
    desc: '+10% extra no primeiro depósito',
    progress: 62, progressText: '1.240 / 2.000 BC apostados', remaining: '6 dias restantes',
  },
  {
    id: 2, icon: '💰', title: 'Cashback semanal',
    desc: '2% das perdas devolvidos toda segunda',
    progress: 0, progressText: 'Próximo crédito: segunda, 12:00', remaining: '',
  },
]

const AVAILABLE = [
  {
    id: 3, icon: '🔥', title: 'Recarga de sexta',
    desc: '+15% no depósito desta sexta-feira',
    terms: 'Depósitos até 5.000 BC · Apostar 3×',
  },
  {
    id: 4, icon: '👥', title: 'Convide e ganhe',
    desc: 'Ganhe 500 BC por amigo que depositar',
    terms: 'Amigo precisa verificar conta e depositar 500 BC',
  },
]

export default function PromotionsScreen({ onBack }: Props) {
  return (
    <div className="flex flex-col" style={{ background: '#0D1222', minHeight: '100%' }}>
      <div className="flex items-center justify-between px-4 sticky top-0 z-40"
        style={{ background: '#141A2E', borderBottom: '1px solid rgba(255,255,255,0.06)', height: 56 }}>
        <button onClick={onBack} style={{ width: 44, height: 44, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'none', border: 'none', cursor: 'pointer' }}>
          <ChevronLeft size={24} color="#FFFFFF" />
        </button>
        <span style={{ fontFamily: 'Lilita One, cursive', fontSize: 18, color: '#FFFFFF' }}>Bônus</span>
        <div style={{ width: 44 }} />
      </div>

      <div className="flex flex-col gap-4 px-4 py-4 pb-6">
        <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 12, color: '#6E7691' }}>ATIVOS</p>
        {ACTIVE.map(p => (
          <div key={p.id} className="card" style={{ padding: 16 }}>
            <div className="flex items-start gap-3 mb-3">
              <span style={{ fontSize: 32, flexShrink: 0 }}>{p.icon}</span>
              <div className="flex-1">
                <p style={{ fontFamily: 'Lilita One, cursive', fontSize: 16, color: '#FFFFFF' }}>{p.title}</p>
                <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: '#A9B0C6', marginTop: 2 }}>{p.desc}</p>
              </div>
            </div>
            {p.progress > 0 && (
              <>
                <div className="progress-bar" style={{ marginBottom: 6 }}>
                  <div className="progress-fill" style={{ width: `${p.progress}%` }} />
                </div>
                <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: '#6E7691' }}>
                  {p.progressText} · {p.remaining}
                </p>
              </>
            )}
            {p.progress === 0 && (
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: '#6E7691' }}>{p.progressText}</p>
            )}
          </div>
        ))}

        <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 12, color: '#6E7691', marginTop: 4 }}>DISPONÍVEIS</p>
        {AVAILABLE.map(p => (
          <div key={p.id} className="card" style={{ padding: 16 }}>
            <div className="flex items-start gap-3 mb-3">
              <span style={{ fontSize: 32, flexShrink: 0 }}>{p.icon}</span>
              <div className="flex-1">
                <p style={{ fontFamily: 'Lilita One, cursive', fontSize: 16, color: '#FFFFFF' }}>{p.title}</p>
                <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: '#A9B0C6', marginTop: 2 }}>{p.desc}</p>
              </div>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.03)', borderRadius: 8, padding: 10, marginBottom: 12 }}>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: '#6E7691' }}>{p.terms}</p>
            </div>
            <button className="btn-yellow" style={{ width: '100%', height: 40, fontSize: 14 }}>Ativar bônus</button>
          </div>
        ))}

        <button style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: '#3B7BFF',
          background: 'none', border: 'none', cursor: 'pointer', textAlign: 'center', paddingTop: 4 }}>
          Ver termos completos →
        </button>
      </div>
    </div>
  )
}
