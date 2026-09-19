import { ChevronLeft, Search, ChevronRight } from 'lucide-react'

interface Props { onBack: () => void }

const CATEGORIES = [
  { icon: '💵', label: 'Depósitos', count: 12 },
  { icon: '↑', label: 'Saques', count: 8 },
  { icon: '🎲', label: 'Jogos', count: 6 },
  { icon: '🎁', label: 'Bônus', count: 9 },
  { icon: '👤', label: 'Conta', count: 5 },
  { icon: '🔒', label: 'Verificação', count: 7 },
]

const TICKETS = [
  { id: '#4821', title: 'Depósito não creditado', status: 'Em análise', date: 'Hoje, 08:14' },
  { id: '#4718', title: 'Dúvida sobre bônus', status: 'Resolvido', date: 'Ontem, 21:40' },
]

export default function SupportScreen({ onBack }: Props) {
  return (
    <div className="flex flex-col" style={{ background: '#0D1222', minHeight: '100%' }}>
      <div className="flex items-center justify-between px-4 sticky top-0 z-40"
        style={{ background: '#141A2E', borderBottom: '1px solid rgba(255,255,255,0.06)', height: 56 }}>
        <button onClick={onBack} style={{ width: 44, height: 44, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'none', border: 'none', cursor: 'pointer' }}>
          <ChevronLeft size={24} color="#FFFFFF" />
        </button>
        <span style={{ fontFamily: 'Lilita One, cursive', fontSize: 18, color: '#FFFFFF' }}>Suporte</span>
        <div style={{ width: 44 }} />
      </div>

      <div className="flex flex-col gap-4 px-4 py-4 pb-6">
        <div style={{
          height: 44, borderRadius: 999, background: '#1B2340',
          border: '1px solid rgba(255,255,255,0.06)',
          display: 'flex', alignItems: 'center', gap: 8, paddingLeft: 14, paddingRight: 14,
        }}>
          <Search size={16} color="#6E7691" />
          <input placeholder="Buscar ajuda…"
            style={{ flex: 1, background: 'none', border: 'none', outline: 'none',
              color: '#FFFFFF', fontFamily: 'Inter, sans-serif', fontSize: 14 }} />
        </div>

        <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 12, color: '#6E7691' }}>CATEGORIAS</p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          {CATEGORIES.map(c => (
            <button key={c.label} className="card-sm flex items-center gap-3"
              style={{ padding: 14, cursor: 'pointer', textAlign: 'left' }}>
              <span style={{ fontSize: 22 }}>{c.icon}</span>
              <div className="flex-1">
                <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 13, color: '#FFFFFF' }}>{c.label}</p>
                <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: '#6E7691', marginTop: 2 }}>{c.count} artigos</p>
              </div>
            </button>
          ))}
        </div>

        <button className="btn-yellow" style={{ height: 52, fontSize: 16 }}>Abrir novo ticket</button>

        <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 12, color: '#6E7691', marginTop: 4 }}>MEUS TICKETS</p>
        {TICKETS.map(t => (
          <button key={t.id} className="card-sm flex items-center gap-3"
            style={{ padding: 14, cursor: 'pointer', textAlign: 'left' }}>
            <div className="flex-1">
              <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 14, color: '#FFFFFF' }}>{t.title}</p>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: '#6E7691', marginTop: 2 }}>{t.id} · {t.date}</p>
            </div>
            <span style={{
              fontFamily: 'Inter, sans-serif', fontSize: 11, fontWeight: 600,
              background: t.status === 'Resolvido' ? 'rgba(61,219,95,0.15)' : 'rgba(255,217,61,0.15)',
              color: t.status === 'Resolvido' ? '#3DDB5F' : '#FFD93D',
              padding: '3px 8px', borderRadius: 8,
            }}>{t.status}</span>
            <ChevronRight size={16} color="#6E7691" />
          </button>
        ))}
      </div>
    </div>
  )
}
