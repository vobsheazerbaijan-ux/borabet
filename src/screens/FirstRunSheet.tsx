import { useState } from 'react'

interface Props { onDone: () => void }

export default function FirstRunSheet({ onDone }: Props) {
  const [age, setAge] = useState(false)
  const [terms, setTerms] = useState(false)
  const [lang, setLang] = useState<'pt-BR' | 'en' | 'es'>('pt-BR')
  const [sound, setSound] = useState(true)

  const canContinue = age && terms

  return (
    <div className="fixed inset-0 flex flex-col" style={{ background: '#070A14', maxWidth: 480, margin: '0 auto' }}>
      <div className="flex-1 flex flex-col justify-center px-6 gap-5">
        <div className="flex flex-col items-center gap-2 mb-2">
          <span style={{ fontSize: 56 }}>🁣</span>
          <h1 style={{ fontFamily: 'Lilita One, cursive', fontSize: 32, color: '#FFFFFF' }}>Bem-vindo à BoraBet</h1>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, color: '#A9B0C6', textAlign: 'center' }}>
            Antes de começar, confirme algumas coisas.
          </p>
        </div>

        <label className="card-sm flex items-start gap-3" style={{ padding: 14, cursor: 'pointer' }}>
          <input type="checkbox" checked={age} onChange={e => setAge(e.target.checked)}
            style={{ marginTop: 2, width: 20, height: 20, accentColor: '#FFD93D' }} />
          <div>
            <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 14, color: '#FFFFFF' }}>
              Confirmo que tenho 18 anos ou mais
            </p>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: '#6E7691', marginTop: 2 }}>
              É proibido para menores de idade.
            </p>
          </div>
        </label>

        <label className="card-sm flex items-start gap-3" style={{ padding: 14, cursor: 'pointer' }}>
          <input type="checkbox" checked={terms} onChange={e => setTerms(e.target.checked)}
            style={{ marginTop: 2, width: 20, height: 20, accentColor: '#FFD93D' }} />
          <div>
            <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 14, color: '#FFFFFF' }}>
              Aceito os Termos e a Política de Privacidade
            </p>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: '#6E7691', marginTop: 2 }}>
              Ao continuar, você concorda com nossas regras.
            </p>
          </div>
        </label>

        <div className="card-sm" style={{ padding: 14 }}>
          <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 13, color: '#FFFFFF', marginBottom: 8 }}>
            Idioma
          </p>
          <div className="flex gap-2">
            {(['pt-BR', 'en', 'es'] as const).map(l => (
              <button key={l} onClick={() => setLang(l)}
                style={{
                  flex: 1, height: 36, borderRadius: 999,
                  background: lang === l ? '#FFD93D' : 'transparent',
                  border: lang === l ? 'none' : '1px solid rgba(255,255,255,0.08)',
                  color: lang === l ? '#1A1400' : '#A9B0C6',
                  fontFamily: lang === l ? 'Lilita One, cursive' : 'Inter, sans-serif',
                  fontSize: 13, fontWeight: 600, cursor: 'pointer',
                }}>{l === 'pt-BR' ? 'Português' : l === 'en' ? 'English' : 'Español'}</button>
            ))}
          </div>
        </div>

        <div className="card-sm flex items-center justify-between" style={{ padding: 14 }}>
          <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 14, color: '#FFFFFF' }}>
            🔊 Sons do app
          </span>
          <button onClick={() => setSound(s => !s)}
            style={{
              width: 48, height: 28, borderRadius: 999,
              background: sound ? '#3DDB5F' : '#1B2340',
              border: '1px solid rgba(255,255,255,0.08)',
              cursor: 'pointer', position: 'relative',
            }}>
            <span style={{
              position: 'absolute', top: 3, left: sound ? 23 : 3,
              width: 20, height: 20, borderRadius: '50%', background: '#fff',
              transition: 'left 150ms',
            }} />
          </button>
        </div>
      </div>

      <div className="px-6 pb-8">
        <button className="btn-yellow glow-pulse" disabled={!canContinue}
          style={{ width: '100%', height: 52, fontSize: 18 }} onClick={onDone}>
          Bora!
        </button>
      </div>
    </div>
  )
}
