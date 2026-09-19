import { ChevronLeft } from 'lucide-react'
import { useState } from 'react'

interface Props { onBack: () => void; onDone: () => void }

type Step = 'name' | 'cpf' | 'selfie' | 'done'

const inputStyle: React.CSSProperties = {
  height: 52, borderRadius: 16, background: '#1B2340',
  border: '1px solid rgba(255,255,255,0.06)', paddingLeft: 16, paddingRight: 16,
  color: '#FFFFFF', fontFamily: 'Inter, sans-serif', fontSize: 15, outline: 'none',
}

export default function KycScreen({ onBack, onDone }: Props) {
  const [step, setStep] = useState<Step>('name')
  const [name, setName] = useState('')
  const [dob, setDob] = useState('')
  const [cpf, setCpf] = useState('')

  const steps: Step[] = ['name', 'cpf', 'selfie', 'done']
  const idx = steps.indexOf(step)
  const progress = ((idx + 1) / steps.length) * 100

  return (
    <div className="flex flex-col" style={{ background: '#0D1222', minHeight: '100%' }}>
      <div className="flex items-center justify-between px-4 sticky top-0 z-40"
        style={{ background: '#141A2E', borderBottom: '1px solid rgba(255,255,255,0.06)', height: 56 }}>
        <button onClick={onBack} style={{ width: 44, height: 44, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'none', border: 'none', cursor: 'pointer' }}>
          <ChevronLeft size={24} color="#FFFFFF" />
        </button>
        <span style={{ fontFamily: 'Lilita One, cursive', fontSize: 18, color: '#FFFFFF' }}>Verificação</span>
        <div style={{ width: 44 }} />
      </div>

      <div style={{ padding: '12px 16px', background: '#141A2E' }}>
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${progress}%` }} />
        </div>
        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: '#A9B0C6', marginTop: 6, textAlign: 'center' }}>
          Passo {idx + 1} de {steps.length}
        </p>
      </div>

      <div className="flex flex-col gap-4 px-4 py-4 pb-6">
        {step === 'name' && (
          <>
            <h2 style={{ fontFamily: 'Lilita One, cursive', fontSize: 22, color: '#FFFFFF' }}>Seus dados pessoais</h2>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: '#A9B0C6' }}>
              Precisamos confirmar sua identidade antes de você jogar com dinheiro real.
            </p>
            <input value={name} onChange={e => setName(e.target.value)} placeholder="Nome completo" style={inputStyle} />
            <input value={dob} onChange={e => setDob(e.target.value)} placeholder="Data de nascimento (DD/MM/AAAA)" style={inputStyle} />
            <button className="btn-yellow" disabled={!name || !dob}
              style={{ height: 52, fontSize: 17 }} onClick={() => setStep('cpf')}>
              Continuar
            </button>
          </>
        )}

        {step === 'cpf' && (
          <>
            <h2 style={{ fontFamily: 'Lilita One, cursive', fontSize: 22, color: '#FFFFFF' }}>CPF</h2>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: '#A9B0C6' }}>
              Usado apenas para validação. Seus dados são criptografados.
            </p>
            <input value={cpf} onChange={e => setCpf(e.target.value)} placeholder="000.000.000-00"
              style={inputStyle} inputMode="numeric" />
            <button className="btn-yellow" disabled={cpf.length < 11}
              style={{ height: 52, fontSize: 17 }} onClick={() => setStep('selfie')}>
              Continuar
            </button>
          </>
        )}

        {step === 'selfie' && (
          <>
            <h2 style={{ fontFamily: 'Lilita One, cursive', fontSize: 22, color: '#FFFFFF' }}>Selfie com prova de vida</h2>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: '#A9B0C6' }}>
              Fique em um local bem iluminado e siga as instruções na tela.
            </p>
            <div className="card flex flex-col items-center justify-center gap-3"
              style={{ padding: 32, border: '2px dashed rgba(255,217,61,0.4)' }}>
              <span style={{ fontSize: 64 }}>🤳</span>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: '#A9B0C6' }}>Toque para abrir a câmera</p>
            </div>
            <button className="btn-yellow" style={{ height: 52, fontSize: 17 }}
              onClick={() => { setStep('done'); setTimeout(onDone, 1500) }}>
              Enviar verificação
            </button>
          </>
        )}

        {step === 'done' && (
          <div className="flex flex-col items-center justify-center gap-4" style={{ paddingTop: 60 }}>
            <span style={{ fontSize: 80 }}>✅</span>
            <h2 style={{ fontFamily: 'Lilita One, cursive', fontSize: 26, color: '#3DDB5F', textAlign: 'center' }}>
              Verificação enviada!
            </h2>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, color: '#A9B0C6', textAlign: 'center' }}>
              Normalmente leva até 5 minutos. Você receberá uma notificação quando estiver pronta.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
