import { ChevronLeft, Copy, Share2 } from 'lucide-react'
import { useState } from 'react'

interface Props { onBack: () => void }

const FRIENDS = [
  { id: 1, name: 'Carlos M.', avatar: '🦁', online: true, wagered: '2.400 BC' },
  { id: 2, name: 'Fernanda L.', avatar: '🌟', online: true, wagered: '1.800 BC' },
  { id: 3, name: 'Diego R.', avatar: '🔥', online: false, wagered: '900 BC' },
  { id: 4, name: 'Ana P.', avatar: '🎯', online: false, wagered: '500 BC' },
]

const MOCK_LINK = 't.me/borabet_bot/app?startapp=ref_a3f9c2'

export default function FriendsScreen({ onBack }: Props) {
  const [copied, setCopied] = useState(false)

  const copy = () => {
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="flex flex-col" style={{ background: '#0D1222', minHeight: '100%' }}>
      <div className="flex items-center justify-between px-4 sticky top-0 z-40"
        style={{ background: '#141A2E', borderBottom: '1px solid rgba(255,255,255,0.06)', height: 56 }}>
        <button onClick={onBack} style={{ width: 44, height: 44, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'none', border: 'none', cursor: 'pointer' }}>
          <ChevronLeft size={24} color="#FFFFFF" />
        </button>
        <span style={{ fontFamily: 'Lilita One, cursive', fontSize: 18, color: '#FFFFFF' }}>Amigos</span>
        <div style={{ width: 44 }} />
      </div>

      <div className="flex flex-col gap-4 px-4 py-4 pb-6">
        <div className="card" style={{ padding: 20, background: 'linear-gradient(135deg, #1B2340 0%, #0D1222 100%)' }}>
          <div className="flex items-center gap-3 mb-3">
            <span style={{ fontSize: 40 }}>👥</span>
            <div>
              <p style={{ fontFamily: 'Lilita One, cursive', fontSize: 20, color: '#FFFFFF' }}>Convide e ganhe</p>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: '#A9B0C6', marginTop: 2 }}>500 BC por amigo que depositar</p>
            </div>
          </div>

          <div style={{ background: '#0D1222', borderRadius: 12, padding: 12, marginBottom: 12 }}>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: '#6E7691', marginBottom: 4 }}>Seu link</p>
            <div className="flex items-center gap-2">
              <span style={{ fontFamily: 'monospace', fontSize: 11, color: '#A9B0C6', flex: 1, wordBreak: 'break-all' }}>
                {MOCK_LINK}
              </span>
              <button onClick={copy} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4 }}>
                {copied ? <span style={{ fontSize: 12, color: '#3DDB5F' }}>✓</span> : <Copy size={14} color="#A9B0C6" />}
              </button>
            </div>
          </div>

          <button className="btn-yellow flex items-center justify-center gap-2"
            style={{ width: '100%', height: 44, fontSize: 15 }}>
            <Share2 size={16} />
            Compartilhar convite
          </button>
        </div>

        <div className="flex gap-3">
          {[
            { label: 'Convidados', value: '12' },
            { label: 'Ativos', value: '8' },
            { label: 'Bônus ganhos', value: '4.000' },
          ].map((s, i) => (
            <div key={i} className="card-sm flex-1 flex flex-col items-center" style={{ padding: 14 }}>
              <span style={{ fontFamily: 'Lilita One, cursive', fontSize: 20, color: '#FFFFFF' }}>{s.value}</span>
              <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: '#6E7691', marginTop: 2, textAlign: 'center' }}>{s.label}</span>
            </div>
          ))}
        </div>

        <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 12, color: '#6E7691', marginTop: 4 }}>SEUS AMIGOS</p>
        {FRIENDS.map(f => (
          <div key={f.id} className="card-sm flex items-center gap-3" style={{ padding: 12 }}>
            <div style={{ position: 'relative' }}>
              <div style={{
                width: 40, height: 40, borderRadius: '50%', background: '#1B2340',
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20,
              }}>{f.avatar}</div>
              {f.online && (
                <div style={{
                  position: 'absolute', bottom: 2, right: 2, width: 12, height: 12,
                  borderRadius: '50%', background: '#3DDB5F', border: '2px solid #141A2E',
                }} />
              )}
            </div>
            <div className="flex-1">
              <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 14, color: '#FFFFFF' }}>{f.name}</p>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: '#6E7691', marginTop: 2 }}>Apostou {f.wagered}</p>
            </div>
            <button className="btn-yellow" disabled={!f.online}
              style={{ height: 32, paddingLeft: 14, paddingRight: 14, fontSize: 12 }}>
              Desafiar
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
