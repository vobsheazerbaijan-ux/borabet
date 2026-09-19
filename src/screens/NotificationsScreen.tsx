import { ChevronLeft } from 'lucide-react'

interface Props { onBack: () => void }

const GROUPS = [
  {
    day: 'Hoje',
    items: [
      { icon: '🎁', title: 'Recompensa diária pronta', desc: 'Pegue 100 BC grátis', time: '09:12', unread: true },
      { icon: '↑', title: 'Saque enviado', desc: '2.000 BC para USDT-TRON', time: '08:47', unread: true },
      { icon: '🏆', title: 'Você subiu no ranking', desc: 'Agora você é #10 no semanal', time: '08:00', unread: false },
    ],
  },
  {
    day: 'Ontem',
    items: [
      { icon: '👥', title: 'Carlos M. aceitou seu convite', desc: '+500 BC creditados', time: '21:14', unread: false },
      { icon: '🎲', title: 'Resultado do torneio', desc: 'Você ficou em 4º lugar · +250 BC', time: '20:00', unread: false },
    ],
  },
  {
    day: 'Sistema',
    items: [
      { icon: '🛡️', title: 'Nova política de privacidade', desc: 'Atualizada em 15/03', time: '15/03', unread: false },
    ],
  },
]

export default function NotificationsScreen({ onBack }: Props) {
  return (
    <div className="flex flex-col" style={{ background: '#0D1222', minHeight: '100%' }}>
      <div className="flex items-center justify-between px-4 sticky top-0 z-40"
        style={{ background: '#141A2E', borderBottom: '1px solid rgba(255,255,255,0.06)', height: 56 }}>
        <button onClick={onBack} style={{ width: 44, height: 44, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'none', border: 'none', cursor: 'pointer' }}>
          <ChevronLeft size={24} color="#FFFFFF" />
        </button>
        <span style={{ fontFamily: 'Lilita One, cursive', fontSize: 18, color: '#FFFFFF' }}>Notificações</span>
        <button style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: '#3B7BFF', background: 'none', border: 'none', cursor: 'pointer' }}>
          Marcar lidas
        </button>
      </div>
      <div className="flex flex-col gap-4 px-4 py-4 pb-6">
        {GROUPS.map((g, gi) => (
          <div key={gi}>
            <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 12, color: '#6E7691', marginBottom: 8 }}>
              {g.day.toUpperCase()}
            </p>
            <div className="flex flex-col gap-2">
              {g.items.map((it, i) => (
                <div key={i} className="card-sm flex items-start gap-3"
                  style={{ padding: 14, border: it.unread ? '1px solid rgba(255,217,61,0.25)' : undefined }}>
                  <div style={{
                    width: 40, height: 40, borderRadius: 12, background: '#141A2E',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0,
                  }}>{it.icon}</div>
                  <div className="flex-1">
                    <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 14, color: '#FFFFFF' }}>{it.title}</p>
                    <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: '#A9B0C6', marginTop: 2 }}>{it.desc}</p>
                  </div>
                  <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: '#6E7691' }}>{it.time}</span>
                  {it.unread && (
                    <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#FFD93D', flexShrink: 0, marginTop: 6 }} />
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
