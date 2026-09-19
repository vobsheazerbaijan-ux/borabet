import { useState } from 'react'
import { ChevronLeft } from 'lucide-react'

interface Props {
  onBack: () => void
  onWithdraw: () => void
  onDeposit: () => void
}

type Filter = 'all' | 'deposits' | 'withdrawals' | 'games' | 'bonus'
type Currency = 'BC' | 'BRL'

const TRANSACTIONS = [
  { type: 'win', icon: '🎲', title: 'Vitória · Mesa 3', date: 'Hoje, 22:14', amount: 450, credit: true, status: 'done' },
  { type: 'deposit', icon: '💵', title: 'Depósito USDT', date: 'Hoje, 08:30', amount: 5000, credit: true, status: 'done' },
  { type: 'loss', icon: '🎲', title: 'Derrota · Mesa 2', date: 'Ontem, 21:50', amount: 200, credit: false, status: 'done' },
  { type: 'withdraw', icon: '↑', title: 'Saque USDT', date: 'Ontem, 18:00', amount: 2000, credit: false, status: 'review' },
  { type: 'bonus', icon: '🎁', title: 'Bônus de boas-vindas', date: '15/03', amount: 500, credit: true, status: 'done' },
]

const FILTERS: { id: Filter; label: string }[] = [
  { id: 'all', label: 'Tudo' },
  { id: 'deposits', label: 'Depósitos' },
  { id: 'withdrawals', label: 'Saques' },
  { id: 'games', label: 'Jogos' },
  { id: 'bonus', label: 'Bônus' },
]

const STATUS_COLORS: Record<string, { bg: string; text: string; label: string }> = {
  done: { bg: 'rgba(61,219,95,0.1)', text: '#3DDB5F', label: 'Concluído' },
  review: { bg: 'rgba(255,217,61,0.1)', text: '#FFD93D', label: 'Em análise' },
  failed: { bg: 'rgba(240,66,75,0.1)', text: '#F0424B', label: 'Falhou' },
}

export default function WalletScreen({ onBack, onWithdraw, onDeposit }: Props) {
  const [filter, setFilter] = useState<Filter>('all')
  const [currency, setCurrency] = useState<Currency>('BC')
  const fmt = (n: number) => currency === 'BC' ? `${n.toLocaleString('pt-BR')} BC` : (n / 100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

  return (
    <div className="flex flex-col" style={{ background: '#0D1222', minHeight: '100%' }}>
      <div className="flex items-center justify-between px-4 sticky top-0 z-40"
        style={{ background: '#141A2E', borderBottom: '1px solid rgba(255,255,255,0.06)', height: 56 }}>
        <button onClick={onBack} style={{ width: 44, height: 44, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'none', border: 'none', cursor: 'pointer' }}>
          <ChevronLeft size={24} color="#FFFFFF" />
        </button>
        <span style={{ fontFamily: 'Lilita One, cursive', fontSize: 18, color: '#FFFFFF' }}>Carteira</span>
        <div style={{ width: 44 }} />
      </div>

      <div className="flex flex-col gap-4 px-4 py-4 pb-6">
        {/* Currency toggle */}
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <div style={{ display: 'flex', background: '#1B2340', borderRadius: 999, padding: 3, border: '1px solid rgba(255,255,255,0.06)' }}>
            {(['BC', 'BRL'] as Currency[]).map(c => (
              <button key={c} onClick={() => setCurrency(c)}
                style={{
                  padding: '6px 20px', borderRadius: 999, border: 'none', cursor: 'pointer',
                  background: currency === c ? '#FFD93D' : 'transparent',
                  color: currency === c ? '#1A1400' : '#A9B0C6',
                  fontFamily: currency === c ? 'Lilita One, cursive' : 'Inter, sans-serif',
                  fontSize: 13, fontWeight: 600,
                }}>{c === 'BC' ? 'Bora Coins' : 'R$'}</button>
            ))}
          </div>
        </div>
        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: '#6E7691', textAlign: 'center' }}>100 BC = R$ 1,00</p>

        {/* Balance cards */}
        {[
          { icon: '🪙', title: 'Saldo real', amount: 2480, caption: 'Disponível para jogar e sacar' },
          { icon: '🎁', title: 'Bônus', amount: 500, caption: 'Aposte 1.500 BC para liberar' },
          { icon: '⏳', title: 'Pendente', amount: 2000, caption: 'Saque em análise' },
        ].map((b, i) => (
          <div key={i} className="card flex items-center gap-4" style={{ padding: 16 }}>
            <span style={{ fontSize: 36 }}>{b.icon}</span>
            <div className="flex-1">
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: '#6E7691' }}>{b.title}</p>
              <p style={{ fontFamily: 'Lilita One, cursive', fontSize: 22, color: '#FFFFFF' }}>{fmt(b.amount)}</p>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: '#A9B0C6', marginTop: 2 }}>{b.caption}</p>
            </div>
          </div>
        ))}

        {/* Action buttons */}
        <div className="flex gap-3">
          <button className="btn-yellow flex-1" style={{ height: 44, fontSize: 15 }} onClick={onDeposit}>
            Depositar
          </button>
          <button className="btn-secondary flex-1" style={{ height: 44, fontSize: 15 }} onClick={onWithdraw}>
            Sacar
          </button>
        </div>

        {/* Filter chips */}
        <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 4 }}>
          {FILTERS.map(f => (
            <button key={f.id} onClick={() => setFilter(f.id)}
              style={{
                flexShrink: 0, height: 32, paddingLeft: 14, paddingRight: 14, borderRadius: 999,
                border: filter === f.id ? 'none' : '1px solid rgba(255,255,255,0.06)',
                background: filter === f.id ? '#FFD93D' : '#1B2340',
                color: filter === f.id ? '#1A1400' : '#A9B0C6',
                fontFamily: filter === f.id ? 'Lilita One, cursive' : 'Inter, sans-serif',
                fontSize: 12, fontWeight: 600, cursor: 'pointer',
              }}>{f.label}</button>
          ))}
        </div>

        {/* Transactions */}
        <div className="flex flex-col gap-2">
          {TRANSACTIONS.map((t, i) => {
            const statusStyle = STATUS_COLORS[t.status]
            return (
              <div key={i} className="card-sm flex items-center gap-3" style={{ padding: 14 }}>
                <div style={{
                  width: 40, height: 40, borderRadius: 12, background: '#141A2E',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, flexShrink: 0,
                }}>{t.icon}</div>
                <div className="flex-1 min-w-0">
                  <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 13, color: '#FFFFFF', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {t.title}
                  </p>
                  <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: '#6E7691', marginTop: 2 }}>{t.date}</p>
                </div>
                <div style={{ textAlign: 'right', flexShrink: 0 }}>
                  <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 13, color: t.credit ? '#3DDB5F' : '#A9B0C6' }}>
                    {t.credit ? '+' : '−'}{fmt(t.amount)}
                  </p>
                  {t.status !== 'done' && (
                    <span style={{
                      fontFamily: 'Inter, sans-serif', fontSize: 10, fontWeight: 600,
                      background: statusStyle.bg, color: statusStyle.text,
                      padding: '2px 6px', borderRadius: 6, marginTop: 2, display: 'inline-block',
                    }}>{statusStyle.label}</span>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        <button style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: '#3B7BFF', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'center' }}>
          Exportar CSV →
        </button>
      </div>
    </div>
  )
}
