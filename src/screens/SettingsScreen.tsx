import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useState } from 'react'

interface Props { onBack: () => void; onLegal: (s: string) => void }

const TOGGLES = [
  { id: 'sound', label: 'Sons do app', default: true },
  { id: 'haptics', label: 'Vibração (haptics)', default: true },
  { id: 'animations', label: 'Animações completas', default: true },
  { id: 'saver', label: 'Modo economia de dados', default: false },
  { id: 'hideName', label: 'Ocultar meu nome no chat', default: false },
]

const LEGAL: { id: string; label: string }[] = [
  { id: 'terms', label: 'Termos de uso' },
  { id: 'privacy', label: 'Política de privacidade' },
  { id: 'bonusTerms', label: 'Termos de bônus' },
  { id: 'gameRules', label: 'Regras dos jogos e RTP' },
  { id: 'fairness', label: 'Jogo justo' },
  { id: 'license', label: 'Licença e regulador' },
  { id: 'aml', label: 'Política AML' },
  { id: 'complaints', label: 'Reclamações' },
  { id: 'about', label: 'Sobre a BoraBet' },
]

export default function SettingsScreen({ onBack, onLegal }: Props) {
  const [state, setState] = useState<Record<string, boolean>>(
    Object.fromEntries(TOGGLES.map(t => [t.id, t.default]))
  )
  const [lang, setLang] = useState('pt-BR')
  const [currency, setCurrency] = useState<'BC' | 'BRL'>('BC')

  return (
    <div className="flex flex-col" style={{ background: '#0D1222', minHeight: '100%' }}>
      <div className="flex items-center justify-between px-4 sticky top-0 z-40"
        style={{ background: '#141A2E', borderBottom: '1px solid rgba(255,255,255,0.06)', height: 56 }}>
        <button onClick={onBack} style={{ width: 44, height: 44, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'none', border: 'none', cursor: 'pointer' }}>
          <ChevronLeft size={24} color="#FFFFFF" />
        </button>
        <span style={{ fontFamily: 'Lilita One, cursive', fontSize: 18, color: '#FFFFFF' }}>Configurações</span>
        <div style={{ width: 44 }} />
      </div>

      <div className="flex flex-col gap-4 px-4 py-4 pb-6">
        <div className="card" style={{ padding: 16 }}>
          <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 13, color: '#FFFFFF', marginBottom: 10 }}>Idioma</p>
          <div className="flex gap-2">
            {['pt-BR', 'en', 'es'].map(l => (
              <button key={l} onClick={() => setLang(l)}
                style={{
                  flex: 1, height: 36, borderRadius: 999,
                  background: lang === l ? '#FFD93D' : '#1B2340',
                  border: lang === l ? 'none' : '1px solid rgba(255,255,255,0.06)',
                  color: lang === l ? '#1A1400' : '#A9B0C6',
                  fontFamily: lang === l ? 'Lilita One, cursive' : 'Inter, sans-serif',
                  fontSize: 13, fontWeight: 600, cursor: 'pointer',
                }}>{l === 'pt-BR' ? 'Português' : l === 'en' ? 'English' : 'Español'}</button>
            ))}
          </div>
        </div>

        <div className="card" style={{ padding: 16 }}>
          <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 13, color: '#FFFFFF', marginBottom: 10 }}>Exibir valores em</p>
          <div className="flex gap-2">
            {(['BC', 'BRL'] as const).map(c => (
              <button key={c} onClick={() => setCurrency(c)}
                style={{
                  flex: 1, height: 36, borderRadius: 999,
                  background: currency === c ? '#FFD93D' : '#1B2340',
                  border: currency === c ? 'none' : '1px solid rgba(255,255,255,0.06)',
                  color: currency === c ? '#1A1400' : '#A9B0C6',
                  fontFamily: currency === c ? 'Lilita One, cursive' : 'Inter, sans-serif',
                  fontSize: 13, fontWeight: 600, cursor: 'pointer',
                }}>{c === 'BC' ? 'Bora Coins' : 'R$'}</button>
            ))}
          </div>
        </div>

        <div className="card" style={{ padding: 16 }}>
          {TOGGLES.map((t, i) => (
            <div key={t.id} className="flex items-center justify-between py-3"
              style={{ borderTop: i > 0 ? '1px solid rgba(255,255,255,0.04)' : 'none' }}>
              <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, color: '#FFFFFF' }}>{t.label}</span>
              <button onClick={() => setState(s => ({ ...s, [t.id]: !s[t.id] }))}
                style={{
                  width: 48, height: 28, borderRadius: 999,
                  background: state[t.id] ? '#3DDB5F' : '#1B2340',
                  border: '1px solid rgba(255,255,255,0.08)',
                  cursor: 'pointer', position: 'relative',
                }}>
                <span style={{
                  position: 'absolute', top: 3, left: state[t.id] ? 23 : 3,
                  width: 20, height: 20, borderRadius: '50%', background: '#fff',
                  transition: 'left 150ms',
                }} />
              </button>
            </div>
          ))}
        </div>

        <div className="card" style={{ padding: 16 }}>
          <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 13, color: '#FFFFFF', marginBottom: 6 }}>Legal e informações</p>
          {LEGAL.map((l, i) => (
            <button key={l.id} onClick={() => onLegal(l.id)}
              className="flex items-center justify-between w-full text-left py-3"
              style={{ borderTop: i > 0 ? '1px solid rgba(255,255,255,0.04)' : 'none',
                background: 'none', border: 'none', cursor: 'pointer' }}>
              <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, color: '#A9B0C6' }}>{l.label}</span>
              <ChevronRight size={16} color="#6E7691" />
            </button>
          ))}
        </div>

        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: '#6E7691', textAlign: 'center' }}>
          BoraBet · versão 1.0.0 · 18+
        </p>
      </div>
    </div>
  )
}
