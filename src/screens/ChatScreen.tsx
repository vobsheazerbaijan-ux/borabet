import { useState, useEffect, useRef } from 'react'
import { ChevronLeft, Send } from 'lucide-react'

interface Props { onBack: () => void }

interface Message {
  id: number; user: string; avatar: string; role?: 'master' | 'mod' | 'vip'; text: string; time: string
}

const SEED: Message[] = [
  { id: 1, user: 'Carlos M.', avatar: '🦁', role: 'vip', text: 'Boa noite pessoal! Bora de dominó?', time: '22:01' },
  { id: 2, user: 'Fernanda L.', avatar: '🌟', text: 'Acabei de ganhar 1.240 BC 🎉', time: '22:02' },
  { id: 3, user: 'Mod Diego', avatar: '🛡️', role: 'mod', text: 'Lembrando: sem links e sem spam. Boa sorte a todos!', time: '22:03' },
  { id: 4, user: 'Ana P.', avatar: '🎯', text: 'Alguém na mesa 2?', time: '22:04' },
  { id: 5, user: 'Master', avatar: '👑', role: 'master', text: 'Chuva de moedas em 5 minutos! Fiquem ligados 🪙', time: '22:05' },
]

export default function ChatScreen({ onBack }: Props) {
  const [messages, setMessages] = useState<Message[]>(SEED)
  const [input, setInput] = useState('')
  const [rain, setRain] = useState(false)
  const [rainLeft, setRainLeft] = useState(30)
  const [claimed, setClaimed] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 999999, behavior: 'smooth' })
  }, [messages])

  useEffect(() => {
    if (!rain) return
    if (rainLeft <= 0) { setRain(false); return }
    const t = setTimeout(() => setRainLeft(n => n - 1), 1000)
    return () => clearTimeout(t)
  }, [rain, rainLeft])

  const send = () => {
    if (!input.trim()) return
    setMessages(m => [...m, {
      id: m.length + 1, user: 'Você', avatar: '😊',
      text: input.trim(), time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
    }])
    setInput('')
  }

  const roleBadge = (role?: string) => {
    if (role === 'master') return { text: 'MASTER', bg: '#FFD93D', fg: '#1A1400' }
    if (role === 'mod') return { text: 'MOD', bg: '#3DDB5F', fg: '#0A2416' }
    if (role === 'vip') return { text: 'VIP', bg: '#8B4DFF', fg: '#FFF' }
    return null
  }

  return (
    <div className="flex flex-col" style={{ background: '#0D1222', height: '100vh', maxWidth: 480, margin: '0 auto' }}>
      <div className="flex items-center justify-between px-4 sticky top-0 z-40"
        style={{ background: '#141A2E', borderBottom: '1px solid rgba(255,255,255,0.06)', height: 56 }}>
        <button onClick={onBack} style={{ width: 44, height: 44, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'none', border: 'none', cursor: 'pointer' }}>
          <ChevronLeft size={24} color="#FFFFFF" />
        </button>
        <div className="flex flex-col items-center">
          <span style={{ fontFamily: 'Lilita One, cursive', fontSize: 16, color: '#FFFFFF' }}>Chat global</span>
          <div className="flex items-center gap-1">
            <span className="live-dot" style={{ width: 6, height: 6, borderRadius: '50%', background: '#3DDB5F', display: 'inline-block' }} />
            <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: '#6E7691' }}>284 online</span>
          </div>
        </div>
        <button onClick={() => { setRain(true); setRainLeft(30); setClaimed(false) }}
          style={{ padding: '6px 12px', borderRadius: 999, background: '#1B2340', border: '1px solid rgba(255,217,61,0.3)',
            color: '#FFD93D', fontFamily: 'Inter, sans-serif', fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>
          🪙 Chuva
        </button>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-3 flex flex-col gap-3">
        {messages.map(m => {
          const badge = roleBadge(m.role)
          return (
            <div key={m.id} className="flex gap-3">
              <div style={{
                width: 32, height: 32, borderRadius: '50%', background: '#1B2340',
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, flexShrink: 0,
              }}>{m.avatar}</div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 13, color: '#FFFFFF' }}>{m.user}</span>
                  {badge && (
                    <span style={{ background: badge.bg, color: badge.fg, borderRadius: 6,
                      padding: '1px 6px', fontFamily: 'Lilita One, cursive', fontSize: 9 }}>{badge.text}</span>
                  )}
                  <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: '#6E7691' }}>{m.time}</span>
                </div>
                <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, color: '#A9B0C6', lineHeight: '20px' }}>{m.text}</p>
              </div>
            </div>
          )
        })}
      </div>

      <div className="flex items-center gap-2 px-4 py-3"
        style={{ background: '#141A2E', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <input value={input} onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && send()}
          placeholder="Escreva uma mensagem…"
          style={{
            flex: 1, height: 40, borderRadius: 999, background: '#1B2340',
            border: '1px solid rgba(255,255,255,0.06)', paddingLeft: 16, paddingRight: 16,
            color: '#FFFFFF', fontFamily: 'Inter, sans-serif', fontSize: 14, outline: 'none',
          }} />
        <button onClick={send} className="btn-yellow"
          style={{ width: 40, height: 40, borderRadius: '50%', padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Send size={18} />
        </button>
      </div>

      {rain && (
        <div className="fixed inset-0 flex flex-col items-center justify-center"
          style={{ background: 'rgba(7,10,20,0.85)', backdropFilter: 'blur(4px)', zIndex: 100 }}>
          {Array.from({ length: 24 }).map((_, i) => (
            <span key={i} className="coin-particle"
              style={{ left: `${(i * 37) % 100}%`, fontSize: 22,
                animationDuration: `${1.5 + (i % 5) * 0.3}s`, animationDelay: `${(i % 6) * 0.2}s` }}>🪙</span>
          ))}
          <h2 style={{ fontFamily: 'Lilita One, cursive', fontSize: 30, color: '#FFD93D', marginBottom: 8 }}>
            Chuva de moedas!
          </h2>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, color: '#A9B0C6', marginBottom: 4 }}>
            {rainLeft}s restantes
          </p>
          {!claimed ? (
            <button className="btn-green glow-pulse" style={{ height: 56, paddingLeft: 40, paddingRight: 40, fontSize: 20, marginTop: 12 }}
              onClick={() => setClaimed(true)}>Pegar</button>
          ) : (
            <p style={{ fontFamily: 'Lilita One, cursive', fontSize: 22, color: '#3DDB5F', marginTop: 12 }}>
              Você pegou +50 BC!
            </p>
          )}
          <button style={{ marginTop: 16, background: 'none', border: 'none', cursor: 'pointer', color: '#6E7691', fontFamily: 'Inter, sans-serif', fontSize: 13 }}
            onClick={() => setRain(false)}>Fechar</button>
        </div>
      )}
    </div>
  )
}
