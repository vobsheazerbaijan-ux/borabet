import { Bell, MessageCircle } from 'lucide-react'
import DominoTile from '../components/DominoTile'

interface Props {
  balance: number
  onPlay: () => void
  onDeposit: () => void
  onRanking: () => void
  onChat?: () => void
  onTournaments?: () => void
  onPromotions?: () => void
  onNotifications?: () => void
}

const WINS = [
  { avatar: '🦁', name: 'Carlos M.', amount: '1.240 BC' },
  { avatar: '🌟', name: 'Fernanda L.', amount: '500 BC' },
  { avatar: '🎯', name: 'Diego R.', amount: '2.500 BC' },
  { avatar: '🔥', name: 'Ana P.', amount: '750 BC' },
]

export default function HomeScreen({ balance, onPlay, onDeposit, onRanking, onChat, onTournaments, onPromotions, onNotifications }: Props) {
  const fmt = (n: number) => n.toLocaleString('pt-BR')

  return (
    <div className="flex flex-col" style={{ background: '#0D1222', minHeight: '100%', paddingBottom: 16 }}>
      {/* Top bar */}
      <div className="fade-up flex items-center justify-between px-4 sticky top-0 z-40"
        style={{ background: '#141A2E', height: 56, borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <span style={{ fontFamily: 'Lilita One, cursive', fontSize: 22, color: '#FFD93D', letterSpacing: -0.5 }}>
          BoraBet
        </span>
        <div className="flex items-center gap-2">
          {/* Balance pill */}
          <div style={{
            height: 36, borderRadius: 999, background: '#1B2340',
            border: '1px solid rgba(255,255,255,0.06)',
            display: 'flex', alignItems: 'center', gap: 8, paddingLeft: 10, paddingRight: 4,
          }}>
            <span style={{ fontSize: 16 }}>🪙</span>
            <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 14, color: '#FFFFFF', fontVariantNumeric: 'tabular-nums' }}>
              {fmt(balance)}
            </span>
            <button className="btn-yellow" style={{ height: 28, paddingLeft: 10, paddingRight: 10, fontSize: 12, boxShadow: 'none' }}
              onClick={onDeposit}>+</button>
          </div>
          <button aria-label="Notificações" onClick={onNotifications} style={{ width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'none', border: 'none', cursor: 'pointer', position: 'relative' }}>
            <Bell size={20} color="#A9B0C6" />
            <span style={{ position: 'absolute', top: 6, right: 6, width: 8, height: 8, borderRadius: '50%', background: '#F0424B' }} />
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-3 px-4 pt-3">
        {/* Hero banner */}
        <div className="fade-up fade-up-1 relative overflow-hidden"
          style={{
            height: 200, borderRadius: 28,
            background: 'radial-gradient(ellipse at 60% 40%, #0E7A4B 0%, #063D28 100%)',
            border: '1px solid rgba(255,255,255,0.06)',
          }}>
          {/* Domino tiles decoration */}
          <div style={{ position: 'absolute', top: 20, right: 16, transform: 'rotate(12deg)', opacity: 0.9 }}>
            <DominoTile top={6} bottom={6} size="lg" />
          </div>
          <div style={{ position: 'absolute', bottom: 32, right: 100, transform: 'rotate(-8deg)', opacity: 0.6 }}>
            <DominoTile top={5} bottom={3} size="md" />
          </div>

          {/* Content */}
          <div style={{ position: 'absolute', top: 0, left: 0, bottom: 0, right: 0, padding: '20px 24px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
              <span className="live-dot" style={{ width: 8, height: 8, borderRadius: '50%', background: '#3DDB5F', display: 'inline-block' }} />
              <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: '#FFFFFF', fontWeight: 500 }}>284 jogando agora</span>
            </div>
            <h2 style={{ fontFamily: 'Lilita One, cursive', fontSize: 30, color: '#FFFFFF', lineHeight: 1.1, marginBottom: 4 }}>
              Dominó 1v1
            </h2>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: '#A9B0C6', marginBottom: 16 }}>
              Vencedor leva o pote · 10% comissão
            </p>
            <button className="btn-yellow glow-pulse" style={{ height: 48, paddingLeft: 28, paddingRight: 28, fontSize: 16, alignSelf: 'flex-start' }} onClick={onPlay}>
              Jogar
            </button>
          </div>
        </div>

        {/* Live wins ticker */}
        <div className="fade-up fade-up-2"
          style={{
            height: 40, borderRadius: 20, background: '#141A2E',
            border: '1px solid rgba(255,255,255,0.06)',
            display: 'flex', alignItems: 'center', overflow: 'hidden', paddingLeft: 12,
          }}>
          <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: '#6E7691', marginRight: 10, whiteSpace: 'nowrap', flexShrink: 0 }}>
            Vitórias ao vivo:
          </span>
          <div style={{ flex: 1, overflow: 'hidden', display: 'flex', gap: 20 }}>
            {WINS.map((w, i) => (
              <span key={i} style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: '#A9B0C6', whiteSpace: 'nowrap', flexShrink: 0 }}>
                {w.avatar} {w.name} ganhou <span style={{ color: '#3DDB5F', fontWeight: 600 }}>+{w.amount}</span>
              </span>
            ))}
          </div>
        </div>

        {/* Daily reward strip */}
        <div className="fade-up fade-up-2 card-sm flex items-center gap-3" style={{ padding: '14px 16px' }}>
          <div style={{ fontSize: 40, animation: 'pulse-dot 3s ease-in-out infinite' }}>🎁</div>
          <div className="flex-1">
            <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 14, color: '#FFFFFF' }}>
              Recompensa diária
            </p>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: '#A9B0C6', marginTop: 2 }}>
              Sequência de 4 dias · Pegue hoje!
            </p>
          </div>
          <button className="btn-green" style={{ height: 36, paddingLeft: 16, paddingRight: 16, fontSize: 13 }}>
            Pegar
          </button>
        </div>

        {/* Sala rápida */}
        <button className="fade-up fade-up-3 card-sm flex items-center gap-3 w-full text-left" style={{ padding: '14px 16px', cursor: 'pointer' }} onClick={onPlay}>
          <span style={{ fontSize: 36 }}>🐾</span>
          <div className="flex-1">
            <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 14, color: '#FFFFFF' }}>
              Entrar em uma sala rápida
            </p>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: '#A9B0C6', marginTop: 2 }}>
              Aposta sugerida: 50 BC
            </p>
          </div>
          <button className="btn-yellow" style={{ height: 40, paddingLeft: 16, paddingRight: 16, fontSize: 14 }} onClick={e => { e.stopPropagation(); onPlay() }}>
            Bora!
          </button>
        </button>

        {/* Leaderboard teaser */}
        <button className="fade-up fade-up-4 card w-full text-left" style={{ padding: 16, cursor: 'pointer' }} onClick={onRanking}>
          <div className="flex items-center justify-between mb-3">
            <h3 style={{ fontFamily: 'Lilita One, cursive', fontSize: 16, color: '#FFFFFF' }}>Ranking de dominó</h3>
            <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: '#3B7BFF' }}>Ver tudo →</span>
          </div>
          {[
            { rank: 1, name: 'Carlos M.', wins: 142, color: '#D4A017' },
            { rank: 2, name: 'Fernanda L.', wins: 128, color: '#A9B0C6' },
            { rank: 3, name: 'Diego R.', wins: 117, color: '#C97B3A' },
          ].map(r => (
            <div key={r.rank} className="flex items-center gap-3 py-2" style={{ borderTop: r.rank > 1 ? '1px solid rgba(255,255,255,0.04)' : 'none' }}>
              <span style={{ fontFamily: 'Lilita One, cursive', fontSize: 18, color: r.color, width: 24 }}>{r.rank}</span>
              <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 13, color: '#FFFFFF', flex: 1 }}>{r.name}</span>
              <span style={{ fontFamily: 'Lilita One, cursive', fontSize: 14, color: '#FFD93D' }}>{r.wins} vitórias</span>
            </div>
          ))}
        </button>

        {/* Tournament card */}
        {onTournaments && (
          <button className="fade-up fade-up-5 card w-full text-left" style={{ padding: 16, cursor: 'pointer' }} onClick={onTournaments}>
            <div className="flex items-center justify-between mb-2">
              <h3 style={{ fontFamily: 'Lilita One, cursive', fontSize: 16, color: '#FFFFFF' }}>Torneio da semana</h3>
              <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: '#3DDB5F', background: 'rgba(61,219,95,0.1)', padding: '3px 8px', borderRadius: 8 }}>Ao vivo</span>
            </div>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: '#A9B0C6', marginBottom: 8 }}>
              Prêmio de 50.000 BC · 342 jogadores
            </p>
            <div className="progress-bar"><div className="progress-fill" style={{ width: '62%' }} /></div>
          </button>
        )}

        {/* Chat teaser */}
        {onChat && (
          <button className="fade-up fade-up-5 card w-full text-left" style={{ padding: 14, cursor: 'pointer' }} onClick={onChat}>
            <div className="flex items-center gap-2 mb-3">
              <MessageCircle size={16} color="#FFD93D" />
              <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 13, color: '#FFFFFF' }}>Chat global</span>
              <span className="live-dot" style={{ width: 6, height: 6, borderRadius: '50%', background: '#3DDB5F', display: 'inline-block', marginLeft: 'auto' }} />
              <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: '#6E7691' }}>284 online</span>
            </div>
            {[
              { avatar: '🦁', user: 'Carlos M.', text: 'Bora de dominó!' },
              { avatar: '🌟', user: 'Fernanda L.', text: 'Ganhei 1.240 BC 🎉' },
            ].map((m, i) => (
              <div key={i} className="flex items-center gap-2 py-1">
                <span style={{ fontSize: 18 }}>{m.avatar}</span>
                <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 12, color: '#FFFFFF' }}>{m.user}:</span>
                <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: '#A9B0C6' }}>{m.text}</span>
              </div>
            ))}
          </button>
        )}

        {/* Promotions strip */}
        {onPromotions && (
          <button className="fade-up fade-up-5 card-sm flex items-center gap-3 w-full text-left" style={{ padding: 14, cursor: 'pointer' }} onClick={onPromotions}>
            <span style={{ fontSize: 28 }}>🎁</span>
            <div className="flex-1">
              <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 14, color: '#FFFFFF' }}>Bônus de boas-vindas</p>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: '#A9B0C6', marginTop: 2 }}>+10% no primeiro depósito</p>
            </div>
            <span style={{ color: '#6E7691', fontSize: 16 }}>›</span>
          </button>
        )}

        {/* Footer */}
        <div style={{ paddingTop: 8, paddingBottom: 8, textAlign: 'center' }}>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: '#6E7691' }}>
            18+ · Jogo responsável · Termos · Licença
          </p>
        </div>
      </div>
    </div>
  )
}
